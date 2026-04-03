import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tags from "./Tags";
import Cards from "./cards";
import Auth from "./Auth";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';
import data from "./data/data.json";
import { saveBookmarksForUser } from "./firebase/bookmarks";
import Dashboard from "./Dashboard";


function App() {
    const [user, setUser] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    // Surveille l'état de connexion Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
   // ← plus de données hardcodées

    useEffect(() => {
        const fetchBookmarks = async () => {
            const snapshot = await getDocs(collection(db, "bookmarks"));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookmarks(data);
        };
        fetchBookmarks();
    }, []);
    // Déconnexion
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null); // facultatif, onAuthStateChanged le fera aussi
        } catch (error) {
            console.error("Erreur déconnexion :", error);
        }
    };

    // Si l'utilisateur n'est pas connecté → afficher Auth
    if (!user) {
        return <Auth setUser={setUser} />;
    }

    // Sinon → afficher l'interface principale
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Bienvenue, {user.email}</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Se déconnecter</button>
            </div>
            <button
                className="btn btn-success"
                onClick={() => saveBookmarksForUser(auth.currentUser.uid, data.bookmarks)}
            >
                Ajouter données Firebase
            </button>
            <Dashboard user={user} />
           {/* <div className="row">
                <section className="col-3">
                    <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </section>
                <section className="col-9">
                    <Cards selectedTags={selectedTags} />
                </section>
            </div>*/}
        </div>
    );
}

export default App;