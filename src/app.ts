import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
