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
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from any origin by returning the origin of the request
    callback(null, origin || '*');
  },
  credentials: true, // Allow cookies and credentials to be sent
}));


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
