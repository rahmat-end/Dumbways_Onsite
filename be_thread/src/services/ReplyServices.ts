import { Repository, Like } from "typeorm"
import { Reply } from "../entities/Reply"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

export default new class ReplyServices {
  private readonly ReplyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const reply = await this.ReplyRepository.find({
        order: { 
          id: "ASC" 
        },
        relations: {
          user: true,
          thread: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: reply,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding all replies"})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const reply = await this.ReplyRepository.find({
        where: {
          user: JSON.parse(req.params.id)
        },
        relations: {
          user: true,
          thread: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: reply,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a spcific data reply"})
    }
  }

  async countReplies(req: Request, res: Response): Promise<Response> {
    try {
      const countReplies = await this.ReplyRepository
      .createQueryBuilder("reply")
      .where("reply.threadId = :id", { id: req.params.id })
      .getCount()
      return res.status(200).json({
        status: "success",
        data: countReplies,
        message: "Successfully! Record has been counted"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while counting data replies"})
    }
  }

  async checkUserReplies(req: Request, res: Response): Promise<Response> {
    try {
      const checkUserReplies = await this.ReplyRepository
      .createQueryBuilder("reply")
      .where("reply.userId = :id", { id: req.params.idUser })
      .where("reply.threadId = :id", { id: req.params.idThread })
      .getCount()
      return res.status(200).json({
        status: "success",
        data: checkUserReplies,
        message: "Successfully! Record has been checked"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while checking data user replies"})
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession

      const obj = this.ReplyRepository.create({
        user: JSON.parse(req.params.idUser),
        thread: JSON.parse(req.params.idThread)
      })

      const reply = await this.ReplyRepository.save(obj)
      return res.status(200).json({
        status: "success",
        data: reply,
        message: "Successfully! Record has been added"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while inserting data reply" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      const reply = await this.ReplyRepository
      .createQueryBuilder('reply')
      .delete()
      .from(Reply)
      .where("userId = :id", { id: req.params.idUser })
      .andWhere("threadId = :id", { id: req.params.idThread })
      .execute()
      return res.status(200).json({
        status: "success",
        data: reply,
        message: "Successfully! Record has been deleted"
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Something error while deleting data reply"})
    }
  }

}