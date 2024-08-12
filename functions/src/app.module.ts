import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';
import { VerifyModule } from './verify/verify.module';
import { ValidateModule } from './validate/validate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GeminiModule,
    VerifyModule,
    ValidateModule,
  ],
})
export class AppModule {}
