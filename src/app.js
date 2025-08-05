const express = require('express');
const cors = require('cors');

const app = express();

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Client can join their "room" (for user-specific notifications)
  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room: user_${userId}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



// Function to send notification to a specific user
function sendNotification(userId, message) {
  io.to(`user_${userId}`).emit("notification", { message });
}







app.use(cors({
   //origin: 'https://profer-ui.vercel.app',  
   origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
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
const proRouter = require('./routes/pro.route.js');
const probusinessRouter = require('./routes/pros.business.routes.js');

app.use('/api', authRouter);
app.use('/api/test', testRouter);
app.use('/api', roleRouter);
app.use('/api',checkloginrouter);
//roofing request 
app.use('/api',roofingroute);
const path = require('path');
// Serve uploads folder as static


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//pros registeration 
app.use('/api',proRouter);
//pros business details
app.use('/api',probusinessRouter);

//admin route 
const comapniesrouter = require('./routes/admin/companies.route.js');
const admindetailsrouter = require('./routes/admin/admindetails.route.js');
const admincmsrouter = require('./routes/admin/cms.routes.js');
const admminprojectdetails = require('./routes/admin/project.route.js');
app.use('/api',comapniesrouter);

//admin details 
app.use('/api',admindetailsrouter);

//admin cms details 
app.use('/api',admincmsrouter);

//admin project details
app.use('/api',admminprojectdetails);

//pros route 
const probusinessrouter = require("./routes/pro/business.route.js");
const projectrouter = require("./routes/pro/project.route.js");
const prosupdateprofile = require('./routes/pro/profile.route.js');

app.use('/api',probusinessrouter);
app.use('/api',projectrouter);
app.use('/api',prosupdateprofile);


//pros credntials uplodaer
const procredntialuploader = require('./routes/pro/credentialRoutes.route.js');
app.use('/api',procredntialuploader);











// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Route not found from node server'
  });
});

module.exports = server; // <-- changed from app to server
