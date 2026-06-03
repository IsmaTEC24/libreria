const { app } = require('@azure/functions');
const sql = require('mssql');

let poolPromise = null;

async function getSqlPool() {
    if (!poolPromise) {
        const connectionString = process.env.SQL_CONNECTION_STRING;

        if (!connectionString) {
            throw new Error('SQL_CONNECTION_STRING no está configurado.');
        }

        poolPromise = sql.connect(connectionString);
    }

    return poolPromise;
}

async function getBooks(context) {
    context.log('Ejecutando GET /api/books');

    const pool = await getSqlPool();

    const result = await pool.request().query(`
        SELECT 
            id,
            title,
            author,
            description,
            category,
            pdf_blob_name,
            cover_blob_name,
            created_at
        FROM dbo.Books
        ORDER BY id DESC;
    `);

    return {
        status: 200,
        jsonBody: result.recordset
    };
}

async function createBook(request, context) {
    context.log('Ejecutando POST /api/books');

    const body = await request.json();

    const {
        title,
        author,
        description,
        category,
        pdf_blob_name,
        cover_blob_name
    } = body;

    if (!title || !pdf_blob_name) {
        return {
            status: 400,
            jsonBody: {
                message: 'title y pdf_blob_name son obligatorios.'
            }
        };
    }

    const pool = await getSqlPool();

    const result = await pool.request()
        .input('title', sql.NVarChar(200), title)
        .input('author', sql.NVarChar(150), author || null)
        .input('description', sql.NVarChar(sql.MAX), description || null)
        .input('category', sql.NVarChar(100), category || null)
        .input('pdf_blob_name', sql.NVarChar(500), pdf_blob_name)
        .input('cover_blob_name', sql.NVarChar(500), cover_blob_name || null)
        .query(`
            INSERT INTO dbo.Books (
                title,
                author,
                description,
                category,
                pdf_blob_name,
                cover_blob_name
            )
            OUTPUT 
                INSERTED.id,
                INSERTED.title,
                INSERTED.author,
                INSERTED.description,
                INSERTED.category,
                INSERTED.pdf_blob_name,
                INSERTED.cover_blob_name,
                INSERTED.created_at
            VALUES (
                @title,
                @author,
                @description,
                @category,
                @pdf_blob_name,
                @cover_blob_name
            );
        `);

    return {
        status: 201,
        jsonBody: {
            message: 'Libro creado correctamente',
            book: result.recordset[0]
        }
    };
}

app.http('books', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'books',
    handler: async (request, context) => {
        try {
            if (request.method === 'GET') {
                return await getBooks(context);
            }

            if (request.method === 'POST') {
                return await createBook(request, context);
            }

            return {
                status: 405,
                jsonBody: {
                    message: 'Método no permitido.'
                }
            };

        } catch (error) {
            context.error('Error en /api/books:', error);

            return {
                status: 500,
                jsonBody: {
                    message: 'Error interno en /api/books',
                    error: error.message
                }
            };
        }
    }
});