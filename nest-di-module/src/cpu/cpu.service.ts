import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(protected powerService: PowerService) {}

  calculate(a: number, b: number) {
    console.log('Consume 10 power of watt');
    this.powerService.supplyPower(10);
    return a * b;
  }
}
