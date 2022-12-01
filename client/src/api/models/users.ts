/* eslint-disable no-unused-vars */

export type SignInUserParams = {
  email: string;
  password: string;
  timeZone: number;
};

export type UserDataResponce = {
  id: string;
  name: string;
  surname: string;
  email: string;
  position: string;
  startDate: string;
  endDate: string;
  dateOfBirth: string;
  phoneNumber: string;
  socialNetwork: string;
  avatarImage: string | null;
  userRole: { role: string };
  managerId: string;
  contactInfo: string;
  country: string;
  city: string;
  textField: string;
  roleProject: string;
};

export type SignInUserDataResponce = {
  accessToken: string;
  refreshToken: string;
  user: UserDataResponce;
};
