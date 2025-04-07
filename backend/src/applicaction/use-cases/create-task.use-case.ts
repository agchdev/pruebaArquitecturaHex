import { TaskRepository } from '../ports/task.repository';
import { Task } from '../../domain/task.entity';
import { randomUUID } from 'crypto';

interface CreateTaskInput {
  title: string;
  description: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepo: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<void> {
    const task = new Task(
      randomUUID(),
      input.title,
      input.description,
    );
    await this.taskRepo.save(task);
  }
}
