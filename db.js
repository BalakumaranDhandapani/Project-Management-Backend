const mongoose = require('mongoose')


const URI ='mongodb+srv://admin:Pu9p2wu5Mp7bG7yf@cluster0.7d8nmio.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
      const connection = await mongoose.connect(
          URI,
          {
              useCreateIndex: true,
              useNewUrlParser: true,
              useFindAndModify: false,
              useUnifiedTopology: true
          }
      )
      console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
      console.log(`MongoDB error when connecting: ${error}`);
  }
}
connectDB()
module.exports = mongoose
