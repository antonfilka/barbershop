export interface AddTagToTaskBody {
  taskId: number;
  tagId: number;
}

export interface DeleteTagFromTaskBody {
  taskId: number;
  tagId: number;
}

export interface EditTagBody {
  tagId: number;
  title: string;
}
