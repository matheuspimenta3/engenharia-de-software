/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { UserRole } from '../../../@core/domain/users/enums/enum.type.user';

@Entity({ name: 'users' })
export class UserSchema {
    @PrimaryColumn({ type: 'uuid' })
    // eslint-disable-next-line prettier/prettier
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    // Armazenará o hash da senha, nunca em texto puro
    @Column({ type: 'varchar', length: 255 })
    password!: string;

    // Mapeamento do Enum de perfil de acesso (ADMIN, RESPONSAVEL, FUNCIONARIO)
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.FUNCIONARIO, // Ou o valor padrão que fizer sentido para as suas regras
    })
    role!: UserRole;

    @Column({ type: 'boolean', default: true })
    active!: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt!: Date;
}