import prisma from './prisma.js';

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Supabase PostgreSQL Connected via Prisma Client');
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
