// src/Auth.jsx
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { saveBookmarksForUser } from "./firebase/bookmarks";
import bookmarksData from "./data/data.json"; // ✅ JSON déplacé dans src/data/

export default function Auth({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 🔹 Fonction d'inscription
    const signup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 🔹 Upload automatique de tous les bookmarks
            await saveBookmarksForUser(user.uid, bookmarksData.bookmarks);

            setUser(user);
        } catch (error) {
            console.error("Erreur inscription:", error.message);
        }
    };

    // 🔹 Fonction de connexion
    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            console.error("Erreur connexion:", error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center mb-4 text-primary">Connexion / Inscription</h3>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={signup}>
                        S'inscrire
                    </button>
                    <button className="btn btn-outline-primary" onClick={login}>
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}