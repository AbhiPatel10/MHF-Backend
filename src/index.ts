import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';  // Using alias @/ for src/
import { AppDataSource } from './config/database';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Bizzio!' });
});
app.use((req, res) => {
  res.status(404).json({ message: "This endpoint is not available in Bizzio." });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });