import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { dateNowToString } from "../../utils/BackendMethods";
interface multipleImage {
  images: File[];
  user_id: string;
  dateAdded: string;
}
function AddImages() {
  const user_id = useSelector((state: RootState) => state.user.ID);

  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [images, setImages] = useState<File[]>([]);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("date_added", dateNowToString());
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    if (images.length === 0) {
      setError(true);
      setInfo("Choose images!");
    } else {
      axios
        .post("http://127.0.0.1:3001/photos/addmultiple", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImages([]);
          setError(false);
          setInfo("images has been added to database!");
        })
        .catch((err) => {
          setError(true);
          setInfo("cannot add image");
        });
    }
  };

  return (
    <AddImagesBox>
      <h3>choose files to upload</h3>
      <form action="/upload" method="POST" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputImage}
          name="images"
        />

        <button type="submit" onClick={submit} className="form-button-class">
          Add images to the gallery
        </button>
      </form>
      <p style={{ fontSize: "12px" }}>
        Files with <span style={{ fontWeight: "bold" }}>.png</span>
        or
        <span style={{ fontWeight: "bold" }}>.jpg</span>
        extensions are only valid data
      </p>
      <p className={error === true ? "add-image-error-p" : "add-image-info-p"}>
        {info}
      </p>
    </AddImagesBox>
  );
}

export default AddImages;

const AddImagesBox = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(217, 217, 214, 0.2);
  * {
    margin: 10px;
  }
  h3 {
    margin: 30px;
  }
  .add-image-error-p {
    color: red;
  }
  .add-image-info-p {
    color: green;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
