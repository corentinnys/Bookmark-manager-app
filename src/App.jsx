import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./Auth";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';
import Dashboard from "./Dashboard";

function App() {
    const [user, setUser] = useState(null);

    // Surveille l'état de connexion Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erreur déconnexion :", error);
        }
    };

    if (!user) {
        return <Auth setUser={setUser} />;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Bienvenue, {user.email}</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Se déconnecter
                </button>
            </div>

            <Dashboard user={user} />
        </div>
    );
}

export default App;