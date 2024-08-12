import {
  Controller,
  Post,
  Body,
  Render,
  BadRequestException,
} from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('api/verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  @Render('api_result')
  async verify(@Body('business_number') businessNumber: string) {
    if (!businessNumber) {
      throw new BadRequestException('No business number provided');
    }
    const verificationResult =
      await this.verifyService.verifyBusiness(businessNumber);
    return { businessNumber, verificationResult };
  }
}
