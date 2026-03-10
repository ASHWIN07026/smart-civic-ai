import { useState, useRef } from "react";

export default function PhotoUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
        ) : (
          <div>
            <p className="text-4xl mb-2">📷</p>
            <p className="text-gray-600 font-medium">Drop image here or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {preview && (
        <button
          type="button"
          className="mt-2 text-xs text-red-500 hover:underline"
          onClick={() => { setPreview(null); onFileSelect(null); }}
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
