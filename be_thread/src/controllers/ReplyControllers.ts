import { Request, Response } from "express"
import ReplyServices from "../services/ReplyServices"

export default new class ReplyControllers {
  find(req: Request, res: Response) {
    ReplyServices.find(req, res)
  }
  findOne(req: Request, res: Response) {
    ReplyServices.findOne(req, res)
  }
  countReplies(req: Request, res: Response) {
    ReplyServices.countReplies(req, res)
  }
  checkUserReplies(req: Request, res: Response) {
    ReplyServices.checkUserReplies(req, res)
  }
  add(req: Request, res: Response) {
    ReplyServices.add(req, res)
  }
  delete(req: Request, res: Response) {
    ReplyServices.delete(req, res)
  }
}