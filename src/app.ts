import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/middlewaresErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
const app: Application = express()

// parser

app.use(express.json())
app.use(cors())

// application route

app.use('/api/v1', router)

const test = (req: Request, res: Response) => {
  res.send('Server is running')
}

app.get('/', test)

app.use(globalErrorHandler)
app.use(notFound)

// console.log(process.cwd())

export default app
