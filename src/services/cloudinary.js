export const uploadImage = async (file) => {
    const CLOUD_NAME = "diccndurm";      // ← remplace par ta vraie valeur
    const UPLOAD_PRESET = "vcdtjqov";  // ← remplace par ta vraie valeur

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "bookmarks");

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
    );

    const data = await response.json();
    console.log("Réponse Cloudinary :", data); // ← dis-moi ce que ça affiche
    return data.secure_url;
};