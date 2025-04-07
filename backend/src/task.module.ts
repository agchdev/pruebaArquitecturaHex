import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/db/task.orm-entity';
import { TypeOrmTaskRepository } from './infrastructure/db/ task.repository.impl';
import { CreateTaskUseCase } from './applicaction/use-cases/create-task.use-case';
import { ListTasksUseCase } from './applicaction/use-cases/list-tasks.use-case';
import { TaskController } from './infrastructure/http/task.controller';
import { CompleteTaskUseCase } from './applicaction/use-cases/complete-task.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: TypeOrmTaskRepository,
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (repo: TypeOrmTaskRepository) => new CreateTaskUseCase(repo),
      inject: ['TaskRepository'],
    },
    {
      provide: ListTasksUseCase,
      useFactory: (repo: TypeOrmTaskRepository) => new ListTasksUseCase(repo),
      inject: ['TaskRepository'],
    },
    {
      provide: CompleteTaskUseCase,
      useFactory: (repo: TypeOrmTaskRepository) => new CompleteTaskUseCase(repo),
      inject: ['TaskRepository'],
    }
  ],
})
export class TaskModule {}
