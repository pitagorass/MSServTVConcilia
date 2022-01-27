import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import APM from 'elastic-apm-node';
import { CONST_DATA } from 'src/infrastructure/common/resources/constData';
import config from '../config/config';

/**
 *  @description Archivo service implementado para realiza la logica que permite
 *  capturar todas las peticiones (Transacciones) realizadas al servicio, ademas de los errores que se puedan
 *  generar en el mismo.
 *
 *  @author Sanatiago Vargas Acevedo
 *  @date Julio-20 del 2021
 *
 */
@Injectable()
export class ApmService {
  private readonly logger = new Logger(ApmService.name);

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    if (!APM.isStarted()) {
      APM.start({
        //#NOMBRE DE LA APP, CON ESTE NOMBRE TAMBIEN SE VA GUARDE EL INDICE DE APM
        serviceName: CONST_DATA.APLICATION_NAME,
        // The HTTP body of incoming HTTP requests
        captureBody: 'all',
        // Nombre del ambiente y el proyecto

        environment: this.configService.APM.ENVIRONMENT,
        // Use if APM Server requires a token
        secretToken: '',
        // Set custom APM Server URL (ELK QA)
        serverUrl: this.configService.APM.HOST,

        // Monitor for aborted TCP connections with un-ended HTTP requests
        errorOnAbortedRequests: true,
        // Any finite integer value will be used as the maximum number of frames to collect
        stackTraceLimit: 500,
        // Only activate the agent if it's running in production
        active: this.configService.APM.ISACTIVE,
      });
      this.logger.log('APM started');
    }
  }
  /**
   *  @description Metodo implementado para capturar los errores que se puedan generar
   *  unicamente si estan estos capturadores o definidos en los try catch.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  captureError(data: any) {
    APM.captureError(data);
  }
  /**
   *  @description Metodo implementado para que al momento de  iniciar nuestro micro servicio
   *  comience a interceptar (capturar) las transacciones realizadas por un cliente.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  startTransaction(name): any {
    return APM.startTransaction(name);
  }
  /**
   *  @description Metodo implementado para establecer el nombre de nuestras transacciones
   *  al momento de  iniciar nuestro micro servicio.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  setTransactionName(name) {
    return APM.setTransactionName(name);
  }
  /**
   *  @description Metodo implementado
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  startSpan(name): any {
    console.log('startSpan', name);
    return APM.startSpan(name);
  }
}
