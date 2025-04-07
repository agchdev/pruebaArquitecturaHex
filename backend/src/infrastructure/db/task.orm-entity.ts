import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  createdAt: Date;
}
