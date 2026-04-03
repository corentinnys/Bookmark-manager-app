// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getBookmarksForUser } from "./firebase/bookmarks";

export default function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([]);

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

    if (!bookmarks.length) {
        return <p className="text-center mt-5">Aucun bookmark pour le moment...</p>;
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Mes Bookmarks</h2>
            <div className="row">
                {bookmarks.map((bm) => (
                    <div className="col-md-4 mb-4" key={bm.id}>
                        <div className="card h-100 shadow-sm rounded-4">

                            {/* Favicon */}
                            <div className="text-center mt-3">
                                <img src={bm.favicon} alt={bm.title} width="40" />
                            </div>

                            <div className="card-body text-center">
                                <h5 className="card-title">{bm.title}</h5>
                                <p className="card-text">{bm.description}</p>

                                {/* Tags */}
                                <div className="mb-2">
                                    {bm.tags?.map((tag, idx) => (
                                        <span key={idx} className="badge bg-primary me-1">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={bm.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    Visiter
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}