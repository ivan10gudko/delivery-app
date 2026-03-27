process.on('uncaughtException', (err) => {
    console.error('❌ CRITICAL ERROR (Uncaught):', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ CRITICAL ERROR (Rejection):', reason);
    process.exit(1);
});

import express from 'express';
import cors from 'cors';
import { getAllShops } from './controllers/shop.controller';
import { errorHandler } from './middleware/error.middleware';
import { getProducts } from './controllers/product.controller';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/shops', getAllShops);
app.get('/api/products', getProducts);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Знайдено критичну помилку:', err);
    process.exit(1);
});