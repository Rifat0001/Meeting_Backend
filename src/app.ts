import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { roomRoutes } from './app/modules/Room/room.route';
import { slotRoutes } from './app/modules/Slot/slot.route';
import { bookingRoute } from './app/modules/Booking/booking.route';

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
