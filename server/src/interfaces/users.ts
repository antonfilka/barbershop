import * as jwt from 'jsonwebtoken';

export interface UserJwtPayload extends jwt.JwtPayload {
  name: string;
  surname: string;
  email: string;
  role?: string;
}
export interface UserJwtResetPayload extends jwt.JwtPayload {
  name: string;
  surname: string;
  email: string;
}

export interface UserLoginAttributes {
  email: string;
  password: string;
}

export interface UserUpdateAttributes {
  position?: string;
  startDate?: Date;
  endDate?: Date;
  dateOfBirth?: Date;
  phoneNumber?: string;
  contactInfo?: string;
  email?: string;
  name?: string;
  surname?: string;
  country?: string;
  city?: string;
  textField?: string;
}
export interface UserUpdateAvatar {
  isTemplate: string;
  templateType: string;
  colorId: string;
  url?: string;
}

export interface ResetPassAttributes {
  id: string;
  newPassword: string;
}

export interface UpdatePassAttributes {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export interface PaginationWithRole {
  limit?: number;
  offset?: number;
  role?: string;
  searchTerm?: string;
}

export enum Roles {
  all = 'all',
  admin = 'admin',
  manager = 'manager',
  employee = 'employee',
  topManager = 'top',
  ceo = 'ceo',
}
export enum RolesNumbers {
  admin = '1',
  manager = '2',
  employee = '3',
  topManager = '4',
  ceo = '5',
}

export enum Status {
  all = 'all',
  confirmed = 'confirmed',
  rejected = 'rejected',
  pending = 'pending',
}

export interface GetUsersWithManagersParams {
  limit: number;
  offset: number;
  role: string;
  searchTerm: string;
}

export interface UsersDatabaseSearchAttributes {
  searchString: string;
}
