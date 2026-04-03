import React, { useState, useEffect, useRef } from "react";
import ModalBox from "./ModalBox";


function Card({ card, index,onEdit,onDelete,onSave  }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEdit = (e) => {
        e.stopPropagation();
        setSelectedBookmark(card); // ← initialise selectedBookmark avec la carte
        setShowModal(true);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(card.id);
        console.log("Supprimer", card.title);
    };

    const handleVisit = (e) => {
        e.stopPropagation();
        console.log("Visiter", card.title);
    };

    return (
        <>
        <div className="col-lg-4 col-md-6 mb-4 d-flex">
            <div className="card custom-card w-100 text-center p-4">

                {/* Logo */}
                <div className="mb-3">
                    <img src={card.favicon} alt={card.title} style={{ width: "50px" }} />
                </div>

                {/* MENU */}
                <div className="menu" ref={menuRef}>
                    <button
                        className="menu-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open);
                        }}
                    >
                        ⋮
                    </button>

                    {open && (
                        <div className="custom-dropdown">
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={(e) => handleEdit(e, card)}
                            >
                                Modifier
                            </button>
                            <button onClick={handleDelete}>Supprimer</button>
                            <button onClick={handleVisit}>Visiter</button>
                        </div>
                    )}
                </div>

                <h5 className="fw-bold mb-2">{card.title}</h5>

                <p className="text-muted small mb-3">
                    {card.description}
                </p>

                <hr />

                <div className="d-flex justify-content-center flex-wrap gap-2 mt-2">
                    {card.tags?.map((tag, i) => (
                        <span key={i} className="badge tag-badge">
                            {tag}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    {showModal && <ModalBox
        showModal={showModal}
        setShowModal={setShowModal}
        selectedBookmark={selectedBookmark}
        setSelectedBookmark={setSelectedBookmark}
        onSave={ onSave }  // ← prop directement, sans wrapper
    />}
        </>
    );
}

export default Card;