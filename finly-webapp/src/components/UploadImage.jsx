import { Upload, User,Trash } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UploadImage = ({ image, setImage, currentImage }) => {
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Initialize preview with current image if available
  useEffect(() => {
    if (currentImage && !image) {
      setPreviewImage(currentImage);
    }
  }, [currentImage, image]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewImage = URL.createObjectURL(file);
      setPreviewImage(previewImage);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(currentImage || null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="dflex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewImage ? (
        <div className="w-22 h-22 flex items-center justify-center bg-emerald-700 rounded-full relative">
          <User className="text-emerald-200" size={35} />
          <button
          type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-white absolute -bottom-1 -right-1"
            onClick={onChooseFile}>
                <Upload
                className="text-emerald-600 w-5 h-5 rounded-full"
                size={15}/>
          </button>
        </div>
      ) : (
        <div className="relative">
            <img src={previewImage} alt="profile photo" className="w-22 h-22 rounded-full object-cover" />
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-emerald-600 absolute -bottom-1 -right-1 hover:bg-gray-200"
                onClick={onChooseFile}>
                <Upload size={15}/>
            </button>
            {image && (
              <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white absolute -top-1 -right-1 hover:bg-red-600"
                  onClick={handleRemoveImage}>
                  <Trash size={15}/>
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
