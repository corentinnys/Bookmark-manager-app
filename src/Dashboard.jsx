import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ModalBox from "./ModalBox";
import Tags from "./Tags";
import AddModal from "./AddModal";
import Card from "./card";
import defaultBookmarks from "./data/data.json"; // ← ajouté

function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("recent");
    const [openMenu, setOpenMenu] = useState(false);

    const filteredBookmarks = bookmarks
        .filter(b => showArchived ? b.isArchived : !b.isArchived)
        .filter(b => selectedTags.length === 0 || selectedTags.every(tag => b.tags?.includes(tag)))
        .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                if (sortType ==="reccent")
                {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }

                if (sortType === "visited") {
                    return new Date(b.lastVisited || 0) - new Date(a.lastVisited || 0);
                }

                if (sortType === "most") {
                    return (b.visitCount || 0) - (a.visitCount || 0);
                }

            })
        ;


    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "bookmarks"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                // ← pas de bookmarks dans Firestore → affiche les données par défaut
                setBookmarks(defaultBookmarks.bookmarks);
            } else {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBookmarks(data);
            }
        });

        return () => unsubscribe();
    }, [user]);

    const handleAdd = () => {
        setSelectedBookmark({
            title: "",
            url: "",
            description: "",
            tags: [],
            favicon: "",
            userId: user.uid
        });
        setModalType("add");
    };

    const handleEdit = (bookmark) => {
        setSelectedBookmark(bookmark);
        setModalType("edit");
    };

    const handleDelete = async (id) => {
        try { await deleteDoc(doc(db, "bookmarks", id)); }
        catch (error) { console.error("Erreur suppression :", error); }
    };

    const handleSave = async (bookmark) => {
        try {
            await addDoc(collection(db, "bookmarks"), {
                title: bookmark.title,
                url: bookmark.url,
                description: bookmark.description,
                tags: bookmark.tags,
                favicon: bookmark.image ?? null,
                userId: user.uid,
                createdAt: new Date(),
            });
            setModalType(null);
        } catch (error) {
            console.error("Erreur sauvegarde :", error);
        }
    };




    return (
        <div className="bm-layout">
            <aside className="bm-sidebar">
                <Tags
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    showArchived={showArchived}
                    setShowArchived={setShowArchived}  // ← manquait
                />
            </aside>

            <main className="bm-main">
                <div className="bm-topbar">
                    <h2 className="bm-section-title">All bookmarks</h2>
                    <button className="bm-add-btn" onClick={handleAdd}>+ Add Bookmark</button>

                </div>
                <form className="search-form">
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bookmarks..."
                            className="bm-search"
                        />
                    </div>
                </form>


                <div className="menu position-relative">
                    <button
                        className="menu-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(!openMenu);
                        }}
                    >
                        ⋮
                    </button>

                    {openMenu && (
                        <div className="dropdown-menu-custom">
                            <button onClick={() => setSortType("recent")}>
                                🆕 Recently added
                            </button>

                            <button onClick={() => setSortType("visited")}>
                                🕒 Recently visited
                            </button>

                            <button onClick={() => setSortType("most")}>
                                🔗 Most visited
                            </button>
                        </div>
                    )}
                </div>


                <div className="bookmarks-grid">
                    {filteredBookmarks.map((bookmark, index) => (
                        <div className="bookmark-card" key={`${bookmark.id}-${index}`}>
                            <Card
                                card={bookmark}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSave={handleSave}
                            />
                        </div>
                    ))}
                </div>
            </main>

            {modalType === "add" && (
                <AddModal
                    onClose={() => setModalType(null)}
                    onSave={handleSave}
                />
            )}

            {modalType === "edit" && (
                <ModalBox
                    showModal={true}
                    setShowModal={() => setModalType(null)}
                    selectedBookmark={selectedBookmark}
                    setSelectedBookmark={setSelectedBookmark}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default Dashboard;