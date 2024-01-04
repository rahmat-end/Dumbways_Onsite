import * as express from "express"
import AuthenticationMiddlewares from '../middlewares/Auth'
import UserControllers from "../controllers/UserControllers"
import ThreadControllers from "../controllers/ThreadControllers"
import LikeControllers from "../controllers/LikeControllers"
import ReplyControllers from "../controllers/ReplyControllers"
import FollowControllers from "../controllers/FollowControllers"

const router = express.Router()

router.get("/users", UserControllers.find)
router.get("/user/:id", AuthenticationMiddlewares.Authentication, UserControllers.findOne)
router.get("/search/:key", UserControllers.search)
router.get("/suggestion/:id", AuthenticationMiddlewares.Authentication, UserControllers.suggestion)
router.post("/auth/register", UserControllers.register)
router.post("/auth/login", UserControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, UserControllers.check)
router.put("/updateUser/:id", AuthenticationMiddlewares.Authentication, UserControllers.update)
router.delete("/deleteUser", AuthenticationMiddlewares.Authentication, UserControllers.delete)

router.get("/threads", ThreadControllers.find)
router.get("/thread/:id", ThreadControllers.findOne)
router.post("/addThread", AuthenticationMiddlewares.Authentication, ThreadControllers.add)
router.put("/updateThread/:id", ThreadControllers.update)
router.delete("/deleteThread/:id", ThreadControllers.delete)

router.get("/likes", LikeControllers.find)
router.get("/like/:id", LikeControllers.findOne)
router.get("/countLikes/:id", LikeControllers.countLikes)
router.get("/checkUserLikes/:idUser/:idThread", LikeControllers.checkUserLikes)
router.post("/addLike/:idUser/:idThread", AuthenticationMiddlewares.Authentication, LikeControllers.add)
router.delete("/deleteLike/:idUser/:idThread", AuthenticationMiddlewares.Authentication, LikeControllers.delete)

router.get("/replies", ReplyControllers.find)
router.get("/reply/:id", ReplyControllers.findOne)
router.get("/countReplies/:id", ReplyControllers.countReplies)
router.get("/checkUserReplies/:idUser/:idThread", ReplyControllers.checkUserReplies)
router.post("/addReply/:idUser/:idThread", ReplyControllers.add)
router.delete("/deleteReply/:idUser/:idThread", ReplyControllers.delete)

router.get("/follows", FollowControllers.find)
router.get("/follow/:id", FollowControllers.findOne)
router.get("/followed/:id", AuthenticationMiddlewares.Authentication, FollowControllers.followed)
router.get("/follower/:id", AuthenticationMiddlewares.Authentication, FollowControllers.follower)
router.get("/followedCounted/:id", AuthenticationMiddlewares.Authentication, FollowControllers.followedCounted)
router.get("/followerCounted/:id", AuthenticationMiddlewares.Authentication, FollowControllers.followerCounted)
router.post("/addFollow/:idFollower/:idFollowed", AuthenticationMiddlewares.Authentication, FollowControllers.add)
router.delete("/deleteFollow/:idFollower/:idFollowed", AuthenticationMiddlewares.Authentication, FollowControllers.delete)

export default router