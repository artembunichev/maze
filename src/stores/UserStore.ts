import { makeAutoObservable } from 'mobx'

export interface IPosition {
  x: number
  y: number
}

export interface IUserStore {
  userPosition: IPosition
  userSize: number

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class UserStore implements IUserStore {
  constructor() {
    makeAutoObservable(this)
  }
  userPosition = {
    x: 0,
    y: 0,
  }
  userSize = 30

  updateXPosition(x: number): void {
    this.userPosition.x += x
  }
  updateYPosition(y: number): void {
    this.userPosition.y += y
  }
}
