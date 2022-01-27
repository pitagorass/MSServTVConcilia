import { Global, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CONST_DATA } from 'src/infrastructure/common/resources/constData';
import uniqid from 'uniqid';
import winston from 'winston';
import { ApmInterceptor } from './common/apm/apm.interceptor';
import { ApmService } from './common/apm/apm.service';

@Global()
@Module({
  providers: [
    {
      provide: 'winstonLogger',
      useFactory: () => {
        return winston
          .createLogger({
            defaultMeta: {
              applicationName: CONST_DATA.APLICATION_NAME,
            },
            transports: [
              new winston.transports.Console({
                format: winston.format.colorize({
                  all: true,
                  colors: {
                    info: 'blue',
                    warn: 'yellow',
                    error: 'red',
                  },
                }),
              }),
            ],
          })
          .child({
            transactionId: uniqid(),
            timestamp: new Date(),
          });
      },
      scope: Scope.REQUEST,
    },
    ApmService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.DEFAULT,
      useClass: ApmInterceptor,
    },
  ],
  exports: ['winstonLogger'],
})
export class CommonModule {}
