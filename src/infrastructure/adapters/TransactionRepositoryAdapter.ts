import { Transaction, TransactionRepository } from 'src/core/domain';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../postgres';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

/**
 * @description Adapter for TransactionRepository
 * @author dannielf
 * @export
 * @class TransactionRepositoryAdapter
 * @implements {TransactionRepository}
 */
@Injectable()
export class TransactionRepositoryAdapter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  async findByClientId(id: string): Promise<Transaction[]> {
    return await this.repository.find({
      where: [{ from: id }, { to: id }],
      order: {
        date: 'DESC',
      },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.repository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.repository.save(transaction);
  }
}
