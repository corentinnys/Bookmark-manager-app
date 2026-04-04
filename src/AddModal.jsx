import { useState } from "react";

function AddModal({ show, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    if (!show) return null;

    const handleSubmit = () => {
        onSave({ title, url });
        onClose();
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content p-3">

                    <h5>Ajouter un bookmark</h5>

                    <input
                        type="text"
                        placeholder="Titre"
                        className="form-control mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="URL"
                        className="form-control mb-2"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

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