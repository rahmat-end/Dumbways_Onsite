import { Request, Response } from "express"
import ThreadServices from "../services/ThreadServices"
// import ThreadQueue from "../queue/thread_queue"

export default new class ThreadControllers {
  find(req: Request, res: Response) {
    ThreadServices.find(req, res)
  }
  findOne(req: Request, res: Response) {
    ThreadServices.findOne(req, res)
  }
  add(req: Request, res: Response) {
    ThreadServices.add(req, res)
    // ThreadQueue.add(req, res)
  }
  update(req: Request, res: Response) {
    ThreadServices.update(req, res)
  }
  delete(req: Request, res: Response) {
    ThreadServices.delete(req, res)
  }
}