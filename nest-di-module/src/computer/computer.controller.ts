import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    protected cpuService: CpuService,
    protected diskService: DiskService,
  ) {}

  @Get()
  run() {
    return [this.cpuService.calculate(1, 2), this.diskService.getData()];
  }
}
