import { TaskRepository } from '../ports/task.repository';

export class CompleteTaskUseCase {
  constructor(private readonly taskRepo: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.markAsCompleted();
    await this.taskRepo.save(task);
  }
}
