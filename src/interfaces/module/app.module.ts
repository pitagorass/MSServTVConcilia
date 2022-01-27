import { HttpModule, Module } from '@nestjs/common';
import configuration from '../../infrastructure/common/config/config';
import { TVConciliaController } from '../controller/servTVConcilia.controller';
import { ServiceTVConcilia } from '../../application/use_case/servTVConcilia.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/infrastructure/common.module';
import { ServiceStatusMigration } from 'src/infrastructure/external-api/customer/customerMigration.service';
import { ServiceESBInspira } from 'src/infrastructure/external-api/esbInspira/esbInspira.service';
import { ServiceHPE } from 'src/infrastructure/external-api/HPE/hpe.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
  ],
  controllers: [TVConciliaController],
  providers: [
    ServiceTVConcilia,
    CommonModule,
    ServiceStatusMigration,
    ServiceESBInspira,
    ServiceHPE,
  ],
})
export class AppModule {}
