const jwt = require("jsonwebtoken");
const https = require("https");
const User = require("../models/User");

function verifyFirebaseToken(idToken) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) return reject(new Error("FIREBASE_API_KEY no configurado"));

    const body = JSON.stringify({ idToken });
    const options = {
      hostname: "identitytoolkit.googleapis.com",
      path: `/v1/accounts:lookup?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error || !parsed.users || parsed.users.length === 0) {
            reject(new Error(parsed.error?.message || "Token de Firebase inválido"));
          } else {
            resolve({
              sub: parsed.users[0].localId,
              email: parsed.users[0].email,
            });
          }
        } catch {
          reject(new Error("Respuesta inválida de Firebase"));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function login(req, res) {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: "idToken requerido" });
  }

  try {
    const firebasePayload = await verifyFirebaseToken(idToken);
    const firebaseUid = firebasePayload.sub;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        initials: user.initials,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Autenticación fallida: " + error.message });
  }
}

module.exports = { login };
