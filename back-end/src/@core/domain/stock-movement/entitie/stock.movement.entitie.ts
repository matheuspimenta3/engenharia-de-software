import { Entity } from "../../basic/entity";
import UniqueId from "../../basic/uniqueId";
import { StockMovementInput } from "../input/stock.movement.input";
import { StockMovementResponse } from "../response/stock.movement.response";
import { StockMovementValidatorFactory } from "../validator/stock.movement.validator";



export default class StockMovement extends Entity<StockMovementInput> {

    private constructor(
        props: StockMovementInput,
        id: UniqueId,
    ) {
        super(props, id);
    }

    public get productId() {
        return this.props.productId;
    }

    public set productId(value: string) {
        this.props.productId = value;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public set quantity(value: number) {
        this.props.quantity = value;
    }

    public get type() {
        return this.props.type;
    }

    public set type(value) {
        this.props.type = value;
    }

    public get observation() {
        return this.props.observation;
    }

    public set observation(value: string | undefined) {
        this.props.observation = value;
    }

    public get createdBy() {
        return this.props.createdBy;
    }

    public set createdBy(value: string) {
        this.props.createdBy = value;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    static newEntity(
        props: StockMovementInput,
        id = UniqueId.unique().value,
    ): StockMovement {

        this.validate(props);

        return new StockMovement(
            props,
            UniqueId.with(id),
        );
    }

    private static validate(
        props: StockMovementInput,
    ) {

        const validator =
            StockMovementValidatorFactory.create();

        validator.validate(props);

        if (validator.errors.length) {
            throw new Error(
                validator.errors.join(', '),
            );
        }
    }

    toJSON(): StockMovementResponse {

        return {
            id: this.id,
            productId: this.productId,
            quantity: this.quantity,
            type: this.type,
            observation: this.observation,
            createdBy: this.createdBy,
            createdAt: this.createdAt,
        };
    }

    toUpdate() {

        return {
            productId: this.productId,
            quantity: this.quantity,
            type: this.type,
            observation: this.observation,
            createdBy: this.createdBy,
            createdAt: this.createdAt,
        };
    }
}