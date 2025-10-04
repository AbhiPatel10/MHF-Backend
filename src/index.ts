import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import { connectDB } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Mission Health Foundation!' });
});
app.use((req, res) => {
  res.status(404).json({ message: 'This endpoint is not available in MHF.' });
});

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
export default app;