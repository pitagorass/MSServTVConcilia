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
export class ServiceESBInspira {
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
  async inspiraESB(request: number): Promise<any> {
    const URI = this.configService.URLESBINSPIRA;
    this.logger.info({
      message: 'Consultando ESB Inspira ',
      request: request,
      response: URI,
    });
    return true;
    /* return this.httpService
      .get(URI, {
        headers: { 'Content-Type': 'application/json' },
      })
      .toPromise()
      .then((response: any) => {
        const respuesta = response.data;
        return respuesta;
      })
      .catch((err) => {
        this.logger.error({
          message: 'Error: No hay datos disponibles que mapear en ESB Insipira',
          request: '',
          response: err,
        });
        return null;
      }); */
  }
}
