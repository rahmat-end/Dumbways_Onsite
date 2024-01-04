import React, { FormEvent } from "react"
import { API } from "../../../libs/api"
import { useNavigate } from "react-router-dom"
import { IUserRegister } from "../../../type/user"

export function useRegister() {
  const navigate = useNavigate()

  const [form, setForm] = React.useState<IUserRegister>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    profile_picture: "",
    profile_description: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target

    if(files) {
      setForm({
        ...form,
        [name]: files[0]
      })
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleClickButton() {
    fileInputRef.current?.click()
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let formData = new FormData()

    formData.append("username", form.username)
    formData.append("fullname", form.fullname)
    formData.append("email", form.email)
    formData.append("password", form.password)
    formData.append("profile_picture", form.profile_picture as any as File)
    formData.append("profile_description", form.profile_description)

    API.post("/auth/register", formData)
    navigate('/auth/login')
  }

  return {
    form,
    handleChange,
    fileInputRef,
    handleClickButton,
    handleRegister
  }
}