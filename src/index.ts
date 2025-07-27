import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import eventRoutes from './routes/events';
import propertyRoutes from './routes/properties';
import trackingPlanRoutes from './routes/trackingPlans';
const db = require('./config/db'); // Assuming you have a db config file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/tracking-plans', trackingPlanRoutes);


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
