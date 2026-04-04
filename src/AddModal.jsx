import React, { useState } from "react";

function AddModal({ showModal, setShowModal, selectedBookmark, setSelectedBookmark, onSave,onClose }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [preview, setPreview] = useState(null);
    //if (!show) return null;

    const handleSubmit = () => {
        onSave({ title, url, description, tags,preview });
        onClose();

        // reset (optionnel mais propre)
        setTitle("");
        setUrl("");
        setDescription("");
        setTags([]);
        setPreview(null);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setPreview(URL.createObjectURL(file));
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
                        style={{ border: "2px dashed gray", padding: 40 }}
                    >
                        Glisse une image ici
                        {preview && <img src={preview} alt="Preview" />}
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Annuler
                        </button>

                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Sauvegarder
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddModal;