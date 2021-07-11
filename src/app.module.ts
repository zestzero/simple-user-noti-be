import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';

const getMongoConnection = async (configService: ConfigService) => {
  const connectionUri = `mongodb://${configService.get<string>(
    'MONGO_USERNAME',
  )}:${configService.get<string>('MONGO_PASSWORD')}@${configService.get<string>(
    'MONGO_HOSTNAME',
  )}/${configService.get<string>('MONGO_DB')}`;
  console.log(connectionUri);
  return {
    uri: connectionUri,
  };
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.qa', '.env'],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConnection,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
