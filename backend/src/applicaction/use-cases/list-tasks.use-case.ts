import { TaskRepository } from '../ports/task.repository';
import { Task } from '../../domain/task.entity';

export class ListTasksUseCase {
  constructor(private readonly taskRepo: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepo.findAll();
  }
}
