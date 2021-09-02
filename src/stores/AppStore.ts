import { makeAutoObservable } from 'mobx'

export interface IAppStore {
  isGame: boolean
  mazeWidth: number
  borderWidth: number
  cellSize: number
  cellSizeWithBorder: number

  setIsGame(value: boolean): void
  setMazeWidth(width: number): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  isGame = false
  borderWidth = 1
  mazeWidth = 6
  cellSize = 50

  get cellSizeWithBorder(): number {
    return this.cellSize + this.borderWidth * 2
  }
  setIsGame(value: boolean): void {
    this.isGame = value
  }
  setMazeWidth(width: number): void {
    this.mazeWidth = width
  }
}
