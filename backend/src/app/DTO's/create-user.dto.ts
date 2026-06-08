import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/@core/domain/users/enums/enum.type.user';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    name!: string;

    @IsEmail({}, { message: 'O e-mail informado é inválido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email!: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve possuir ao menos 6 caracteres.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    password!: string;

    @IsEnum(UserRole, { message: 'O perfil de acesso informado é inválido.' })
    @IsNotEmpty({ message: 'O perfil de acesso é obrigatório.' })
    role!: UserRole;

    @IsOptional()
    active?: boolean;
}