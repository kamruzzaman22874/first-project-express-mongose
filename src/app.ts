import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
const app: Application = express()

// parser

app.use(express.json())
app.use(cors())

// application route

app.use('/api/v1/students', StudentRoutes)

const getAController = (req: Request, res: Response) => {
  res.send('Hello world')
}

app.get('/', getAController)

// app.use(error: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = 500
//   const message = error.message || "something went wrong"
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: error
//   })
//   next()
// }

console.log(process.cwd())

export default app
