import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('hackathona-api');

  const config = new DocumentBuilder()
    .setTitle('Hackathona')
    .setDescription('Endpoints utilizados para recuperar informações sobre saúde pública relacionadas ao COVID-19 no DF.')
    .setVersion('1.0')
    .addTag('hackathona')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('hackathona-api/explorer', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
