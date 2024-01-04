import { API } from "../../../libs/api"
import { IThreadPost } from "../../../type/thread"
import { useQuery } from "@tanstack/react-query"
import React, { FormEvent } from "react"

export function useThread() {
  const session = JSON.parse(localStorage.user)
  const [form, setForm] = React.useState<IThreadPost>({
    content: "",
    image: "",
    user: session.id
  })

  async function getThreads() {
    try {
      const response = await API.get('/threads')
      console.log(response.data)
      return response.data.data
    } catch (error) {
      throw new Error
    }
  }

  const { data: threads, refetch } = useQuery({ queryKey: ['todos'], queryFn: getThreads});

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let formData = new FormData()

    formData.append("content", form.content)
    formData.append("image", form.image as File)
    formData.append("user", form.user as any)

    API.post("/addThread", formData)
    refetch()
  }

  return {
    form,
    threads,
    handleChange,
    fileInputRef,
    handleClickButton,
    handleSubmit
  }
}