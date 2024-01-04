import { Repository, Like } from "typeorm"
import { Thread } from "../entities/Thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { threadSchema } from "../utils/ThreadValidator"
import cloudinary from "../libs/cloudinary"
import { createClient } from "redis"

export default new class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const client = createClient()
      client.on('error', err => console.log('Redis Client Error', err))
      await client.connect()

      const threadRedis = await client.get('threads')
      if(threadRedis) {
        console.log('Serving threads from Redis cache')        
        return res.status(200).json({
          status: "success",
          data: JSON.parse(threadRedis),
          message: "Successfully! All record has been fetched"
        })
      } else {
        console.log('Serving threads from database')
        const thread = await this.ThreadRepository.find({
          order: { 
            id: "ASC" 
          },
          relations: {
            user: true,
          }
        })
        await client.setEx('threads', 60, JSON.stringify(thread))
        return res.status(200).json({
          status: "success",
          data: thread,
          message: "Successfully! All record has been fetched"
        })
      }
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding all thread"})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.ThreadRepository.find({
        where: {
          id: JSON.parse(req.params.id)
        },
        relations: {
          user: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: thread,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a spcific data thread"})
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.files

      if(!image) return res.status(500).json({ message: "No file was uploaded" })

      const file = JSON.parse(JSON.stringify(image))
      const path = file["image"].tempFilePath

      cloudinary.uploader.upload(
        path,
        async(errorCloudinary: any, result: any) => {
          if(errorCloudinary) {
            return res.status(400).json({ message: errorCloudinary.message })
          }

          const loginSession = res.locals.loginSession
          const body = {
            ... req.body,
            image: path
          }
          const { error, value } = threadSchema.validate(body)
          if(error) return res.status(400).json({ message: error.message })

          const obj = this.ThreadRepository.create({
            content: value.content,
            image: result.secure_url,
            user: loginSession.obj.id,
          })
    
          const thread = await this.ThreadRepository.save(obj)
          return res.status(200).json({
            status: "success",
            data: thread,
            message: "Successfully! Record has been added"
          })
        }
      )
    } catch (err) {
      return res.status(500).json({ message: "Something error while inserting data thread" })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error, value } = threadSchema.validate(body)
      if(error) return res.status(400).json({ message: error.message })

      const threadImage = await this.ThreadRepository.findOne({
        where: {
          id: JSON.parse(req.params.id)
        }
      })

      const obj = this.ThreadRepository.create({
        content: value.content,
        image: threadImage.image,
        user: value.userId,
        updated_at: new Date
      })

      await this.ThreadRepository.update(req.params.id, obj)
      const article = await this.ThreadRepository.find({
        where: {
          id: JSON.parse(req.params.id)
        }
      })
      return res.status(200).json({
        status: "success",
        data: article,
        message: "Successfully! Record has been updated"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while updating data thread"})
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.ThreadRepository.delete(req.params.id)
      return res.status(200).json({
        status: "success",
        data: thread,
        message: "Successfully! Record has been deleted"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while deleting data thread"})
    }
  }

}