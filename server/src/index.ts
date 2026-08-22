import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
