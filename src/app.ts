import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import { roomRoutes } from './modules/Room/room.route';
import { slotRoutes } from './modules/Slot/slot.route';
import { bookingRoute } from './modules/Booking/booking.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to meeting room backend',
  });
});

app.use('/api', roomRoutes);
app.use('/api', slotRoutes);
app.use('/api', bookingRoute);

// Default route
app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
