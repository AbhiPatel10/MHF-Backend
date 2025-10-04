import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AdminUserModel } from '../entities/admin/admin.schema';
import { VolunteerModel } from '../entities/volunteer.schema';

dotenv.config();

export const connectDB = async () => {
  try {
    // const uri = `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_DATABASE}`;
    const uri = process.env.DB_URL ?? "mongodb://localhost:27017/mhf";

    await mongoose.connect(uri, {
      user: process.env.DB_USERNAME || undefined,
      pass: process.env.DB_PASSWORD || undefined,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export const ensureCollections = async () => {
  await AdminUserModel.createCollection();
  console.log('✅ Admin collection ensured');
  await VolunteerModel.createCollection();
  console.log('✅ Volunteer collection ensured');
};
