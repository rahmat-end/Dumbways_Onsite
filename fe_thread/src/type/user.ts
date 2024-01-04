export type IUser = {
    id?: number
    username?: string
    fullname?: string
    email?: string
    password?: string
    profile_picture?: string
    profile_description?: string
  }

  export type IUserSuggestion = {
    id: number
    profile_picture: string
    fullname: string
    username: string
  }

  export type IUserSearch = {
    id: number
    profile_picture: string
    fullname: string
    username: string
    profile_description: string
  }
  
  export type IUserRegister = {
    username: string
    fullname: string
    email: string
    password: string
    profile_picture: string
    profile_description: string
  }
  
  export type IUserLogin = {
    username: string
    password: string
  }

  export type IUserEditProfile = {
    username: string
    fullname: string
    email: string
    password: string
    profile_description: string
  }