import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';

// env file system
const envFilePath =
  process.env.NODE_ENV === 'production' ? '.env' : '.env.development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
