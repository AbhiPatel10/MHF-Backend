import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AdminUserModel } from '../entities/admin/admin.schema';
import { VolunteerModel } from '../entities/volunteer.schema';

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = `mongodb+srv://aniketprajapatibiizline_db_user:B4lmC81SPirjptS6@cluster0.f3kug2l.mongodb.net/`;
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
