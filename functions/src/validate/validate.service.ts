import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateService {
  constructor(private configService: ConfigService) {}

  async validateBusiness(body: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.configService.get('PUBLIC_DATA_API_URL')}/validate?serviceKey=${this.configService.get('PUBLIC_DATA_API_KEY')}`,
        { businesses: [body] },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}
