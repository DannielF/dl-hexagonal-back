import { Transaction, TransactionRepository } from 'src/core/domain';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../postgres';
import { InjectRepository } from '@nestjs/typeorm';

export class TransactionRepositoryAdapter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  async findById(id: string): Promise<Transaction> {
    return await this.repository.findOne({
      where: {
        transactionId: id,
      },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.repository.find({
      relations: {
        client: true,
      },
      loadRelationIds: true,
    });
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.repository.save(transaction);
  }
}
