import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

export class TimeOutInterceptor implements NestInterceptor {
  timeOutNumber: number;
  constructor(timeOutNumber: number) {
    this.timeOutNumber = timeOutNumber;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(timeout(this.timeOutNumber));
  }
}
