/* eslint-disable prettier/prettier */
import { Entity } from '../../basic/entity';
import UniqueId from '../../basic/uniqueId';
import { CategoryInput } from '../input/category.input';
import { CategoryResponse } from '../response/category.response';
import { CategoryValidatorFactory } from '../validator/category.validator';

export default class Category extends Entity<CategoryInput> {

    private constructor(
        props: CategoryInput,
        id: UniqueId,
    ) {
        super(props, id);
    }

    public get name() {
        return this.props.name;
    }

    public set name(value: string) {
        this.props.name = value;
    }

    public get active() {
        return this.props.active;
    }

    public set active(value: boolean) {
        this.props.active = value;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    toggleStatus() {
        this.active = !this.active;
    }

    static newEntity(
        props: CategoryInput,
        id = UniqueId.unique().value,
    ): Category {

        this.validate(props);

        return new Category(
            props,
            UniqueId.with(id),
        );
    }

    private static validate(
        props: CategoryInput,
    ) {

        const validator =
            CategoryValidatorFactory.create();

        validator.validate(props);

        if (validator.errors.length) {
            throw new Error(
                validator.errors.join(', '),
            );
        }
    }

    toJSON(): CategoryResponse {

        return {
            id: this.id,
            name: this.name,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    toUpdate() {

        return {
            id: this.id,
            name: this.name,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}


