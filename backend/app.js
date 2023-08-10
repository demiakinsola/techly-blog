const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const dbConnect = require('./config/dbConnect');
dbConnect();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/post', require('./routes/postRoute'));

//subscription route

app.use('/', require('./routes/userRoute'));


mongoose.connection.once('open', () => {
    console.log('Database connection sucessful');
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
})
