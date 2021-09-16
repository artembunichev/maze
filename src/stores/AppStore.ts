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
  miniCoef = 5

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
