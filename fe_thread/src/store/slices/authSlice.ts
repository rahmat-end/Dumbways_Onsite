import { setAuthToken } from "../../libs/api"
import { IUser } from "../../type/user"
import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: IUser = {
  id: 0,
  username: "",
  fullname: "",
  email: "",
  password: "",
  profile_picture: "",
  profile_description: ""
} 

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload
      console.log("ini payload ", payload.session)

      setAuthToken(payload.token)
      localStorage.setItem("token", payload.token)
      localStorage.setItem('user', JSON.stringify(payload.session))

      const user: IUser = {
        id: payload.session.id,
        fullname: payload.session.fullname,
        username: payload.session.username,
        profile_picture: payload.session.profile_picture,
        profile_description: payload.session.profile_description
      }

      return user
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload
      console.log("ini payload ", payload)

      const user: IUser = {
        id: payload.data.id,
        fullname: payload.data.fullname,
        username: payload.data.username,
        profile_picture: payload.data.profile_picture,
        profile_description: payload.data.profile_description
      }

      return user
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }
})