import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerifyService {
  constructor(private configService: ConfigService) {}

  async verifyBusiness(businessNumber: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.configService.get('PUBLIC_DATA_API_URL')}/status?serviceKey=${this.configService.get('PUBLIC_DATA_API_KEY')}`,
        { b_no: [businessNumber] },
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
