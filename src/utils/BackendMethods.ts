import axios, { AxiosError } from "axios";
import {
  IUserLogin,
  IImage,
  IUserRegister,
  IMessage,
  IMessageToSend,
} from "../types/Types";

export const loginMethod = async (username: string, password: string) => {
  try {
    let response = await axios.post("http://127.0.0.1:3001/users/login", {
      username: username,
      password: password,
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404)
        return { message: "user not found!" };
      if (axiosError.response?.status === 401)
        return { message: "incorrect password!" };
    }
    return { message: "something gone wrong, try again!" };
  }
};

export const registerMethod = async (
  username: string,
  email: string,
  password: string,
  image: File | undefined,
  date_of_birth: string
) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("date_of_birth", date_of_birth);
  if (image) {
    formData.append("image", image);
  }

  console.log(formData.get("image"));
  try {
    let response = await axios.post(
      "http://127.0.0.1:3001/users/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    return error;
    // if (axios.isAxiosError(error)) {
    //   // Obsługa błędu zwróconego przez Axios
    //   const axiosError = error as AxiosError;
    //   if (axiosError.response?.status === 400)
    //     return { message: "Email address already exists in database!" };
    //   if (axiosError.response?.status === 401)
    //     return { message: "incorrect password!" };
    // }
    // return { message: "something gone wrong, try again!" };
  }
};
//function checking token is valid in localStorage(return true or false)
const checkLocalStorageToken = () => {
  let storage = localStorage.getItem("token");
  if (storage) {
    const { token, ID } = JSON.parse(storage);
    return token && ID
      ? { status: true, ID: ID, token: token }
      : { status: false };
  } else return { status: false };
};

export const fetchLoggedUserInfo = async () => {
  let check = checkLocalStorageToken();
  if (check.status === true) {
    try {
      let response = await axios.post(
        `http://127.0.0.1:3001/users/${check.ID}`,
        {
          id: check.ID,
        },
        {
          headers: {
            Authorization: `Bearer ${check.token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      
      return "not logged";
    }
  } else {
    return "not logged";
  }
};
//EDIT USER'S PROFILE METHODS
export const changeUsername = async (user_id: string, newUsername: string) => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    const formData = new FormData();
    // formData.append("user_id", user_id);
    formData.append("newUsername", newUsername);
    try {
      let response = await axios.put(
        `http://127.0.0.1:3001/users/${user.ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Obsługa błędu zwróconego przez Axios
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409)
          return { error: "Username address already exists in database!" };
      }
      return { error: "cannot upload informations, try again!" };
    }
  } else {
    return { error: "cannot upload informations, try again!" };
  }
};

export const changeEmail = async (user_id: string, newEmail: string) => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    const formData = new FormData();
    // formData.append("user_id", user_id);
    formData.append("newEmail", newEmail);
    try {
      let response = await axios.put(
        `http://127.0.0.1:3001/users/${user.ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Obsługa błędu zwróconego przez Axios
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409)
          return { error: "Email address already exists in database!" };
      }
      return { error: "something gone wrong, try again!" };
    }
  } else return { error: "cannot upload informations, try again!" };
};

export const changeAvatar = async (user_id: string, newAvatar: File) => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    const formData = new FormData();
    // formData.append("user_id", user_id);
    formData.append("newAvatar", newAvatar);
    let response = await axios.put(
      `http://127.0.0.1:3001/users/${user.ID}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } else {
    // return { status: "error", data: "cannot upload informations, try again!" };
    return { error: "cannot upload informations, try again!" };
  }
};

export const changeUserPassword = async (
  originalPass: string,
  newPass: string
) => {
  let checkToken = checkLocalStorageToken();

  if (checkToken.status === true) {
    try {
      let response = axios.post(
        "http://127.0.0.1:3001/users/change-password",
        { originalPass: originalPass, newPass: newPass, userId: checkToken.ID },
        {
          headers: {
            Authorization: `Bearer ${checkToken.token}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  }
};

//DELETE USER ACCOUNT
export const deleteAccount = async (user_id: string) => {
  const storageString = localStorage.getItem("token");
  if (storageString) {
    let user = JSON.parse(storageString);

    try {
      let response = await axios.delete(
        `http://127.0.0.1:3001/users/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.removeItem("token");
      return response;
    } catch (err) {
      return err;
    }
  }
};

//IMAGES
export const deleteImageByUser = async (image_id: string, filename: string) => {
  const storageString = localStorage.getItem("token");
  if (storageString) {
    let user = JSON.parse(storageString);
    try {
      let response = await axios.delete(
        `http://127.0.0.1:3001/photos/${image_id}`,
        {
          data: {
            filename: filename,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

//MASSAGES
export const deleteMessages = async (imageIds: string[]) => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    try {
      let response = await axios.post(
        `http://127.0.0.1:3001/messages/delete`,
        {
          data: imageIds,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  }
};
export const sendMessage = async (message: IMessageToSend) => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    let response = axios.post(
      "http://127.0.0.1:3001/messages/send",
      {
        content: message.content,
        theme: message.theme,
        date: message.date,
        sender: message.sender,
        recipent: message.recipent,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } else return { data: "cannot send message" };
};
export const fetchReceivedMessages = async () => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    let response = axios.get(
      `http://127.0.0.1:3001/messages/received/${user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } else return { data: [] };
};
export const fetchSentMessages = async () => {
  const storageString = localStorage.getItem("token");

  if (storageString) {
    let user = JSON.parse(storageString);
    let response = axios.get(`http://127.0.0.1:3001/messages/sent/${user.ID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response;
  } else return { data: [] };
};
export const checkRecipentExist = async (recipent: string) => {
  let response = await axios.post(
    "http://127.0.0.1:3001/messages/check-recipents",
    {
      data: recipent,
    }
  );
  return response;
};
//Create current date in yyyy-mm-dd hh-mm-ss format
export const dateNowToString = () => {
  let year = new Date().getFullYear();
  let month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth()}`
      : `${new Date().getMonth()}`;
  let day =
    new Date().getDay() < 10
      ? `0${new Date().getDay()}`
      : `${new Date().getDay()}`;

  let hour =
    new Date().getHours() < 10
      ? `0${new Date().getHours()}`
      : `${new Date().getHours()}`;
  let minute =
    new Date().getMinutes() < 10
      ? `0${new Date().getMinutes()}`
      : `${new Date().getMinutes()}`;
  let second =
    new Date().getSeconds() < 10
      ? `0${new Date().getSeconds()}`
      : `${new Date().getSeconds()}`;

  let final = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return final;
};
