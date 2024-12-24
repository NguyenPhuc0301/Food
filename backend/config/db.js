import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://phucnguyentran0301:ntp03012005@cluster0.eraw2.mongodb.net/food').then(()=>console.log("DB Conected"));
}