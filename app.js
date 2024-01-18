import express from 'express';
import router from './app/Router.js';

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(400).json({ message: `You fucked up. ${err.message}` });
});

app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found 😶‍🌫️' });
});

export default app;
