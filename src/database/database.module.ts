import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES } from './database.constants';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: POSTGRES,
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        schema: configService.get<string>('database.schema'),
        autoLoadEntities: configService.get<string>('nodeEnv') !== 'production',
        synchronize: configService.get<string>('nodeEnv') !== 'production',
        logging: configService.get<string>('nodeEnv') !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
