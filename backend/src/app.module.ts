import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task.module';
import { TaskOrmEntity } from './infrastructure/db/task.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hexagonal',
      entities: [TaskOrmEntity],
      synchronize: true, // solo para desarrollo
    }),
    TaskModule,
  ],
})
export class AppModule {}
