const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to MongoDB'.cyan.underline.bold);
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
};

module.exports = dbConnection;
