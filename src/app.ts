import cors from 'cors';
import express, { Application } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import { roomRoutes } from './modules/Room/room.route';
import { slotRoutes } from './modules/Slot/slot.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', roomRoutes);
app.use('/api', slotRoutes);

// Default route
app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
