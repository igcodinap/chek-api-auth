import express from 'express';
import { Request, Response } from 'express';

import authRouter from './auth/auth.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRouter)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
