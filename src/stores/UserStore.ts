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
  currentCellIndexes: [number, number]

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class UserStore implements IUserStore {
  AppStore: IAppStore
  MazeStore: IMazeStore
  currentCellIndexes: [number, number]

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
    this.currentCellIndexes = [indexY, indexX]
  }

  updateXPosition(x: number): void {
    if (x < 0) {
      if (!this.currentCell.border.left) {
        this.currentCellIndexes[1]--
      }
    }
    if (x > 0) {
      if (!this.currentCell.border.right) {
        this.currentCellIndexes[1]++
      }
    }
  }
  updateYPosition(y: number): void {
    if (y < 0) {
      if (!this.currentCell.border.top) {
        this.currentCellIndexes[0]--
      }
    }
    if (y > 0) {
      if (!this.currentCell.border.bottom) {
        this.currentCellIndexes[0]++
      }
    }
  }

  get userSize(): number {
    return this.AppStore.cellSize
  }
  get userPosition(): IPosition {
    return {
      x: this.currentCellIndexes[1] * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
      y: this.currentCellIndexes[0] * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
    }
  }
  get currentCell(): ICell {
    return this.MazeStore.cellsArray[this.currentCellIndexes[0]][this.currentCellIndexes[1]]
  }
}
