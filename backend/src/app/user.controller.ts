import { Controller, Post, Body, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from '../@core/usecases/users/create-user.use-case';
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
            // Garantimos que 'active' tenha um valor booleano padrão antes de enviar ao caso de uso
            const userInput = {
                ...createUserDto,
                active: createUserDto.active ?? true, // Se for undefined, assume true
            };

            return await this.createUserUseCase.execute(userInput);
        } catch (error: any) {
            if (error.message.includes('já está sendo utilizado')) {
                throw new ConflictException(error.message);
            }

            throw new BadRequestException(error.message);
        }
    }
}