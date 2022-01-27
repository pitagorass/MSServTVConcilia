import { Injectable, HttpService, Inject } from '@nestjs/common';
import winston from 'winston';
import config from 'src/infrastructure/common/config/config';
import { ConfigType } from '@nestjs/config';

/**
 *  @description Archivo service desde el cual se realizan las consultas hacia el servicio de
 *  Inspira.
 *
 *  @author Sanatiago Vargas Acevedo
 *  @date Julio-20 del 2021
 *
 */
@Injectable()
export class ServiceHPE {
  constructor(
    @Inject('winstonLogger') private logger: winston.Logger,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
  ) {}

  /**
   *  @description service desde el cual se realizan las consultas hacia
   *  Inspira.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  async inquiry(request: number): Promise<any> {
    const URI = this.configService.HPE;
    this.logger.info({
      message: 'Consultando servicio HPE ',
      request: request,
      response: URI,
    });
    return 'EXISTE INCONSISTENCIA';
  }

  async create(request: number): Promise<any> {
    const URI = this.configService.HPE;
    this.logger.info({
      message: 'Consultando servicio HPE ',
      request: request,
      response: URI,
    });
    return true;
  }
}
