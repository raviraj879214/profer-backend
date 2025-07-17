const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Enable CORS here
app.use(cors({
  origin: `${process.env.FRONTEND_PUBLIC_URL}`,
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

app.use('/api', authRouter);
app.use('/api/test', testRouter);
app.use('/api', roleRouter);


app.use('/api',checkloginrouter);





// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Route not found from node server'
  });
});


module.exports = app;
