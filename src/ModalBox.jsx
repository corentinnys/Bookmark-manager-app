import React, { useState } from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from './firebaseConfig';

function ModalBox({ showModal, setShowModal, selectedBookmark, setSelectedBookmark, onSave }) {
    const [errors, setErrors] = useState({});

    const saveBookmark = async () => {
        try {
            let updatedBookmark = { ...selectedBookmark };
            const newErrors = {};

            // ✅ Validation
            if (!selectedBookmark?.title?.trim()) newErrors.title = "Le titre est obligatoire";
            if (!selectedBookmark?.url?.trim()) newErrors.url = "L'URL est obligatoire";
            if (!selectedBookmark?.description?.trim()) newErrors.description = "La description est obligatoire";
            if (!selectedBookmark?.tags || selectedBookmark.tags.length === 0 || selectedBookmark.tags.every(t => t.trim() === "")) {
                newErrors.tags = "Au moins un tag est obligatoire";
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setErrors({});

            // ✅ Données propres à envoyer
            const dataToSave = {
                title: selectedBookmark.title,
                url: selectedBookmark.url,
                description: selectedBookmark.description,
                tags: selectedBookmark.tags || [],
                favicon: selectedBookmark.favicon || ""
            };

            if (selectedBookmark.id) {
                // 🔄 UPDATE
                const docRef = doc(db, "bookmarks", selectedBookmark.id);
                await setDoc(docRef, dataToSave, { merge: true });

                updatedBookmark = {
                    ...updatedBookmark,
                    ...dataToSave
                };

                console.log("✅ Bookmark mis à jour !");
            } else {
                // ➕ CREATE
                const docRef = await addDoc(collection(db, "bookmarks"), dataToSave);

                updatedBookmark = {
                    ...dataToSave,
                    id: docRef.id
                };

                console.log("✅ Bookmark ajouté !");
            }

            // ✅ Mise à jour UI
            onSave(updatedBookmark);
            setShowModal(false);

        } catch (e) {
            console.error("❌ Erreur sauvegarde :", e);
        }
    };

    if (!showModal) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Modifier Bookmark</h5>
                        <button className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>

                    <div className="modal-body">

                        {/* TITLE */}
                        <label>Titre</label>
                        <input
                            className="form-control mb-2"
                            value={selectedBookmark?.title || ""}
                            onChange={(e) => {
                                setSelectedBookmark({ ...selectedBookmark, title: e.target.value });
                                setErrors({ ...errors, title: null });
                            }}
                        />
                        {errors.title && <div className="text-danger small mb-2">{errors.title}</div>}

                        {/* DESCRIPTION */}
                        <label>Description</label>
                        <textarea
                            className="form-control mb-2"
                            value={selectedBookmark?.description || ""}
                            onChange={(e) => {
                                setSelectedBookmark({ ...selectedBookmark, description: e.target.value });
                                setErrors({ ...errors, description: null });
                            }}
                        />
                        {errors.description && <div className="text-danger small mb-2">{errors.description}</div>}

                        {/* URL */}
                        <label>URL</label>
                        <input
                            className="form-control mb-2"
                            value={selectedBookmark?.url || ""}
                            onChange={(e) => {
                                setSelectedBookmark({ ...selectedBookmark, url: e.target.value });
                                setErrors({ ...errors, url: null });
                            }}
                        />
                        {errors.url && <div className="text-danger small mb-2">{errors.url}</div>}

                        {/* TAGS */}
                        <label>Tags</label>
                        <input
                            className="form-control mb-2"
                            value={(selectedBookmark?.tags || []).join(", ")}
                            onChange={(e) => {
                                setSelectedBookmark({
                                    ...selectedBookmark,
                                    tags: e.target.value.split(",").map(t => t.trim())
                                });
                                setErrors({ ...errors, tags: null });
                            }}
                        />
                        {errors.tags && <div className="text-danger small mb-2">{errors.tags}</div>}

                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Fermer
                        </button>

                        <button className="btn btn-primary" onClick={saveBookmark}>
                            Sauvegarder
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ModalBox;