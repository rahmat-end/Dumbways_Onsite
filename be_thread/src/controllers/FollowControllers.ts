import { Request, Response } from "express"
import FollowServices from "../services/FollowServices"

export default new class FollowControllers {
  find(req: Request, res: Response) {
    FollowServices.find(req, res)
  }
  findOne(req: Request, res: Response) {
    FollowServices.findOne(req, res)
  }
  followed(req: Request, res: Response) {
    FollowServices.followed(req, res)
  }
  follower(req: Request, res: Response) {
    FollowServices.follower(req, res)
  }
  followedCounted(req: Request, res: Response) {
    FollowServices.followedCounted(req, res)
  }
  followerCounted(req: Request, res: Response) {
    FollowServices.followerCounted(req, res)
  }
  add(req: Request, res: Response) {
    FollowServices.add(req, res)
  }
  delete(req: Request, res: Response) {
    FollowServices.delete(req, res)
  }
}