import { IAppStore, AppStore } from '../AppStore'
import { IMazeStore, MazeStore } from '../MazeStore'
import remotedev from 'mobx-remotedev'
import { IUserStore, UserStore } from '../UserStore'

export interface IRootStore {
  AppStore: IAppStore
  createMazeStore(AppStore: IAppStore): IMazeStore
  createUserStore(AppStore: IAppStore, MazeStore: IMazeStore): IUserStore
}

export class RootStore implements IRootStore {
  AppStore = remotedev(new AppStore(), { name: 'AppStore' })

  createMazeStore(AppStore: IAppStore): IMazeStore {
    return remotedev(new MazeStore(AppStore), { name: 'MazeStore' })
  }

  createUserStore(AppStore: IAppStore, MazeStore: IMazeStore): IUserStore {
    return remotedev(new UserStore(AppStore, MazeStore), { name: 'UserStore' })
  }
}
