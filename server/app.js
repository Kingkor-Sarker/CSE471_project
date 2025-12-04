console.log('THIS IS THE EXPRESS APP.JS BEING RUN');
// 1) Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

// 2) Then import other packages
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';   
// import morgan from 'morgan';


// 3) Then import your routes, controllers, etc.
// import productRoutes from './routes/productRoutes.js';

// 4) Then create and configure the app
const app = express();
app.use(cors());
app.use(express.json());
// app.use(helmet());
// app.use(morgan('dev'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working' });
});


// 5) Use env variables
const PORT = process.env.PORT || 8000;
// app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




//new 
