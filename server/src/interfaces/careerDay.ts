export interface UpdateProgressTask {
  taskId: number;
  careerDayId: number;
  progress: number;
  data: HandleChangesTaskCareerDay;
}

export interface ChangeOpenTask {
  taskId: string;
  userId: string;
  careerDayId: string;
}

export interface CreateCareerDayBody {
  userId: number;
  managerId: number;
  title: string;
  dateCareerDay: Date;
}

export enum CareerDayStatus {
  all = 'all',
  noCareerDay = 'noCareerDay',
  active = 'active',
  passed = 'passed',
}

export interface GetMenteesOption {
  id: string;
  filterOption?: string;
}

export interface CreateCareerDayAttributes {
  userId: number;
  managerId: number;
  title: string;
  dateCareerDay: Date;
}

export interface CreateTaskBody {
  id: number;
  careerDayId: number;
  creatorId: number;
  title: string;
  description: string;
  deadline: Date;
  templateId?: number;
}
export interface UpdateProgressTask {
  taskId: number;
  careerDayId: number;
  progress: number;
}

export interface EditTaskBody {
  id: number;
  editorId: number;
  title?: string;
  description?: string;
  deadline?: Date;
}

export interface EditCareerDayBody {
  id: number;
  dateCareerDay?: Date;
  comments?: string;
}

export interface EditTaskAttributes {
  title?: string;
  description?: string;
  deadline?: Date;
}
export interface EditCareerDayAttributes {
  dateCareerDay?: Date;
  comments?: string;
}

export interface HandleChangesTaskCareerDay {
  authorId: number;
  taskId: number;
  action: string;
  newValue?: string | Date;
  oldValue?: string | Date;
  timeUpdate: Date;
  fileLink?: string;
}

export interface CreateCommentTaskBody {
  taskId: number;
  userId: number;
  comment: string;
}

export interface UpdateCommentBody {
  commentId: number;
  comment: string;
}
