import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ModalBox from "./ModalBox";
import Tags from "./Tags";
import AddModal from "./AddModal";
import Card from "./card";

function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [modalType, setModalType] = useState(null);
    const filteredBookmarks = selectedTags.length === 0
        ? bookmarks
        : bookmarks.filter(b => selectedTags.every(tag => b.tags?.includes(tag)));

    useEffect(() => {
        if (!user) return;
        const unsubscribe = onSnapshot(collection(db, "bookmarks"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBookmarks(data);
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

    const handleSave = (updatedBookmark) => {
        console.log("Bookmark sauvegardé :", updatedBookmark);
    };

    return (
        <div className="bm-layout">

            {/* SIDEBAR */}
            <aside className="bm-sidebar">
                <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </aside>

            {/* MAIN */}
            <main className="bm-main">
                <div className="bm-topbar">
                    <h2 className="bm-section-title">All bookmarks</h2>
                    <button className="bm-add-btn" onClick={handleAdd}>+ Add Bookmark</button>
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
                            {/* Header */}




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
