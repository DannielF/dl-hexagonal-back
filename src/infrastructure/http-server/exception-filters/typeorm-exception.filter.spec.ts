import { TypeOrmExceptionFilter } from './typeorm-exception.filter';

describe('TypeormExceptionFilter', () => {
  it('should be defined', () => {
    expect(new TypeOrmExceptionFilter()).toBeDefined();
  });
});
