import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Auth({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            console.error("Erreur connexion:", error.message);
        }
    };
    const signup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            console.error("Erreur inscription:", error.message);
        }
    }

    return (
       /* <div>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={signup}>S'inscrire</button>
            <button onClick={login}>Se connecter</button>
        </div>*/
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center mb-4 text-primary">Connexion / Inscription</h3>

                <div className="mb-3 input-group">
      <span className="input-group-text bg-primary text-white">
        <i className="bi bi-envelope-fill"></i>
      </span>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3 input-group">
      <span className="input-group-text bg-primary text-white">
        <i className="bi bi-lock-fill"></i>
      </span>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid gap-3">
                    <button
                        className="btn btn-primary btn-lg fw-bold"
                        style={{ transition: '0.3s' }}
                        onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.target.style.backgroundColor = '#0d6efd'}
                        onClick={signup}
                    >
                        <i className="bi bi-person-plus-fill me-2"></i> S'inscrire
                    </button>

                    <button
                        className="btn btn-outline-primary btn-lg fw-bold"
                        style={{ transition: '0.3s', color: '#0d6efd' }}
                        onMouseEnter={e => {
                            e.target.style.backgroundColor = '#0d6efd';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                            e.target.style.backgroundColor = '';
                            e.target.style.color = '#0d6efd';
                        }}
                        onClick={login}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i> Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}