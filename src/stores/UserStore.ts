import { makeAutoObservable } from 'mobx'
import { IAppStore } from './AppStore'
import { ICell, IMazeStore } from './MazeStore'
import { getRandom } from '../utils/getRandom'

export interface IPosition {
  x: number
  y: number
}

export interface IUserStore {
  AppStore: IAppStore
  userPosition: IPosition
  userSize: number
  currentCell: ICell

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class UserStore implements IUserStore {
  constructor(AppStore: IAppStore, MazeStore: IMazeStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore
    this.MazeStore = MazeStore

    //!УСТАНОВКА СТАРТОВОЙ ПОЗИЦИИ
    const randomIndex = (): number => {
      return getRandom(0, this.MazeStore.cellsArray.length - 1)
    }
    const indexX = randomIndex()
    const indexY = randomIndex()
    this.userPosition = {
      x: indexX * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
      y: indexY * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
    }
  }
  AppStore: IAppStore
  MazeStore: IMazeStore
  userPosition: IPosition

  updateXPosition(x: number): void {
    this.userPosition.x += x
  }
  updateYPosition(y: number): void {
    this.userPosition.y += y
  }

  get userSize(): number {
    return this.AppStore.cellSize
  }
  get currentCell(): ICell {
    return this.MazeStore.cellsArray[0][0]
  }
}
