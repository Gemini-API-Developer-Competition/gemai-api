import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ValidateService } from './validate.service';

@Controller('api/validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post()
  async validate(@Body() body: any) {
    if (!body.business_number) {
      throw new BadRequestException('No business number provided');
    }
    const validationResult = await this.validateService.validateBusiness(body);
    return { businessNumber: body.business_number, validationResult };
  }
}
