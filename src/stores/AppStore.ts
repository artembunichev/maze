import { makeAutoObservable } from 'mobx'

export interface IAppStore {
  isGame: boolean
  numberOfMazes: number
  mazeWidth: number
  mazeHeight: number
  borderWidth: number
  cellSize: number
  cellSizeWithBorder: number

  setIsGame(value: boolean): void
  setNumberOfMazes(number: number): void
  setMazeWidth(width: number): void
  setMazeHeight(height: number): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  isGame = false
  numberOfMazes = 3
  borderWidth = 1
  mazeWidth = 6
  mazeHeight = 6
  cellSize = 50

  get cellSizeWithBorder(): number {
    return this.cellSize + this.borderWidth * 2
  }
  setIsGame(value: boolean): void {
    this.isGame = value
  }
  setNumberOfMazes(number: number): void {
    this.numberOfMazes = number
  }
  setMazeWidth(width: number): void {
    this.mazeWidth = width
  }
  setMazeHeight(height: number): void {
    this.mazeHeight = height
  }
}
