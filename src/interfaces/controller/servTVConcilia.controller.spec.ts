import { Test, TestingModule } from '@nestjs/testing';
import { TVConciliaController } from './servTVConcilia.controller';
import { ServiceTVConcilia } from '../../application/use_case/servTVConcilia.service';
import { requestDTOStub } from '../../../test/stubs/dummyData';
import winston from 'winston';

describe('AppController', () => {
  let appController: TVConciliaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TVConciliaController],
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

    appController = app.get<TVConciliaController>(TVConciliaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.MSServTVConcilia(requestDTOStub)).toEqual({
        result: 18,
        statusCode: 200,
      });
    });
  });
});
