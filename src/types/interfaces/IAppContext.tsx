import { IAppState } from "./IAppState";

export interface IAppContext {
  appData: IAppState;
  setAppData?: React.Dispatch<React.SetStateAction<IAppState>>;
}
