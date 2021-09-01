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
export interface IPosition {
  x: number
  y: number
}

type ICellArray = Array<Array<ICell>>

export interface IMazeStore {
  AppStore: IAppStore
  numberOfCells: number
  width: number
  height: number
  cellsArray: ICellArray
  userPosition: IPosition
  userSize: number
  currentCell: ICell
  currentCellIndexes: [number, number]

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class MazeStore implements IMazeStore {
  AppStore: IAppStore
  currentCellIndexes: [number, number]

  constructor(AppStore: IAppStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore

    //!УСТАНОВКА СТАРТОВОЙ ПОЗИЦИИ
    const randomIndex = (): number => {
      return getRandom(0, this.cellsArray.length - 1)
    }
    const indexX = randomIndex()
    const indexY = randomIndex()
    this.currentCellIndexes = [indexY, indexX]
  }

  updateXPosition(x: number): void {
    if (x < 0) {
      if (!this.currentCell.border.left) {
        this.currentCellIndexes[1]--
      }
    }
    if (x > 0) {
      if (!this.currentCell.border.right) {
        this.currentCellIndexes[1]++
      }
    }
  }
  updateYPosition(y: number): void {
    if (y < 0) {
      if (!this.currentCell.border.top) {
        this.currentCellIndexes[0]--
      }
    }
    if (y > 0) {
      if (!this.currentCell.border.bottom) {
        this.currentCellIndexes[0]++
      }
    }
  }

  get userSize(): number {
    return this.AppStore.cellSize
  }
  get userPosition(): IPosition {
    return {
      x: this.currentCellIndexes[1] * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
      y: this.currentCellIndexes[0] * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
    }
  }
  get currentCell(): ICell {
    return this.cellsArray[this.currentCellIndexes[0]][this.currentCellIndexes[1]]
  }

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
