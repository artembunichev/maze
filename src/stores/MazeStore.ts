import { makeAutoObservable } from 'mobx'
import { IAppStore } from './AppStore'
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
type ICellArray = Array<Array<ICell>>
export interface IMazeStore {
  AppStore: IAppStore
  numberOfCells: number
  width: number
  height: number
  cellsArray: ICellArray
}

export class MazeStore implements IMazeStore {
  constructor(AppStore: IAppStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore
  }
  AppStore: IAppStore

  get width(): number {
    return this.AppStore.mazeWidth
  }
  get height(): number {
    return this.AppStore.mazeHeight
  }
  get numberOfCells(): number {
    return this.width * this.height
  }
  get cellsArray(): ICellArray {
    const arr: ICellArray = []
    //!Заполение массива клеток
    for (let x = 0; x < this.width; x++) {
      arr[x] = []
      for (let y = 0; y < this.width; y++) {
        arr[x].push({
          border: {
            left: false,
            top: false,
            right: false,
            bottom: false,
          },
          id: `${x}${y}`,
          isExit: false,
        })
      }
    }

    const sideCells = arr.reduce((acc, r, rowIndex) => {
      r.forEach((el, index) => {
        if (index === 0 || index === this.width - 1 || rowIndex === 0 || rowIndex === this.width - 1) {
          acc.push(el)
        }
      })
      return acc
    }, [])

    //!Заполение крайних клеток
    arr.forEach((r, rowIndex) => {
      r.forEach((el, index) => {
        if (rowIndex === 0) {
          el.border = {
            ...el.border,
            top: true,
          }
        }
        if (rowIndex === this.width - 1) {
          el.border = {
            ...el.border,
            bottom: true,
          }
        }
        if (index === 0) {
          el.border = {
            ...el.border,
            left: true,
          }
        }
        if (index === this.width - 1) {
          el.border = {
            ...el.border,
            right: true,
          }
        }
      })
    })
    //!Генерация выхода
    const index = getRandom(0, sideCells.length - 1)
    const exitCell = sideCells[index]

    arr.forEach((r) => {
      r.forEach((el) => {
        if (el.id === exitCell.id) {
          el.isExit = true
        }
      })
    })

    return arr
  }
}
