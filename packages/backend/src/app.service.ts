import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getQrcode(): string {
    return 'Hello World!';
  }

  scanQrcode() {
    return '123';
  }
}
