import { User } from '../../entities';

export interface UserRepository {
  findById(id: number): Promise<User>;
  findAll(): Promise<Array<User>>;
  save(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
}
