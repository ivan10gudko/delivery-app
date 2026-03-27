import express from 'express';
import cors from 'cors';
import { getAllShops } from './controllers/shop.controller';
import { errorHandler } from './middleware/error.middleware'; // Якщо вже створив

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/shops', getAllShops);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});