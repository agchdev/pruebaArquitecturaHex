import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/applicaction/use-cases/create-task.use-case';
import { ListTasksUseCase } from 'src/applicaction/use-cases/list-tasks.use-case';
import { TaskResponseDto } from './task-response.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { CompleteTaskUseCase } from 'src/applicaction/use-cases/complete-task.use-case';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(CreateTaskUseCase)
    private readonly createTask: CreateTaskUseCase,

    @Inject(ListTasksUseCase)
    private readonly listTasks: ListTasksUseCase,

    @Inject(CompleteTaskUseCase)
    private readonly completeTask: CompleteTaskUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 200, type: [TaskResponseDto]})
  @ApiBody({ type: CreateTaskDto }) // 👈 Esto hace que Swagger muestre el formulario
  async create(@Body() body: CreateTaskDto) {
    await this.createTask.execute(body);
    return { message: 'Task created' };
  }

  @Get()
  @ApiResponse({ status: 200, type: [TaskResponseDto] })
  async findAll() {
    const tasks = await this.listTasks.execute();
    return tasks;
  }

  @Patch(':id/complete')
  @ApiParam({ name: 'id', description: 'ID de la tarea a completar' })
  async complete(@Param('id') id: string) {
    await this.completeTask.execute(id);
    return { message: 'Task completed' };
  }

}
