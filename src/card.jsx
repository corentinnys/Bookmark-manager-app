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

   /* const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(card);
    };*/
    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(card);
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
            <div className="bm-head">
                {card.favicon
                    ? <img className="bm-favicon" src={card.favicon} alt="" />
                    : <div className="bm-favicon-placeholder">🔖</div>
                }
                <div className="bm-meta">
                    <div className="bm-title">{card.title}</div>
                    <div className="bm-url">{card.url}</div>
                </div>

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

            </div>
            <div className="bm-divider" />

            {card.description && <p className="bm-desc">{card.description}</p>}

            {card.tags?.length > 0 && (
                <div className="bm-tags">
                    {card.tags.map(tag => (
                        <span key={tag} className="bm-tag">{tag}</span>
                    ))}
                </div>
            )}

            <div className="bm-footer">
                <div className="bm-stats">
                                    <span className="bm-stat">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>
                                        {card.views ?? 0}
                                    </span>
                    <span className="bm-stat">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
                        {card.lastVisited ?? 'Never'}
                                    </span>
                    <span card="bm-stat">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 2v2M11 2v2M2 7h12"/></svg>
                        {card.createdAt ?? '—'}
                                    </span>
                </div>
                <button className="bm-bookmark" onClick={() => handleDelete(card.id)}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h8a1 1 0 011 1v10l-5-3-5 3V3a1 1 0 011-1z"/></svg>
                </button>
            </div>





                  {/*  */}

    {/*{showModal && <ModalBox*/}
    {/*    showModal={showModal}*/}
    {/*    setShowModal={setShowModal}*/}
    {/*    selectedBookmark={selectedBookmark}*/}
    {/*    setSelectedBookmark={setSelectedBookmark}*/}
    {/*    onSave={ onSave }  // ← prop directement, sans wrapper*/}
    {/*/>}*/}
        </>
    );
}

export default Card;