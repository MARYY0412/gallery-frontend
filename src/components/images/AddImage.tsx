import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import Timer from "../Timer";
import { dateNowToString } from "../../utils/BackendMethods";
interface singleImage {
  image: File;
  description: string;
  user_id: string;
  dateAdded: string;
}

function AddImage() {
  const user_id = useSelector((state: RootState) => state.user.ID);

  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState<string>("");

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setImage(file);
  };

  const handleInputDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const obj: singleImage = {
      image: image,
      description: description,
      user_id: user_id,
      dateAdded: dateNowToString(),
    };
    if (!image) {
      setError(true);
      setInfo("Choose an image!");
    } else {
      axios
        .post("http://127.0.0.1:3001/photos/addsingle", obj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setError(false);
          setInfo("image has been added to database!");
        })
        .catch((err) => {
          setError(true);
          setInfo("cannot add image");
        });
    }
  };

  return (
    <AddImageBox>
      <h3>choose file to upload</h3>
      <form>
        <input type="file" accept="image/*" onChange={handleInputImage} />
        <textarea
          placeholder="Describe yout image here"
          maxLength={255}
          onChange={handleInputDescription}
        />
        <button type="submit" onClick={submit} className="form-button-class">
          Add image to the gallery
        </button>
      </form>
      <p style={{ fontSize: "12px" }}>
        Files with{" "}
        <span style={{ fontWeight: "bold", margin: "3px" }}>.png</span>
        or
        <span style={{ fontWeight: "bold", margin: "3px" }}>.jpg</span>
        extensions are only valid data
      </p>
      <p className={error === true ? "add-image-error-p" : "add-image-info-p"}>
        {info}
      </p>
    </AddImageBox>
  );
}

export default AddImage;

const AddImageBox = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    textarea {
      border-radius: 5px;
      padding: 20px;
      width: 100%;
      height: 140px;
      resize: none;
    }
  }
`;
