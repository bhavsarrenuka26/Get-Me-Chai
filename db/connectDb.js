import mongoose from "mongoose";
import dns from "dns";
dns.setServers(['8.8.8.8', '1.1.1.1']);
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return  
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`) 
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
export default connectDB