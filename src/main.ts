import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.listen(5000);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: { port: 5000 },
        },
    );
    app.listen();
}
bootstrap();
