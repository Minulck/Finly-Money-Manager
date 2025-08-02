import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try{
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method:"POST",
            body: formData
        })
        if(!response.ok) {
            const errorData = await response.json();
             console.log(errorData.error.message);
            throw new Error("Image upload failed");
        }

        const data = await response.json();
        return data.secure_url;

    }
    catch(err){
        console.error("Error uploading image:", err);
        throw err;
    }
}

export default uploadProfileImage;