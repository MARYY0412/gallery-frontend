import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/Types";

export const initialState: IUser = {
  username: "",
  email: "",
  ID: "",
  date_of_birth: "",
  avatar: "",
  role: "",
};

export const user_Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state: IUser, action: PayloadAction<IUser>) => {
      return {
        username: action.payload.username,
        email: action.payload.email,
        ID: action.payload.ID,
        date_of_birth: action.payload.date_of_birth,
        avatar: action.payload.avatar,
        role: action.payload.role,
      };
    },
    reset: (state: IUser) => {
      return {
        username: "",
        email: "",
        ID: "",
        date_of_birth: "",
        avatar: "",
        role: "",
      };
    },
    setImages: (state, action: PayloadAction<[]>) => {
      return { ...state, images: action.payload };
    },
  },
});

export const { setUserInfo, reset, setImages } = user_Slice.actions;
