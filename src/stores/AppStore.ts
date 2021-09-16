import { makeAutoObservable } from 'mobx'

export interface IAppStore {
  isGame: boolean
  mazeSize: number
  borderWidth: number
  cellSize: number
  cellSizeWithBorder: number
  isWin: boolean
  userSize: number

  miniCoef: number

  miniCellSize: number
  miniUserSize: number

  setIsGame(value: boolean): void
  setMazeSize(width: number): void
  setIsWin(value: boolean): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  isGame = false
  borderWidth = 1
  mazeSize = 10
  cellSize = 60
  isWin = false

  get cellSizeWithBorder(): number {
    return this.cellSize + this.borderWidth * 2
  }
  get userSize(): number {
    return this.cellSize
  }
  get miniCellSize(): number {
    return this.cellSize / this.miniCoef
  }
  get miniUserSize(): number {
    return this.userSize / this.miniCoef
  }
  get miniCoef(): number {
    if (this.mazeSize >= 10 && this.mazeSize < 12) {
      return 3
    } else if (this.mazeSize >= 13 && this.mazeSize < 20) {
      return 4.1
    } else if (this.mazeSize >= 20 && this.mazeSize <= 25) {
      return 5
    } else {
      return 8
    }
  }

  setIsGame(value: boolean): void {
    this.isGame = value
  }
  setMazeSize(width: number): void {
    this.mazeSize = width
  }
  setIsWin(value: boolean): void {
    this.isWin = value
  }
}
