import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepository } from 'src/applicaction/ports/task.repository';
import { Task } from '../../domain/task.entity';
import { TaskOrmEntity } from './task.orm-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly ormRepo: Repository<TaskOrmEntity>,
  ) {}

  async save(task: Task): Promise<void> {
    const ormTask = this.ormRepo.create(task);
    await this.ormRepo.save(ormTask);
  }

  async findAll(): Promise<Task[]> {
    const ormTasks = await this.ormRepo.find();
    return ormTasks.map((t) => new Task(t.id, t.title, t.description, t.completed, t.createdAt));
  }

  async findById(id: string): Promise<Task | null> {
    const t = await this.ormRepo.findOneBy({ id });
    if (!t) return null;
    return new Task(t.id, t.title, t.description, t.completed, t.createdAt);
  }
}
