import { Repository } from 'typeorm';

//placeholder for extension over ORM repository
export class RepositoryBase<T> extends Repository<T> {}
