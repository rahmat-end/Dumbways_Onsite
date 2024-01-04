import { Repository } from "typeorm"
import { Like as LikeEntity } from "../entities/Like"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

export default new class LikeServices {
  private readonly LikeRepository: Repository<LikeEntity> = AppDataSource.getRepository(LikeEntity)
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const like = await this.LikeRepository.find({
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
        data: like,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding all like"})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const like = await this.LikeRepository.find({
        where: {
          id: JSON.parse(req.params.id)
        },
        relations: {
          user: true,
          thread: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: like,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a spcific data like"})
    }
  }

  async countLikes(req: Request, res: Response): Promise<Response> {
    try {
      const countLikes = await this.LikeRepository
      .createQueryBuilder("like")
      .where("like.threadId = :id", { id: req.params.id })
      .getCount()
      return res.status(200).json({
        status: "success",
        data: countLikes,
        message: "Successfully! Record has been counted"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while counting data likes"})
    }
  }

  async checkUserLikes(req: Request, res: Response): Promise<Response> {
    try {
      const checkUserLikes = await this.LikeRepository
      .createQueryBuilder("like")
      .where("like.userId = :idUser and like.threadId = :idThread", { idUser: req.params.idUser, idThread: req.params.idThread })
      .getCount()
      return res.status(200).json({
        status: "success",
        data: checkUserLikes,
        message: `Successfully! Record has been checked`
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while checking data user likes"})
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const obj = this.LikeRepository.create({
        user: JSON.parse(req.params.idUser),
        thread: JSON.parse(req.params.idThread)
      })

      const like = await this.LikeRepository.save(obj)
      return res.status(200).json({
        status: "success",
        data: like,
        message: `Successfully! Record has been added`
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while inserting data like" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const like = await this.LikeRepository
      .createQueryBuilder('like')
      .delete()
      .from(LikeEntity)
      .where("userId = :id", { id: req.params.idUser })
      .andWhere("threadId = :id", { id: req.params.idThread })
      .execute()
      return res.status(200).json({
        status: "success",
        data: like,
        message: `Successfully! Record has been deleted`
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while deleting data like"})
    }
  }

}