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
    const arr: Array<ICell> = []
    //Генерация границ для крайних клеток
    //Левый верхний угол
    arr[0] = {
      border: {
        left: true,
        top: true,
        right: false,
        bottom: false,
      },
      id: uniqid(),
    }
    // Правый нижний угол
    arr[this.numberOfCells - 1] = {
      border: {
        right: true,
        bottom: true,
        left: false,
        top: false,
      },
      id: uniqid(),
    }
    //Левый нижний угол
    arr[this.numberOfCells - this.width] = {
      border: {
        left: true,
        bottom: true,
        top: false,
        right: false,
      },
      id: uniqid(),
    }
    //Правый верхний угол
    arr[this.width - 1] = {
      border: {
        top: true,
        right: true,
        left: false,
        bottom: false,
      },
      id: uniqid(),
    }
    //Индексы верха
    for (let t = 1; t <= this.width - 2; t++) {
      arr[t] = {
        border: {
          top: true,
          left: false,
          right: false,
          bottom: false,
        },
        id: uniqid(),
      }
    }
    //Индексы правой стороны
    for (let r = this.width * 2 - 1; r <= this.width - 1 + this.width * (this.width - 2); r = r + this.width) {
      arr[r] = {
        border: {
          right: true,
          left: false,
          top: false,
          bottom: false,
        },
        id: uniqid(),
      }
    }
    //Индексы низа
    for (let b = this.numberOfCells - (this.width - 1); b <= this.numberOfCells - 2; b++) {
      arr[b] = {
        border: {
          bottom: true,
          left: false,
          top: false,
          right: false,
        },
        id: uniqid(),
      }
    }
    //Индексы левой стороны
    for (let l = this.width; l <= this.width * (this.width - 2); l = l + this.width) {
      arr[l] = {
        border: {
          left: true,
          right: false,
          top: false,
          bottom: false,
        },
        id: uniqid(),
      }
    }
    //Генерация границ для оставшихся клеток
    for (let i = 0; i <= this.numberOfCells - 1; i++) {
      if (!arr[i]) {
        arr[i] = {
          border: {
            left: false,
            top: false,
            right: false,
            bottom: false,
          },
          id: uniqid(),
        }
      }
    }
    return arr
  }
}
