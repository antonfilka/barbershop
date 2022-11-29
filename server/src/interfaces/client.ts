export interface Representative {
  avatar?: string;
  comment?: string;
  email?: string;
  name: string;
  phoneNumber?: string;
  role?: string;
  surname?: string;
  img: Blob;
}

export interface CreateClientData {
  comments?: string;
  name: string;
  owner: string;
  payment: string;
  companyType: string;
  priority?: PriorityEnum;
  avatar: string;
}

export interface CreateClientRepresentativeData {
  clientId: number;
  comment?: string;
  email?: string;
  name: string;
  phoneNumber?: string;
  role?: string;
  surname?: string;
  avatar?: string;
}

export interface UpdateClientData {
  id: number;
  comments?: string;
  name: string;
  owner: string;
  payment: string;
  companyType: string;
  priority: PriorityEnum;
  deletedAgents?: string;
  logoImage?: string;
}

export interface UpdateClientRepresentativeData {
  id: number;
  email?: string;
  name: string;
  phoneNumber?: string;
  role?: string;
  surname?: string;
  avatar?: string;
  comment?: string;
}

export enum PriorityEnum {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
