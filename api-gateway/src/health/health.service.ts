import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}

  getReadyStatus() {}

  getLiveStatus() {}
}
