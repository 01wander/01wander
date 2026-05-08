import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Database connected successfully');
}

main()
  .catch((e) => {
    console.error('Database connection error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;
