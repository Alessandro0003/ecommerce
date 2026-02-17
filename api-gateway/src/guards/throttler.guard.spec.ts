import { Test, TestingModule } from '@nestjs/testing';
import { CustomThrottlerGuard } from './throttler.guard';

describe('ThrottlerGuard', () => {
  let guard: CustomThrottlerGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomThrottlerGuard],
    }).compile();

    guard = module.get<CustomThrottlerGuard>(CustomThrottlerGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
