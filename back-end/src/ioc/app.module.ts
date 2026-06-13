import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from '../infra/repositories/users/user.schema';
import { UserIoCModule } from 'src/app/users/user.module';
import { CategoryIoCModule } from 'src/app/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

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
        synchronize: false,
        ssl: {
          rejectUnauthorized: false, // Necessário para conectar ao Render localmente
        },
      }),
    }),

    UserIoCModule,
    CategoryIoCModule,
  ],
})
export class AppModule { }