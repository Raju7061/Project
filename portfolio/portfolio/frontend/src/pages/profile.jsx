import axios from "axios";
import { useState } from "react";

function Profile() {
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    await axios.post(
      "http://localhost:5000/api/profile/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Profile image updated!");
  };

  return (
    <div className="p-10">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default Profile;
