import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv';
import { AdminUser } from '../entities/admin/admin.entity';
import { Categories } from '../entities/admin/categories.entity';
import { SubCategories } from '../entities/admin/subCategories.entity';
import { Image } from '../entities/image.entity';
import { UserOTP } from '../entities/userOtp.entity';
import { Businesses } from '../entities/businesses.entity';
import { BusinessHours } from '../entities/businessHours.entity';
import { Services } from '../entities/service.entity';
import { Products } from '../entities/product.entity';
import { AdminImages } from '../entities/admin/adminImages.entity';
import { TeamMembers } from '../entities/teamMembers.entity';
import { BusinessReview } from '../entities/businessesReview.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'bizzio',
  entities: [
    User,
    AdminUser,
    Categories,
    SubCategories,
    Image,
    UserOTP,
    Businesses,
    BusinessHours,
    Services,
    Products,
    AdminImages,
    TeamMembers,
    BusinessReview
  ], // Add more entities here
  synchronize: true, // Auto-create tables (set to false in production)
  logging: false, // Enable for debugging
  extra: {
    connectionLimit: 5 // Connection pool size
  }
});