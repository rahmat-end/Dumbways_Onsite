import { Repository } from "typeorm"
import { Follow } from "../entities/Follow"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

export default new class FollowServices {
  private readonly FollowRepository: Repository<Follow> = AppDataSource.getRepository(Follow)
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const follow = await this.FollowRepository.find({
        order: { 
          id: "ASC"
        },
        relations: {
          followerId: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: follow,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding all follows"})
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const follow = await this.FollowRepository.find({
        where: {
          followedId: JSON.parse(req.params.id)
        },
        relations: {
          followerId: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: follow,
        message: "Successfully! Record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding a spcific data follow"})
    }
  }

  async followed(req: Request, res: Response): Promise<Response> {
    try {
      const followed = await this.FollowRepository
      // .find({
      //   // where: {
      //   //   followerId: JSON.parse(req.params.id)
      //   // },
      //   relations: {
      //     followerId: true
      //   }
      // })
      .createQueryBuilder("follow")
      .where("follow.followerId = :id", { id: req.params.id })
      .getMany()

      // const followedFiltered = followed.filter(function (el) {
      //   return el.followedId != JSON.parse(req.params.id)
      // })

      // .createQueryBuilder("follow")
      // .leftJoinAndSelect("following", "follow", "follow.followerId = user.id")
      // .where("follow.followerId = :id", { id: req.params.id })
      // .getMany()
      return res.status(200).json({
        status: "success",
        data: followed,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding data followed"})
    }
  }

  async follower(req: Request, res: Response): Promise<Response> {
    try {
      const follower = await this.FollowRepository.find({
        where: {
          followedId: JSON.parse(req.params.id)
        },
        order: { 
          id: "ASC"
        },
        relations: {
          followerId: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: follower,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding data follower"})
    }
  }

  async followedCounted(req: Request, res: Response): Promise<Response> {
    try {
      const followed = await this.FollowRepository
      .createQueryBuilder("follow")
      .where("follow.followerId = :id", { id: req.params.id })
      .getCount()

      return res.status(200).json({
        status: "success",
        data: followed,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding data followed"})
    }
  }

  async followerCounted(req: Request, res: Response): Promise<Response> {
    try {
      const follower = await this.FollowRepository.count({
        where: {
          followedId: JSON.parse(req.params.id)
        },
        relations: {
          followerId: true
        }
      })
      return res.status(200).json({
        status: "success",
        data: follower,
        message: "Successfully! All record has been fetched"
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while finding data follower"})
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
          id: JSON.parse(req.params.idFollowed)
        }
      })

      const suggestion = await this.FollowRepository
      .createQueryBuilder()
      .insert()
      .into('follow')
      .values([
          { 
            followedId: JSON.parse(req.params.idFollowed),
            fullname: user.fullname,
            username: user.username,
            profile_picture: user.profile_picture,
            profile_description: user.profile_description,
            followerId: JSON.parse(req.params.idFollower)
          },
      ])
      .execute()

      return res.status(200).json({
        status: "success",
        data: suggestion,
        message: `Successfully! Record has been added`
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while inserting data follow" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const follow = await this.FollowRepository
      // .query(`delete from follow where "followerId" = ${req.params.idFollower} and "followedId" = ${req.params.idFollowed}`)

      .createQueryBuilder('follow')
      .delete()
      .from(Follow)
      .where("followerId = :idFollower and followedId = :idFollowed", { idFollower: req.params.idFollower, idFollowed: req.params.idFollowed })
      .execute()

      return res.status(200).json({
        status: "success",
        data: follow,
        message: `Successfully! Record has been deleted`
      })
    } catch (err) {
      return res.status(500).json({ message: "Something error while deleting data follow"})
    }
  }
  
}