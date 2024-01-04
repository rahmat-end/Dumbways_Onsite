import { Request, Response } from "express"
import UserServices from "../services/UserServices"

export default new class UserControllers {
  find(req: Request, res: Response) {
    UserServices.find(req, res)
  }
  findOne(req: Request, res: Response) {
    UserServices.findOne(req, res)
  }
  search(req: Request, res: Response) {
    UserServices.search(req, res)
  }
  suggestion(req: Request, res: Response) {
    UserServices.suggestion(req, res)
  }
  register(req: Request, res: Response) {
    UserServices.register(req, res)
  }
  login(req: Request, res: Response) {
    UserServices.login(req, res)
  }
  check(req: Request, res: Response) {
    UserServices.check(req, res)
  }
  update(req: Request, res: Response) {
    UserServices.update(req, res)
  }
  delete(req: Request, res: Response) {
    UserServices.delete(req, res)
  }
}