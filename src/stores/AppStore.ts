import { makeAutoObservable } from 'mobx'

export interface IAppStore {
  numberOfMazes: number
  mazeWidth: number
  mazeHeight: number

  setNumberOfMazes(number: number): void
  setMazeWidth(width: number): void
  setMazeHeight(height: number): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  numberOfMazes = 3
  mazeWidth = 6
  mazeHeight = 6

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
