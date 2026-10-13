import { defineConfig, env } from 'prisma/config';
import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
});
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
