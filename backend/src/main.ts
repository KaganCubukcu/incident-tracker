import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  // Request Logging Middleware
  app.use((req, res, next) => {
    const logger = new Logger('HTTP');
    if (req.method !== 'OPTIONS') {
      logger.log(
        `${req.method} ${req.url} - Origin: ${req.headers.origin || 'N/A'}`,
      );
    }
    next();
  });

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Incident Tracker API')
    .setDescription('The Incident Tracker API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  const logger = new Logger('Bootstrap');

  logger.log(`Server starting on port ${port}`);
  logger.log(`Allowed Origins: * (Diagnostic Mode)`);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
