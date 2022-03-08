import * as React from 'react';
import { EventEmitter } from 'events';

type StringOrDate = string | Date;

export interface IUserState {
  slug?: string;
}

export interface ISettingState {
  created?: StringOrDate;
  updated?: StringOrDate;
}

export interface ILogValue {
  count: number;
  dt: StringOrDate;
}

export interface IAppState {
  user: IUserState;
  current: ILogValue;
  logs: { items: { [k: string]: ILogValue }; created?: StringOrDate; updated?: StringOrDate };
  settings: ISettingState;
}

export const initialState: IAppState = {
  current: { count: 0, dt: new Date() },
  user: {},
  logs: {
    items: {},
  },
  settings: {},
};

export enum AppActions {
  addLog = 'addlog',
  setUser = 'setuser',
  setSetting = 'setsetting',
}

class AppEmitter extends EventEmitter {
  addLog(count: number) {
    this.emit(AppActions.addLog, { count });
  }
  setUser(payload: any) {
    this.emit(AppActions.setUser, payload);
  }
  setSetting(payload: any) {
    this.emit(AppActions.setSetting, payload);
  }
}

export const appEmitter = new AppEmitter();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  React.useEffect(() => {
    appEmitter.on(AppActions.setUser, (payload) => dispatch({ type: AppActions.setUser, payload }));
    appEmitter.on(AppActions.setSetting, (payload) => dispatch({ type: AppActions.setSetting, payload }));
    appEmitter.on(AppActions.addLog, (payload) => dispatch({ type: AppActions.addLog, payload }));
  }, []);

  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
};

export const appReducer = (state: IAppState, action: { type: string; payload: any }) => {
  let { type, payload } = action;

  const logKey = new Date().formatDateToStr();

  switch (type) {
    case AppActions.addLog:
      console.info('Adding log', payload);
      state.logs.items[logKey] = { ...payload, dt: new Date() };

      return { ...state };

    case AppActions.setUser:
      console.log('Setting user', payload);
      return state;

    case AppActions.setSetting:
      console.log('Setting setting', payload);
      return state;

    default:
      console.error('Invalid action');
      return state;
  }
};

export interface IAppCtxValue {
  state: IAppState;
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}
export const AppCtx = React.createContext<IAppCtxValue>({ state: initialState, dispatch: () => {} });
