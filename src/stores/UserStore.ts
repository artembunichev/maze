import { makeAutoObservable } from 'mobx'
import { IAppStore } from './AppStore'

export interface IPosition {
  x: number
  y: number
}

export interface IUserStore {
  AppStore: IAppStore
  userPosition: IPosition
  userSize: number

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class UserStore implements IUserStore {
  constructor(AppStore: IAppStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore
  }
  AppStore: IAppStore

  userPosition = {
    x: 0,
    y: 0,
  }

  updateXPosition(x: number): void {
    this.userPosition.x += x
  }
  updateYPosition(y: number): void {
    this.userPosition.y += y
  }

  get userSize(): number {
    return this.AppStore.cellSize
  }
}
