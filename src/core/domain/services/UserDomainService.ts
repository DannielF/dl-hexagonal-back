import { UserServiceError } from 'src/core/shared';
import { User } from '../entities';
import { UserRepository, UserService } from '../ports';

export class UserDomainService implements UserService {
  constructor(private repository: UserRepository) {}

  async findById(id: number): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) throw new UserServiceError('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    const userDb = await this.findById(id);
    if (!userDb) throw new UserServiceError('User do not exits');
    return this.repository.update(id, user);
  }

  async delete(id: number): Promise<boolean> {
    const userDb = await this.findById(id);
    if (!userDb) throw new UserServiceError('User do not exits');
    return this.repository.delete(id);
  }
}
