import { Request, Response } from "express"
import LikeServices from "../services/LikeServices"

export default new class LikeControllers {
  find(req: Request, res: Response) {
    LikeServices.find(req, res)
  }
  findOne(req: Request, res: Response) {
    LikeServices.findOne(req, res)
  }
  countLikes(req: Request, res: Response) {
    LikeServices.countLikes(req, res)
  }
  checkUserLikes(req: Request, res: Response) {
    LikeServices.checkUserLikes(req, res)
  }
  add(req: Request, res: Response) {
    LikeServices.add(req, res)
  }
  delete(req: Request, res: Response) {
    LikeServices.delete(req, res)
  }
}