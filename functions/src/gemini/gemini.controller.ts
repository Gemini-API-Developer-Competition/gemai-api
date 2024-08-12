import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('api/gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  async summarize(@Body('input_text') inputText: string) {
    if (!inputText) {
      throw new BadRequestException('No input text provided');
    }
    const summarizedText = await this.geminiService.summarize(inputText);
    return { inputText, summarizedText };
  }
}
