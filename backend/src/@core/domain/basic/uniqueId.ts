import { parse, stringify, v4 } from 'uuid';
import { ValueObject } from './value-object';


export default class UniqueId extends ValueObject<string> {
    private constructor(value: string) {
        super(value ?? v4().toString());
    }

    public static unique() {
        return new UniqueId(v4().toString());
    }

    public static with(value: string): UniqueId {
    try {
        if (!value) {
            throw new Error('Id is required');
        }

        return new UniqueId(
            stringify(parse(value)),
        );
    } catch {
        throw new Error('Invalid value for id',);
    }
}
}
