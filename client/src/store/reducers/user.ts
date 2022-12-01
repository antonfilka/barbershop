import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAgent } from 'api/agents';

interface UserState {
  id: string;
  name: string;
  surname: string;
  email: string;
  position: string;
  startDate: string;
  endDate: string;
  dateOfBirth: string;
  phoneNumber: string;
  contactInfo: string;
  isAuthenticated: boolean;
  avatarImage: string | null;
  managerId?: string;
  userRole: { role: string };
  roleProject: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  surname: '',
  email: '',
  position: '',
  startDate: '',
  endDate: '',
  dateOfBirth: '',
  phoneNumber: '',
  contactInfo: '',
  isAuthenticated: false,
  avatarImage: null,
  userRole: { role: 'employee' },
  roleProject: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAvatarImage: (state: UserState, action: PayloadAction<string | null>) => {
      state.avatarImage = action.payload;
    },
    setPosition: (state: UserState, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setStartDate: (state: UserState, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authAgent.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload.user,
      };
    });
  },
});

export const {
  reducer: userReducer,
  actions: { setAuthenticated, setAvatarImage, setPosition, setStartDate },
} = userSlice;
