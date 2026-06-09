import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserIoCModule } from '../ioc/user.module';
import { UserSchema } from '../infra/database/typeorm/schemas/user.schema';

@Module({
  imports: [
    // Ativa a leitura do arquivo .env em todo o projeto
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuração do TypeORM usando as variáveis do ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserSchema],
        synchronize: false, // Mantendo sua regra: Usar apenas Migrations ou o comando de criação inicial do TypeORM
        ssl: {
          rejectUnauthorized: false, // OBRIGATÓRIO PARA O RENDER: Bancos em nuvem exigem conexão SSL segura
        },
      }),
    }),

    UserIoCModule,
  ],
})
export class AppModule {}