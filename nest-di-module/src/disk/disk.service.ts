import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(protected powerService: PowerService) {}

  getData() {
    console.log('Consuming 20 watts of power');
    this.powerService.supplyPower(20);
    return 'data';
  }
}
