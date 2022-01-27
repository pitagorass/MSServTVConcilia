import { Injectable, HttpService, Inject } from '@nestjs/common';
import winston from 'winston';
import config from 'src/infrastructure/common/config/config';
import { ConfigType } from '@nestjs/config';

/**
 *  @description Archivo service desde el cual se realizan las consultas hacia el servicio de
 *  ms-catalog.
 *
 *  @author Sanatiago Vargas Acevedo
 *  @date Julio-20 del 2021
 *
 */
@Injectable()
export class ServiceStatusMigration {
  constructor(
    @Inject('winstonLogger') private logger: winston.Logger,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
  ) {}

  /**
   *  @description service desde el cual se realizan las consultas hacia
   *  ms-catalog en su metodo obtener centros disponibles.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  async customer(request: number): Promise<any> {
    const URI = this.configService.URLCUSTOMER;
    this.logger.info({
      message: 'Consultando MSCustomerQueryStatusMigration ',
      request: request,
      response: URI,
    });
    const response = 'INSPIRA';
    if (response === 'INSPIRA') {
      return 'INSPIRA';
    } else {
      return 'RR';
    }
    /* return this.httpService
      .get(URI, {
        headers: { 'Content-Type': 'application/json' },
      })
      .toPromise()
      .then((response: any) => {
        const respuesta = response.data;
        return respuesta; 
        response.data = 'RR';
        if (response.data === 'RR') {
          return 'RR';
        } else {
          return 'ESBINSPIRA';
        }
      })
      .catch((err) => {
        this.logger.error({
          message:
            'Error: No hay datos disponibles que mapear en customer status migration',
          request: '',
          response: err,
        });
        return null;
      }); */
  }
}
