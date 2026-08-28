import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { generateSyntheticData } from './utils/syntheticData';

dotenv.config();

const runSeeder = async () => {
  await connectDB();
  await generateSyntheticData();
  console.log('Seeding complete. Exiting...');
  process.exit(0);
};

runSeeder();
