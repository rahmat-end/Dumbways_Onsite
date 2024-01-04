import { API } from "../../../libs/api";
import { IUserLogin } from "../../../type/user";
import { useDispatch } from "react-redux";
import React from "react";
import { AUTH_LOGIN } from "../../../store/rootReducer";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = React.useState<IUserLogin>({
    username: "",
    password: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleLogin() {
    try {
      const response = await API.post('/auth/login', form)
      
      dispatch(AUTH_LOGIN(response.data))
      navigate("/")
    } catch (error) {
      throw error
    }
  }

  return {
    handleChange,
    handleLogin
  }
}