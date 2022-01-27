import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApmService } from './apm.service';
/**
 *  @description Archivo inrterceptor.ts que permiten vincular lógica adicional antes / después
 *  de la ejecución de un metodo. Transformando el resultado devuelto por la función o metodo.
 *
 *  @author Sanatiago Vargas Acevedo
 *  @date Julio-20 del 2021
 *
 */
@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly apmService: ApmService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Observable<any>>,
  ): Observable<any> {
    const [IncomingMessage] = context.getArgs();
    return next.handle().pipe(
      tap(() => {
        this.apmService.startTransaction(
          `${IncomingMessage.method} ${IncomingMessage.url}`,
        );
      }),
      catchError((error) => {
        this.apmService.captureError(error);
        throw error;
      }),
    );
  }
}
