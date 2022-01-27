import { Test, TestingModule } from '@nestjs/testing';
import winston from 'winston';
import { requestDTOStub } from '../../../test/stubs/dummyData';
import { ServiceTVConcilia } from './servTVConcilia.service';

describe('AppController', () => {
  let service: ServiceTVConcilia;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceTVConcilia,
        {
          provide: 'winstonLogger',
          useFactory: () => {
            return winston
              .createLogger({
                transports: [new winston.transports.Console()],
              })
              .child({
                transactionId: '54kjgd568hj5Jg',
                timestamp: new Date(),
              });
          },
        },
      ],
    }).compile();

    service = app.get<ServiceTVConcilia>(ServiceTVConcilia);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service.getTVConcilia(requestDTOStub)).toEqual({
        result: 18,
        statusCode: 200,
      });
    });
  });
});
