export class Task {
    constructor(
      public readonly id: string,
      public title: string,
      public description: string,
      public completed: boolean = false,
      public createdAt: Date = new Date(),
    ) {}
  
    markAsCompleted(): void {
      this.completed = true;
    }
  }
  