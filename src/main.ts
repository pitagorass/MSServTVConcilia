import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONST_DATA } from './infrastructure/common/resources/constData';
import configuration from './infrastructure/common/config/config';
import { TimeOutInterceptor } from './infrastructure/common/interceptors/timeout.interceptors';
import { AppModule } from './interfaces/module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new TimeOutInterceptor(app.get(configuration.KEY).TIMEOUT),
  );

  app.setGlobalPrefix(CONST_DATA.API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle(CONST_DATA.SWAGGER_TITLE)
    .setDescription(CONST_DATA.SWAGGER_DESCRIPTION)
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(app.get(configuration.KEY).PORT);

  (await app.resolve('winstonLogger')).info(
    `Application is running on: ${await app.getUrl()}`,
    'Main',
  );
}
bootstrap();
