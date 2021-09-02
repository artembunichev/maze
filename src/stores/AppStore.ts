import { makeAutoObservable } from 'mobx'

export interface IAppStore {
  isGame: boolean
  mazeSize: number
  borderWidth: number
  cellSize: number
  cellSizeWithBorder: number

  setIsGame(value: boolean): void
  setMazeSize(width: number): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  isGame = false
  borderWidth = 1
  mazeSize = 6
  cellSize = 50

  get cellSizeWithBorder(): number {
    return this.cellSize + this.borderWidth * 2
  }
  setIsGame(value: boolean): void {
    this.isGame = value
  }
  setMazeSize(width: number): void {
    this.mazeSize = width
  }
}
