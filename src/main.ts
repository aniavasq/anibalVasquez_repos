import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Ejercicio Practico Backend Developer')
    .setDescription(
      `API creada como ejercicio practico para medicion de habilidades tecnicas`,
    )
    .setVersion('1.0')
    .addTag('Repositories')
    .addTag('Organizations')
    .addTag('Tribes')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
