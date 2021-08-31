import { IAppStore, AppStore } from '../AppStore'
import { IMazeStore, MazeStore } from '../MazeStore'
import remotedev from 'mobx-remotedev'
import { IUserStore, UserStore } from '../UserStore'

export interface IRootStore {
  AppStore: IAppStore
  createMazeStore(): IMazeStore
  createUserStore(MazeStore: IMazeStore): IUserStore
}

export class RootStore implements IRootStore {
  AppStore = remotedev(new AppStore(), { name: 'AppStore' })

  createMazeStore(): IMazeStore {
    return remotedev(new MazeStore(this.AppStore), { name: 'MazeStore' })
  }

  createUserStore(MazeStore: IMazeStore): IUserStore {
    return remotedev(new UserStore(this.AppStore, MazeStore), { name: 'UserStore' })
  }
}
