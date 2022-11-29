export interface GetTaskTemplatesParams {
  limit: number;
  offset: number;
  searchTerm: string;
  tagsId?: string;
}

export interface EditTaskTemplateBody {
  id: number;
  title?: string;
  description?: string;
  authorId: number;
  oldValue?: string;
}

export interface CreateTaskTemplateBody {
  authorId: number;
  title: string;
  description: string;
  tags?: string;
}

export interface ChangeOrderTasksData {
  taskName: string;
  taskId: number;
}

export interface ChangeOrderTasks {
  tasksData: ChangeOrderTasksData[];
}
