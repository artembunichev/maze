import { IAppStore, AppStore } from '../AppStore'
import { IMazeStore, MazeStore } from '../MazeStore'
import remotedev from 'mobx-remotedev'
import { IUserStore, UserStore } from '../UserStore'

export interface IRootStore {
  AppStore: IAppStore
  createMazeStore(): IMazeStore
  createUserStore(): IUserStore
}

export class RootStore implements IRootStore {
  AppStore = remotedev(new AppStore(), { name: 'AppStore' })

  createMazeStore(): IMazeStore {
    return remotedev(new MazeStore(this.AppStore), { name: 'MazeStore' })
  }

  createUserStore(): IUserStore {
    return remotedev(new UserStore(), { name: 'UserStore' })
  }
}
