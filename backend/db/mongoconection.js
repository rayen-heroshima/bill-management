import mongoose from "mongoose";
import express from 'express';
export const mongoConnection = async (req,res) => {
try {
    await mongoose.connect(process.env.Mongo_URI)
    console.log('MongoDB connected');
} catch (error) {
    console.log('Error:', error.message);
    
}
}
