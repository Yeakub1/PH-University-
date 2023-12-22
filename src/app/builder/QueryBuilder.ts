import { Query, FilterQuery } from 'mongoose';

class QueryBuilder<T> {
  public modelQurey: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQurey = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQurey = this.modelQurey.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // ? Filtering
    const excluedField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excluedField.forEach((el) => delete queryObj[el]);

    this.modelQurey = this.modelQurey.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = this?.query?.sort || '-createAt';
    this.modelQurey = this.modelQurey.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQurey = this.modelQurey.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQurey = this.modelQurey.select(fields);
    return this;
  }
};

export default QueryBuilder;
