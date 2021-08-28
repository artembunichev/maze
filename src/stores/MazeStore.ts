import { makeAutoObservable } from 'mobx'
import { IAppStore } from './AppStore'
import uniqid from 'uniqid'

export interface IBorder {
  left: boolean
  top: boolean
  right: boolean
  bottom: boolean
}
export interface ICell {
  border: IBorder
  id: string
}
export interface IMazeStore {
  AppStore: IAppStore
  widthOfCell: number
  numberOfCells: number
  width: number
  height: number
  cellsArray: Array<ICell>
}

export class MazeStore implements IMazeStore {
  constructor(AppStore: IAppStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore
  }
  AppStore: IAppStore

  widthOfCell = 50

  get width(): number {
    return this.AppStore.mazeWidth
  }
  get height(): number {
    return this.AppStore.mazeHeight
  }
  get numberOfCells(): number {
    return this.width * this.height
  }
  get cellsArray(): Array<ICell> {
    const arr: Array<ICell> = []
    for (let i = 0; i < this.numberOfCells; i++) {
      arr.push({
        border: {
          left: true,
          top: true,
          right: true,
          bottom: true,
        },
        id: uniqid(),
      })
    }
    return arr
  }
}
