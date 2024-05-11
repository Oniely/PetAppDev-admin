import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGO_URI) return console.log('Missing MongoDB URL');

    if (isConnected) {
        console.log("MongoDB connection already established!");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        isConnected = true;
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
    }
}