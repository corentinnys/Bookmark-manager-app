import React, { useState } from "react";
import { uploadImage } from "./services/cloudinary"; // ← chemin corrigé

function AddModal({ showModal, setShowModal, selectedBookmark, setSelectedBookmark, onSave, onClose }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // ← ajouté
    const [uploading, setUploading] = useState(false); // ← ajouté

    const handleSubmit = async () => {
        let imageUrl = null;

        if (imageFile) {
            setUploading(true);
            try {
                imageUrl = await uploadImage(imageFile);
            } catch (err) {
                console.error("Erreur upload Cloudinary :", err);
            } finally {
                setUploading(false);
            }
        }
        /*console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
        console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);*/
        console.log("imageUrl", imageUrl);
        onSave({ title, url, description, tags, image: imageUrl });
        onClose();

        // Reset
        setTitle("");
        setUrl("");
        setDescription("");
        setTags([]);
        setPreview(null);
        setImageFile(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]; // ← récupère le fichier droppé
        if (!file) return;

        setImageFile(file);                          // ← stocke pour l'upload
        setPreview(URL.createObjectURL(file));       // ← preview local immédiat
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content p-3">

                    <h5>Ajouter un bookmark</h5>

                    <label>Titre</label>
                    <input
                        type="text"
                        placeholder="Titre"
                        className="form-control mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Url</label>
                    <input
                        type="text"
                        placeholder="URL"
                        className="form-control mb-2"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <label>Description</label>
                    <textarea
                        placeholder="Description"
                        className="form-control mb-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />

                    <label>Tags (séparés par des virgules)</label>
                    <input
                        className="form-control mb-2"
                        placeholder="ex: dev, react, design"
                        onChange={(e) =>
                            setTags(
                                e.target.value
                                    .split(",")
                                    .map(t => t.trim())
                                    .filter(t => t !== "")
                            )
                        }
                    />

                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{ border: "2px dashed gray", padding: 40, textAlign: "center" }}
                    >
                        Glisse une image ici
                        {preview && (
                            <img src={preview} alt="Preview" style={{ marginTop: 10, maxWidth: "100%" }} />
                        )}
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Annuler
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={uploading}
                        >
                            {uploading ? "Upload en cours..." : "Sauvegarder"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddModal;