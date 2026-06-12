/* eslint-disable prettier/prettier */
import { Entity } from "../../basic/entity";
import UniqueId from "../../basic/uniqueId";
import { UserInput } from "../input/user.input";
import { UserResponse } from "../response/user.response";
import { UserValidatorFactory } from "../validator/user.validator";
import * as bcrypt from 'bcrypt';

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

  public set email(value: string) {
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

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
  toggleStatus() {
    this.active = !this.active;
  }

  public async encryptPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async comparePassword(plainPassword: string,): Promise<boolean> {
    return bcrypt.compare( plainPassword, this.password,);
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}