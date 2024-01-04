import { Repository, DataSource } from "typeorm"
import { User } from "../entities/User"
import { Follow } from "../entities/Follow"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { userSchema, userSchemaEdit, loginSchema } from "../utils/UserValidator"
import cloudinary from "../libs/cloudinary"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class UserServices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
  private readonly FollowRepository: Repository<Follow> = AppDataSource.getRepository(Follow)
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.find({ 
        order: {
          id: "ASC" 
        },
        relations: {
          follows: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding all user"})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
            id: JSON.parse(req.params.id)
        }
      })
      return res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a spcific data user"})
    }
  }

  async search(req: Request, res: Response): Promise<Response> {
    try {
      const search = await this.UserRepository
      .createQueryBuilder("user")
      .where("user.fullname like :key or user.username like :key or user.profile_description like :key", { key: `%${req.params.key}%` })
      .getMany()

      return res.status(200).json({
        status: "success",
        data: search,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a data search by keyword"})
    }
  }

  async suggestion(req: Request, res: Response): Promise<Response> {
    try {
      const sugestedUser = await this.UserRepository
      .find({ 
        order: {
          id: "ASC" 
        },
      })

      const followByMe = await this.FollowRepository
      .createQueryBuilder('follow')
      .where('follow.followerId = :id', { id: req.params.id })
      .getMany()

      const filterUserExecptME = sugestedUser.filter((user) => {
        return user.id !== JSON.parse(req.params.id)
      })

      const execptHasFollowByMe = filterUserExecptME.filter((user) => {
        return !followByMe.some((follow) => follow.followedId == user.id)
        // return user.id !== followByMe.map(f => f.followedId)
      })

      // const shuffledUsers = execptHasFollowByMe.sort(() => Math.random() - 0.5);
      // const suggestedRandomUsers = shuffledUsers.slice(0, 5)

      const newUser = execptHasFollowByMe.map((user) => {
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          profile_picture: user.profile_picture,
          profile_description: user.profile_description
        }
      })

      return res.status(200).json({
        status: "success",
        data: newUser,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding data suggestion"})
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.files

      if(!image) return res.status(500).json({ message: "No file was uploaded" })

      const file = JSON.parse(JSON.stringify(image))
      const path = file["profile_picture"].tempFilePath

      cloudinary.uploader.upload(
        path,
        async(errorCloudinary: any, result: any) => {
          if(errorCloudinary) {
            return res.status(400).json({ message: errorCloudinary.message })
          }

          const body = {
            ... req.body,
            profile_picture: path
          }

          const { error, value } = userSchema.validate(body)
          if(error) return res.status(409).json({ message: error.message })

          const isUsernameUsed = await this.UserRepository.findOne({ where: { username: value.username } })
          if(isUsernameUsed) return res.status(409).json({ message: "Username already in use !" })
          
          const getUser = await this.UserRepository.find()
          let isPasswordUsed: any
          for (let i = 0; i < getUser.length; i++) {
            if(await bcrypt.compare(value.password, getUser[i].password)) {
              isPasswordUsed = true
              break 
            } else {
              isPasswordUsed = false
            }
          }
          if(isPasswordUsed) return res.status(409).json({ message: "Password already in use !" })

          const hashPassword = await bcrypt.hash(value.password, 10)
          const obj = this.UserRepository.create({
            username: value.username,
            fullname: value.fullname,
            email: value.email,
            password: hashPassword,
            profile_picture: result.secure_url,
            profile_description: value.profile_description
          })

          const user = await this.UserRepository.save(obj)
          return res.status(200).json({
            status: "success",
            data: user,
            message: "Successfully! Record has been added"
          })
        }
      )
    } catch (err) {
      return res.status(500).json({ message: "Something error while inserting data user"})
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error, value } = loginSchema.validate(body)
      if(error) return res.status(400).json({ message: error.message })

      const isUsernameRegistered = await this.UserRepository.findOne({ where: { username: value.username }})
      if(!isUsernameRegistered) return res.status(409).json({ message: "Username is not registered !" })

      const isMatchPassword = await bcrypt.compare(value.password, isUsernameRegistered.password)
      if(!isMatchPassword) return res.status(409).json({ message: "Incorrect password !" })

      const obj = this.UserRepository.create({
        id: isUsernameRegistered.id,
        fullname: isUsernameRegistered.fullname,
        username: isUsernameRegistered.username,
        profile_picture: isUsernameRegistered.profile_picture,
        profile_description: isUsernameRegistered.profile_description
      })
      const token = jwt.sign({ obj }, 'SECRET_KEY', { expiresIn: 3600 })
      return res.status(200).json({
        status: "success",
        session: obj,
        token: token,
        message: "Successfully! Token has been assigned & Login session has been created"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while login"})
    }
  }

  async check(req: Request, res: Response) : Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      const user = await this.UserRepository.findOne({
        where: {
          id: loginSession.obj.id
        }
      })

      return res.status(200).json({
        status: "success",
        data: user,
        message: "Token is valid!"
      })
    } catch (err) {
      console.log(err)
      
      return res.status(500).json({ message: "Something went wrong on the server!"})
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error, value } = userSchemaEdit.validate(body)
      if(error) return res.status(400).json({ message: error.message })
      
      const user = await this.UserRepository.findOne({ where: { id: JSON.parse(req.params.id) } })
      const isUsernameUsed = await this.UserRepository.findOne({ where: { username: value.username } })
      if(isUsernameUsed) return res.status(409).json({ message: "Username already in use !" })

      const getUser = await this.UserRepository.find()
      let isPasswordUsed: any
      for (let i = 0; i < getUser.length; i++) {
        if(await bcrypt.compare(value.password, getUser[i].password)) {
          isPasswordUsed = true
          break 
        } else {
          isPasswordUsed = false
        }
      }
      if(isPasswordUsed) return res.status(409).json({ message: "Password already in use !" })

      const hashPassword = await bcrypt.hash(value.password, 10)
      const obj = this.UserRepository.create({
        username: value.username,
        fullname: value.fullname,
        email: value.email,
        password: hashPassword,
        profile_picture: user.profile_picture,
        profile_description: value.profile_description,
        updated_at: new Date
      })

      await this.UserRepository.update(JSON.parse(req.params.id), obj)
      return res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully! Record has been updated"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while updating data user"})
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      const user = await this.UserRepository.delete(loginSession.obj.id)
      return res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully! Record has been deleted"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while deleting data user"})
    }
  }

}