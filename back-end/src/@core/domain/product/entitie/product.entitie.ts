/* eslint-disable prettier/prettier */

import { Entity } from '../../basic/entity';
import UniqueId from '../../basic/uniqueId';

import { ProductInput } from '../input/product.input';
import { ProductResponse } from '../response/product.response';
import { ProductValidatorFactory } from '../validator/prduct.validator';


export default class Product extends Entity<ProductInput> {

    private constructor(
        props: ProductInput,
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

    public get description() {
        return this.props.description;
    }

    public set description(value: string | undefined) {
        this.props.description = value;
    }

    public get price() {
        return this.props.price;
    }

    public set price(value: number) {
        this.props.price = value;
    }

    public get costPrice() {
        return this.props.costPrice;
    }

    public set costPrice(value: number) {
        this.props.costPrice = value;
    }

    public get categoryId() {
        return this.props.categoryId;
    }

    public set categoryId(value: string) {
        this.props.categoryId = value;
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
        props: ProductInput,
        id = UniqueId.unique().value,
    ): Product {

        this.validate(props);

        return new Product(
            props,
            UniqueId.with(id),
        );
    }

    private static validate(
        props: ProductInput,
    ) {

        const validator =
            ProductValidatorFactory.create();

        validator.validate(props);

        if (validator.errors.length) {
            throw new Error(
                validator.errors.join(', '),
            );
        }
    }

    toJSON(): ProductResponse {

        return {
            id: this.id,

            name: this.name,
            description: this.description,

            price: this.price,
            costPrice: this.costPrice,

            categoryId: this.categoryId,

            active: this.active,

            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    toUpdate() {

        return {
            id: this.id,

            name: this.name,
            description: this.description,

            price: this.price,
            costPrice: this.costPrice,

            categoryId: this.categoryId,

            active: this.active,

            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}