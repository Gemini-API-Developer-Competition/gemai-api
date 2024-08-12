import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, ModelParams } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly client: GoogleGenerativeAI;
  private readonly modelParams: ModelParams;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    this.client = new GoogleGenerativeAI(apiKey);

    this.modelParams = {
      model: 'models/gemini-1.5-flash',
      generationConfig: {
        temperature: 1,
        maxOutputTokens: 8192,
        topP: 0.95,
        topK: 64,
        responseMimeType: 'text/plain',
      },
    };
  }

  async summarize(inputText: string): Promise<string> {
    const model = this.client.getGenerativeModel(this.modelParams);

    const request = {
      contents: [
        {
          role: 'user',
          parts: [{ text: inputText }],
        },
      ],
    };

    const response = await model.generateContent(request);

    return response.response.text();
  }
}
