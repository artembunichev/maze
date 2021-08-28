import { IAppStore, AppStore } from '../AppStore';

export interface IRootStore {
  AppStore: IAppStore
}

export class RootStore implements IRootStore {
  AppStore = new AppStore()
}
