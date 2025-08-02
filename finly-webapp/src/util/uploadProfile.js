import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


const uploadPRofileImage  = async() => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try{
        fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method:"POST",
            body: formData
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error("Image upload failed");
            console.log(errorData.error.message);
        }

        const data = await response.json();
        return data.secure_url;

    }
    catch(err){
        console.error("Error uploading image:", err);
        throw new Error("Image upload failed");
    }
}