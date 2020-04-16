export interface List {
  readonly name: string;
  readonly id: string;
}

export interface Reminder {
  readonly name: string;
  readonly body: string;
  readonly id: string;
  readonly completed: boolean;
  readonly completionDate: Date;
  readonly creationDate: Date;
  readonly dueDate: Date;
  readonly modificationDate: Date;
  readonly remindMeDate: Date;
  readonly priority: number;
}
