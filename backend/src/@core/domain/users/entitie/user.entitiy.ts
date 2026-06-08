/* eslint-disable prettier/prettier */
import { Entity } from "../../basic/entity";
import UniqueId from "../../basic/uniqueId";
import { UserInput } from "../input/user.input";
import { UserResponse } from "../response/user.response";
import { UserValidatorFactory } from "../validator/user.validator";


export default class User extends Entity<UserInput> {

  private constructor(
    props: UserInput,
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

  public get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  public get password() {
    return this.props.password;
  }

  public set password(value: string) {
    this.props.password = value;
  }

  public get role() {
    return this.props.role;
  }

  public set role(value) {
    this.props.role = value;
  }

  public get active() {
    return this.props.active;
  }

  public set active(value: boolean) {
    this.props.active = value;
  }

  toggleStatus() {
    this.active = !this.active;
  }

  static newEntity(
    props: UserInput,
    id = UniqueId.unique().value,
  ): User {

    this.validate(props);

    return new User(
      props,
      UniqueId.with(id),
    );
  }

  private static validate(
    props: UserInput,
  ) {

    const validator =
      UserValidatorFactory.create();

    validator.validate(props);

    if (validator.errors.length) {
      throw new Error(
        validator.errors.join(', '),
      );
    }
  }

  toJSON(): UserResponse {

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      active: this.active,
    };
  }

  toUpdate() {

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      active: this.active,
      password: this.password,
    };
  }
}