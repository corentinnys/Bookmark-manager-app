import React, { useState, useEffect, useRef } from "react";


function Card({ card, index }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

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
        console.log("Modifier", card.title);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        console.log("Supprimer", card.title);
    };

    const handleVisit = (e) => {
        e.stopPropagation();
        console.log("Visiter", card.title);
    };

    return (
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
                            <button onClick={handleEdit}>Modifier</button>
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
    );
}

export default Card;