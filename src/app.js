const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Enable CORS here

const allowedOrigin = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));











// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Routes
const authRouter = require('./routes/auth.routes');
const testRouter = require('./routes/test.routes');
const roleRouter = require('./routes/roles.routes');
const checkloginrouter = require('./routes/login.check.routes');
const roofingroute = require('./routes/roofingrequest.auth.js');

app.use('/api', authRouter);
app.use('/api/test', testRouter);
app.use('/api', roleRouter);


app.use('/api',checkloginrouter);


//roofing request 
app.use('/api',roofingroute);



app.use('/uploads', express.static('uploads')); // <-- serve uploaded files






// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Route not found from node server'
  });
});


module.exports = app;
