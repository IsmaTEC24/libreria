import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { createUser, updateUser } from "../services/usersService.js";
import { getToken, setToken, clearToken } from "../services/authToken.js";

const SUBSCRIPTION_KEY = import.meta.env.VITE_API_SUBSCRIPTION_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

function deriveInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

async function exchangeFirebaseToken(firebaseUser) {
  const idToken = await firebaseUser.getIdToken();
  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error(`Auth exchange failed: ${response.status}`);
  return response.json();
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const { token, user } = await exchangeFirebaseToken(firebaseUser);
          setToken(token);
          setCurrentUser({ ...user, uid: firebaseUser.uid });
        } catch {
          clearToken();
          setCurrentUser(null);
        }
      } else {
        clearToken();
        setCurrentUser(null);
      }
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function register(name, username, email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await createUser({
      username,
      name,
      email,
      password: "",
      initials: deriveInitials(name),
      firebaseUid: credential.user.uid,
    });

    // Usuario recién creado en Cosmos — intercambiar token ahora que existe
    const { token, user } = await exchangeFirebaseToken(credential.user);
    setToken(token);
    setCurrentUser({ ...user, uid: credential.user.uid });

    return credential;
  }

  async function logout() {
    await signOut(auth);
    clearToken();
    setCurrentUser(null);
  }

  async function updateAzureProfile(fields) {
    const { uid, ...azureData } = currentUser;
    const updated = await updateUser(currentUser.id, { ...azureData, ...fields });
    setCurrentUser((prev) => ({ ...prev, ...updated, uid: prev.uid }));
  }

  async function updateProfileName(name) {
    await updateAzureProfile({ name, initials: deriveInitials(name) });
  }

  async function updateProfileUsername(username) {
    await updateAzureProfile({ username });
  }

  async function updateProfileEmail(currentPassword, newEmail) {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, newEmail);
    await updateAzureProfile({ email: newEmail });
  }

  async function updateProfilePassword(currentPassword, newPassword) {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        updateProfileName,
        updateProfileUsername,
        updateProfileEmail,
        updateProfilePassword,
        isAuthenticated: Boolean(currentUser),
        loadingAuth,
      }}
    >
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
