import { API } from "../../../libs/api"
import { IUserEditProfile } from "@/type/user"
import React from "react"
import { useNavigate } from "react-router-dom"

export function useEditProfile() {
    const session = JSON.parse(localStorage.user)
    const navigate = useNavigate()
  
    const [form, setForm] = React.useState<IUserEditProfile>({
      username: "",
      fullname: "",
      email: "",
      password: "",
      profile_description: ""
    })
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  
    async function handleEdit() {
      try {
        await API.put(`/updateUser/${session.id}`, form)
        
        navigate("/")
      } catch (error) {
        throw error
      }
    }
  
    return {
      handleChange,
      handleEdit
    }
  }