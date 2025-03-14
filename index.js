const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('dotenv').config(); 
const app = express();
const userRoutes = require('./Routers/userRoutes');
const projectRoutes = require('./Routers/projectsRoutes');
const formRoutes = require("./Routers/formRoutes");
const taskRouter = require("./Routers/tasks");
const contactRouter = require("./Routers/contactRoutes");
const scheduleRoutes = require("./Routers/scheduleRoute")
const path = require('path');
const cors = require('cors');

// Middleware

app.use(express.static(path.join(__dirname, 'build')));


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(bodyParser.json());
const helmet = require('helmet');
app.use(helmet());
const morgan = require('morgan');
app.use(morgan('combined'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



// Routes
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/form', formRoutes);
app.use('/api', taskRouter);
app.use("/contact", contactRouter);
app.use("/schedule", scheduleRoutes);

// Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
