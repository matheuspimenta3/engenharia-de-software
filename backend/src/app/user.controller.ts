import { Controller, Post, Body, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from 'src/@core/use-cases/users/create-user.use-case';

@Controller('users')
export class UserController {
    constructor(
        // Injeta o Caso de Uso usando o token que definiremos no IoC
        @Inject('CreateUserUseCase')
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            // Repassa os dados validados do DTO diretamente para o Caso de Uso
            return await this.createUserUseCase.execute(createUserDto);
        } catch (error: any) {
            // Traduz os erros de negócio do domínio para exceções HTTP do NestJS
            if (error.message.includes('já está sendo utilizado')) {
                throw new ConflictException(error.message);
            }

            throw new BadRequestException(error.message);
        }
    }
}