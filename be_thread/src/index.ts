import * as express from "express"
import * as cors from "cors"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import router from "./route"
import fileUpload = require("express-fileupload")
// import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const swaggerDocument = require('./swagger.yaml')

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    //setup CORS
    const corsOption = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
    app.use(cors(corsOption))

    //setup cloudinary
    app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }))

    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    // // Swagger options
    // const options = {
    //     definition: {
    //         openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    //         info: {
    //             title: 'Express API with Swagger',
    //             version: '1.0.0',
    //             description: 'Thread Apps for Dumbways Batch 50',
    //         },
    //     },
    //     // Path to the API docs
    //     apis: ['./routes/*.ts'],
    // }
    // const swaggerSpec = swaggerJsdoc(options)
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // // Use the sample route
    // app.use('/api', sampleRoute)
    
    app.use("/api/v1", router)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.get("/", (req: Request, res: Response) => {
        res.send("Hello world")
    })
    app.listen(port, () => {
        console.log("Server running on port 5000")
    })
}).catch(error => console.log(error))
