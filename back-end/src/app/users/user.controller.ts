import { Controller, Post, Body, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserUseCase } from 'src/@core/usecases/users/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(
        @Inject('CreateUserUseCase')
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
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