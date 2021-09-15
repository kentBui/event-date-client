import React, { useState } from "react";
import styles from "@/styles/ImageUpload.module.css";
import { FaFile } from "react-icons/fa";
import { API_URL } from "@/config/index";

const ImageUpload = ({ evtId, imageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        imageUploaded();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmitUpload}>
        <div className={styles.file}>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
          />
          <label htmlFor="image">
            <span>{image ? "Choose another file" : "Choose file"}</span>
            <FaFile />
          </label>
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
      <div className={styles.show_image}>
        <ul>{image && <li>{image.name}</li>}</ul>
      </div>
    </div>
  );
};

export default ImageUpload;
