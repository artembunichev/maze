import { IAppStore, AppStore } from '../AppStore'
import { IMazeStore, MazeStore } from '../MazeStore'
import remotedev from 'mobx-remotedev'

export interface IRootStore {
  AppStore: IAppStore
  createMazeStore(): IMazeStore
}

export class RootStore implements IRootStore {
  AppStore = remotedev(new AppStore(), { name: 'AppStore' })
  createMazeStore(): IMazeStore {
    return remotedev(new MazeStore(this.AppStore), { name: 'MazeStore' })
  }
}
