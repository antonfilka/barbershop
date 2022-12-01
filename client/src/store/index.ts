/* eslint-disable no-use-before-define */
import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { userAgent, authAgent } from 'api/agents';
import { userReducer } from 'store/reducers';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [userAgent.reducerPath, authAgent.reducerPath, 'socket'],
};

const appReducer = combineReducers({
  user: userReducer,
  [userAgent.reducerPath]: userAgent.reducer,
  [authAgent.reducerPath]: authAgent.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'clear/persist') {
    storage.removeItem('persist:root');

    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const persistedSetupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userAgent.middleware, authAgent.middleware),
  });
};

export const store = persistedSetupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof persistedSetupStore>;
export type AppDispatch = typeof store.dispatch;
