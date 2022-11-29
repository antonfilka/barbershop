export interface GetRequestsAttributes {
  limit: number;
  offset: number;
  filterOption: string;
}

export interface GetRequestsByDateAttributes {
  limit: number;
  offset: number;
}

export interface RequestsByDateRes {
  weekDay: string;
  all: number;
  confirmed: number;
  rejected: number;
  pending: number;
  id: number;
}

export interface GetUsersByRole {
  filterOption: string;
}
