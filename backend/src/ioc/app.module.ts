import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIoCModule } from './user.module';
import { UserSchema } from './infra/database/typeorm/schemas/user.schema';

@Module({
  imports: [
    // Configuração de conexão do TypeORM com o PostgreSQL (ajuste as credenciais conforme seu ambiente)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_DATABASE ?? 'estoque_loja',
      entities: [UserSchema], // Registra o schema de usuários aqui
      synchronize: false,    // SEGUINDO SUA REGRA: Obrigado a usar migrations, nunca synchronize=true!
    }),

    // Plugamos o nosso módulo de IoC que gerencia o fluxo de Usuários
    UserIoCModule,
  ],
})
export class AppModule {}