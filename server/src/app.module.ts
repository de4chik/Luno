import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module.js';
import { PrismaModule } from './resources/prisma/prisma.module.js';
import { JsonwebtokenModule } from './resources/jsonwebtoken/jsonwebtoken.module.js';
import { CategoryModule } from './resources/category/category.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
    }),
    AuthModule,
    PrismaModule,
    JsonwebtokenModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
