import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
