export interface Member {
  id: number;
  position: string;
}
export interface CreateProjectBody {
  authorId: number;
  name: string;
  description: string;
  startDate: Date;
  clientId: number;
  priority: string;
  privateAdditionals: string | null;
  publicAdditionals: string | null;
  status: string | null;
  positions: number[];
  managers: number[];
  members: Member[];
  files: string[];
}

export interface UpdateMembersBody {
  startDate: Date;
  projectId: number;
  positions: number[];
  members: Member[];
}

export interface GetManagersBody {
  searchTerm: string;
  limit: number;
  offset: number;
}

export interface DeleteProjectBody {
  id: string;
}

export type UpdateProjectBody = CreateProjectBody & DeleteProjectBody;

export enum RolesProject {
  member = 'member',
  manager = 'manager',
}

export enum ProjectsStatus {
  all = 'all',
  waitToStart = 'waitToStart',
  started = 'started',
  inProgress = 'inProgress',
  compliting = 'compliting',
  finished = 'finished',
  closed = 'closed',
}

export const ProjectsStatusFull = {
  all: 'all',
  waitToStart: 'Wait to start',
  started: 'Started',
  inProgress: 'In Progress',
  compliting: 'Compliting',
  finished: 'Finished',
  closed: 'Closed',
};
