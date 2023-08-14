const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyJWT =  require('./middleware/verifyJWT');
const corsOptions = require('./config/corsOptions');
const dbConnect = require('./config/dbConnect');
dbConnect();

//CORS implementation
app.use(cors(corsOptions));



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//route
app.use('/', require('./routes/userRoute'));

// app.use(verifyJWT);
app.use("/", require("./routes/postRoute"));

mongoose.connection.once('open', () => {
    console.log('Database connection sucessful');
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
})
