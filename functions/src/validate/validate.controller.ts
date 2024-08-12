import {
  Controller,
  Post,
  Body,
  Render,
  BadRequestException,
} from '@nestjs/common';
import { ValidateService } from './validate.service';

@Controller('api/validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post()
  @Render('validate_result')
  async validate(@Body() body: any) {
    if (!body.business_number) {
      throw new BadRequestException('No business number provided');
    }
    const validationResult = await this.validateService.validateBusiness(body);
    return { businessNumber: body.business_number, validationResult };
  }
}
