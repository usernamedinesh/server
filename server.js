const cloudinary = require('./config/cloudinary')
const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const contactRoutes = require("./router/router");
const adminRoutes = require("./router/admin");
const visitorRoutes = require('./router/visitor');
const db = require("./config/database");
const PORT = process.env.PORT || 8002;
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');



app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));app.use(cors())

app.use(cors({
  origin: ['http://localhost:8000','http://localhost:8001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials
}));



app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
//connectdatabase
db();

cloudinary.cloudinaryConnect();
app.use(cookieParser());

// Use the contact routes
app.use("/api", contactRoutes);

// Use the admin routes
app.use("/admin", adminRoutes);

//visitor Routes
app.use('/app',visitorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
