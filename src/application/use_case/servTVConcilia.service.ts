import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceStatusMigration } from 'src/infrastructure/external-api/customer/customerMigration.service';
import winston from 'winston';
import { RequestDTO } from '../../domain/request.dto';
import { ResponseDTO } from '../../domain/response.dto';
import { ServiceESBInspira } from '../../infrastructure/external-api/esbInspira/esbInspira.service';
import { ServiceHPE } from '../../infrastructure/external-api/HPE/hpe.service';

@Injectable()
export class ServiceTVConcilia {
  constructor(
    @Inject('winstonLogger') private logger: winston.Logger,
    private readonly statusMigration: ServiceStatusMigration,
    private readonly serviceESBInspira: ServiceESBInspira,
    private readonly serviceHPE: ServiceHPE,
  ) {}

  async getTVConcilia(requestDTO: RequestDTO) {
    const resulStatusM = await this.statusMigration.customer(requestDTO.cuenta);
    this.logger.info(
      `Resultado consumo de msCustSatusMigration, que determina si la cuenta es Inspira`,
      {
        request: requestDTO,
        response: resulStatusM,
      },
    );
    if (resulStatusM === 'INSPIRA') {
      const resultInspira = await this.serviceESBInspira.inspiraESB(
        requestDTO.cuenta,
      );
      this.logger.info(`Resultado Consumo de INSPIRA`, {
        request: requestDTO,
        response: resultInspira,
      });
      const resultHPE = await this.serviceHPE.inquiry(requestDTO.cuenta);
      this.logger.info(`Resultado Consumo de serviceHPE inquiry`, {
        request: requestDTO,
        response: resultHPE,
      });
      if (resultHPE === 'EXISTE INCONSISTENCIA') {
        const resultHPE = await this.serviceHPE.create(requestDTO.cuenta);
        this.logger.info(`Resultado Consumo de serviceHPE create`, {
          request: requestDTO,
          response: resultHPE,
        });
        return new ResponseDTO(resultHPE, HttpStatus.OK);
      }
      return 'NO EXISTE INCOSISTENCIA';
    }
    return new ResponseDTO(resulStatusM, HttpStatus.OK);
  }
}
