import { makeAutoObservable } from 'mobx'
import { IAppStore } from './AppStore'
import uniqid from 'uniqid'
import { getRandom } from '../utils/getRandom'

export interface IBorder {
  left: boolean
  top: boolean
  right: boolean
  bottom: boolean
}
export interface ICell {
  border: IBorder
  id: string
  isExit: boolean
}
export interface IMazeStore {
  AppStore: IAppStore
  cellSize: number
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

  cellSize = 50

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
    let arr: Array<ICell> = new Array(this.numberOfCells).fill({
      border: {
        left: false,
        top: false,
        right: false,
        bottom: false,
      },
      isExit: false,
    })
    arr = arr.map((e) => {
      return {
        ...e,
        id: uniqid(),
      }
    })
    //Генерация границ для крайних клеток
    //Левый верхний угол
    arr[0].border = {
      left: true,
      top: true,
      right: false,
      bottom: false,
    }
    // Правый нижний угол
    arr[this.numberOfCells - 1].border = {
      right: true,
      bottom: true,
      left: false,
      top: false,
    }
    //Левый нижний угол
    arr[this.numberOfCells - this.width].border = {
      left: true,
      bottom: true,
      top: false,
      right: false,
    }
    //Правый верхний угол
    arr[this.width - 1].border = {
      top: true,
      right: true,
      left: false,
      bottom: false,
    }
    //Индексы верха
    for (let t = 1; t <= this.width - 2; t++) {
      arr[t].border = {
        top: true,
        left: false,
        right: false,
        bottom: false,
      }
    }
    //Индексы правой стороны
    for (let r = this.width * 2 - 1; r <= this.width - 1 + this.width * (this.width - 2); r = r + this.width) {
      arr[r].border = {
        right: true,
        left: false,
        top: false,
        bottom: false,
      }
    }
    //Индексы низа
    for (let b = this.numberOfCells - (this.width - 1); b <= this.numberOfCells - 2; b++) {
      arr[b].border = {
        bottom: true,
        left: false,
        top: false,
        right: false,
      }
    }
    //Индексы левой стороны
    for (let l = this.width; l <= this.width * (this.width - 2); l = l + this.width) {
      arr[l].border = {
        left: true,
        right: false,
        top: false,
        bottom: false,
      }
    }
    //Генерация границ для оставшихся клеток
    for (let i = 0; i <= this.numberOfCells - 1; i++) {
      if (!arr[i]) {
        arr[i].border = {
          left: false,
          top: false,
          right: false,
          bottom: false,
        }
      }
    }
    const random = getRandom(0, arr.length - 1)
    arr[random].isExit = true
    return arr
  }
}
