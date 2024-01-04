import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"

export default new class WorkerHub {
    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                cloudinary
            })
            .catch()
    }
}