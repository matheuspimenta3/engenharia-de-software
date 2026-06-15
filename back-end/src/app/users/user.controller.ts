import { Controller, Post, Body, Inject, ConflictException, BadRequestException, Get, Query, Put, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../@core/usecases/users/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersUseCase } from '../../@core/usecases/users/get-users';
import { PaginationDto } from '../../@core/domain/basic/irepository';
import { UpdateUserUseCase } from '../../@core/usecases/users/update-user';

@Controller('users')
export class UserController {
    constructor(
        @Inject('CreateUserUseCase')
        private readonly createUserUseCase: CreateUserUseCase,
        @Inject('GetUsersUseCase')
        private readonly getUsersUseCase: GetUsersUseCase,
        @Inject('UpdateUserUseCase')
        private readonly updateUserUseCase: UpdateUserUseCase,
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

    @Get()
    async getUsers(
        @Query() query: PaginationDto,
    ) {
        return this.getUsersUseCase.execute(query);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: CreateUserDto,
    ) {
        return this.updateUserUseCase.execute(body, id);
    }
}