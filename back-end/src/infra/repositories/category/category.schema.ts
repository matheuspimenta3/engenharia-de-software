/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategorySchema {

    @PrimaryColumn({ type: 'uuid' })
    id!: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    name!: string;

    @Column({
        type: 'boolean',
        default: true,
    })
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