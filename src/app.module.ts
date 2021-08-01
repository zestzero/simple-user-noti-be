import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

const getMongoConnection = async (configService: ConfigService) => {
    const connectionUri = `mongodb://${configService.get<string>(
        'MONGO_USERNAME',
    )}:${configService.get<string>(
        'MONGO_PASSWORD',
    )}@${configService.get<string>(
        'MONGO_HOSTNAME',
    )}/${configService.get<string>('MONGO_DB')}`;
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
        UserModule,
        TaskModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware);
    }
}
