import UniqueId from './uniqueId';

export abstract class Entity<T> {
  protected _id: UniqueId;
  protected props: T;

  protected constructor(
    props: T,
    id?: UniqueId,
  ) {
    this.props = props;
    this._id = id ?? UniqueId.unique();
  }

  public get id(): string {
    return this._id.value;
  } 

  public toUpdate(): Partial<T> {
    return {
      ...this.props,
    };
  }
}