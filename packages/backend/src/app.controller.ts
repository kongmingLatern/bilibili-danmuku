import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { getMsgByCode } from './shared';
import { R } from './entities/R';

@Controller()
export class AppController {
  private qrcode_key: string = '';
  constructor(private readonly appService: AppService) {}

  @Get('/getQrcode')
  async getHello(): Promise<string> {
    const res = await axios.get(
      'http://passport.bilibili.com/x/passport-login/web/qrcode/generate',
    );
    const { data } = res.data;
    this.qrcode_key = data.qrcode_key;
    return res.data;
  }

  @Get('/scan')
  async getLogin(@Query('qrcode_key') qrcode_key: string) {
    console.log('qrcode_key', qrcode_key);
    const res = await axios
      .get('https://passport.bilibili.com/x/passport-login/web/qrcode/poll', {
        params: {
          qrcode_key,
        },
      })
      .catch((e) => e);
    const { data } = res.data;

    return new R(data.code, getMsgByCode(data.code), data);
  }
}