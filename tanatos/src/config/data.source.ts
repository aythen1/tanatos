import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('HOST'),
  port: +configService.get('PORT'),
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  database: configService.get('DATABASE'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  // migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};
export const AppDataSource = new DataSource(DataSourceConfig);
