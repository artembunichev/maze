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
interface ICellIndexes {
  y: number
  x: number
}
export interface IMazeStore {
  AppStore: IAppStore
  numberOfCells: number
  size: number
  cellsArray: ICellArray
  userPosition: IPosition
  userSize: number
  currentCell: ICell
  currentCellIndexes: ICellIndexes

  updateXPosition(x: number): void
  updateYPosition(y: number): void
}

export class MazeStore implements IMazeStore {
  AppStore: IAppStore
  currentCellIndexes: ICellIndexes
  startPosition: [number, number]
  cellsArray: ICellArray

  constructor(AppStore: IAppStore) {
    makeAutoObservable(this)
    this.AppStore = AppStore

    const arr: ICellArray = []

    //!ЗАПОЛНЕНИЕ ВСЕХ КЛЕТОК
    for (let x = 0; x < this.size; x++) {
      arr[x] = []
      for (let y = 0; y < this.size; y++) {
        arr[x].push({
          border: {
            left: true,
            top: true,
            right: true,
            bottom: true,
          },
          id: `${x}${y}`,
          isExit: false,
        })
      }
    }

    //!УСТАНОВКА СТАРТОВОЙ ПОЗИЦИИ
    const startPositions: Array<ICellIndexes> = [
      { y: 0, x: 0 },
      { y: 0, x: this.size - 1 },
      { y: this.size - 1, x: 0 },
      { y: this.size - 1, x: this.size - 1 },
    ]
    const randomIndex = (): number => {
      return getRandom(0, startPositions.length - 1)
    }
    this.currentCellIndexes = startPositions[randomIndex()]

    //   const sideCells = arr.reduce((acc, r, rowIndex) => {
    //     r.forEach((el, index) => {
    //       if (index === 0 || index === this.size - 1 || rowIndex === 0 || rowIndex === this.size - 1) {
    //         acc.push(el)
    //       }
    //     })
    //     return acc
    //   }, [])

    //   //!Генерация выхода
    //   let index = getRandom(0, sideCells.length - 1)
    //   while (sideCells[index].id === arr[this.currentCellIndexes[0]][this.currentCellIndexes[1]].id) {
    //     index = getRandom(0, sideCells.length - 1)
    //   }
    //   const exitCell = sideCells[index]

    //   arr.forEach((r) => {
    //     r.forEach((el) => {
    //       if (el.id === exitCell.id) {
    //         el.isExit = true
    //       }
    //     })
    //   })
    this.cellsArray = arr
  }

  updateXPosition(x: number): void {
    if (x < 0) {
      if (!this.currentCell.border.left) {
        this.currentCellIndexes.x--
      }
    }
    if (x > 0) {
      if (!this.currentCell.border.right) {
        this.currentCellIndexes.x++
      }
    }
  }
  updateYPosition(y: number): void {
    if (y < 0) {
      if (!this.currentCell.border.top) {
        this.currentCellIndexes.y--
      }
    }
    if (y > 0) {
      if (!this.currentCell.border.bottom) {
        this.currentCellIndexes.y++
      }
    }
  }

  get userSize(): number {
    return this.AppStore.cellSize
  }
  get userPosition(): IPosition {
    return {
      x: this.currentCellIndexes.x * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
      y: this.currentCellIndexes.y * this.AppStore.cellSizeWithBorder + this.AppStore.borderWidth,
    }
  }
  get currentCell(): ICell {
    return this.cellsArray[this.currentCellIndexes.y][this.currentCellIndexes.x]
  }

  get size(): number {
    return this.AppStore.mazeSize
  }
  get numberOfCells(): number {
    return Math.pow(this.size, 2)
  }
}
