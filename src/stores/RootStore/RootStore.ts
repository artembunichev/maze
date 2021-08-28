import { IAppStore, AppStore } from '../AppStore'
import { IMazeStore, MazeStore } from '../MazeStore'

export interface IRootStore {
  AppStore: IAppStore
  createMazeStore(): IMazeStore
}

export class RootStore implements IRootStore {
  AppStore = new AppStore()
  createMazeStore(): IMazeStore {
    return new MazeStore(this.AppStore)
  }
}
