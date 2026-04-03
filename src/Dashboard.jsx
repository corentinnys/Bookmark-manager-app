// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getBookmarksForUser } from "./firebase/bookmarks";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Tags from "./Tags";
import Card from "./card";

export default function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) return;

            try {
                const data = await getBookmarksForUser(user.uid);
                console.log("Bookmarks récupérés :", data);
                setBookmarks(data);
            } catch (error) {
                console.error("Erreur récupération bookmarks :", error);
            }
        };

        fetchBookmarks();
    }, [user]);
    const handleSave = (updatedBookmark) => {
        setBookmarks(prev =>
            prev.map(item => item.id === updatedBookmark.id ? updatedBookmark : item)
        );
    };
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "bookmarks", id));
            setBookmarks(prev => prev.filter(bm => bm.id !== id));
        } catch (e) {
            console.error("Erreur suppression :", e);
        }
    };
    // Filtrer les bookmarks si des tags sont sélectionnés
    const filteredBookmarks = selectedTags.length > 0
        ? bookmarks.filter(bm => bm.tags?.some(tag => selectedTags.includes(tag)))
        : bookmarks;

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Mes Bookmarks</h2>

            <div className="row">
                {/* Colonne tags */}
                <div className="col-md-3 mb-4">
                    <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </div>

                {/* Colonne cartes */}
                <div className="col-md-9">
                    <div className="row">
                        {filteredBookmarks.length === 0 && (
                            <p className="text-center">Aucun bookmark pour ces tags.</p>
                        )}

                        {filteredBookmarks.map((bm) => (
                            <Card
                                key={bm.id}
                                card={bm}
                                onEdit={handleSave}
                                onSave={handleSave}
                                onDelete={handleDelete} // ← manquait
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}