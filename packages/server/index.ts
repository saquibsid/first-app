import express from 'express';
import router from './routes/routes';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.use(express.json());
app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
