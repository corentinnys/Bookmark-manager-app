// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getBookmarksForUser } from "./firebase/bookmarks";
import { deleteDoc, doc,addDoc,collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Tags from "./Tags";
import Card from "./card";
import AddModal from "./AddModal";


export default function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

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
    const handleSave = async (bookmark) => {
        try {
            // 👉 CAS 1 : UPDATE
            if (bookmark.id) {
                const ref = doc(db, "bookmarks", bookmark.id);
                await updateDoc(ref, bookmark);

                setBookmarks(prev =>
                    prev.map(item =>
                        item.id === bookmark.id ? bookmark : item
                    )
                );
            }

            // 👉 CAS 2 : CREATE
            else {
                const docRef = await addDoc(collection(db, "bookmarks"), {
                    ...bookmark,
                    userId: user.uid
                });

                setBookmarks(prev => [
                    ...prev,
                    { id: docRef.id, ...bookmark }
                ]);
            }

            setShowAddModal(false);
        } catch (error) {
            console.error("Erreur sauvegarde :", error);
        }
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
                    <button
                        className="btn btn-success"
                        onClick={() => setShowAddModal(true)}
                    >
                        Ajouter
                    </button>
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
            {showAddModal && (
                <AddModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}