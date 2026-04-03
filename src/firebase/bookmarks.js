import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

// 🔹 Sauvegarde tous les bookmarks d’un utilisateur
export const saveBookmarksForUser = async (userId, bookmarks) => {
    try {
        const colRef = collection(db, "users", userId, "bookmarks");

        // Crée un tableau de promesses
        const promises = bookmarks.map(bm => addDoc(colRef, bm));

        // Attend que tous les documents soient écrits
        await Promise.all(promises);

        console.log("Tous les bookmarks ont été sauvegardés ✅");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
    }
};

// 🔹 Récupère tous les bookmarks d’un utilisateur
export const getBookmarksForUser = async (userId) => {
    try {
        const bookmarksCol = collection(db, "users", userId, "bookmarks");
        const snapshot = await getDocs(bookmarksCol);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error("Erreur récupération bookmarks :", error);
        return [];
    }
};