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
type NearDirection = 'top' | 'bottom' | 'right' | 'left' | 'null'

interface ICellIndexes {
  y: number
  x: number
}
interface NearCellIndexes extends ICellIndexes {
  direction: NearDirection
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

    //!ГЕНЕРАЦИЯ ЛАБИРИНТА
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
    const startPosition = startPositions[randomIndex()]
    let generatorPosition: NearCellIndexes = { ...startPosition, direction: 'null' }
    this.currentCellIndexes = startPosition

    //!ФУНКЦИИ
    const getNear = (generatorPosition: ICellIndexes): Array<NearCellIndexes> => {
      const currentCell = generatorPosition
      const cellX: number = generatorPosition.x
      const cellY: number = generatorPosition.y

      const nearCells: Array<NearCellIndexes> = []

      const upCell: NearCellIndexes = { ...currentCell, y: cellY - 1, direction: 'top' }
      const downCell: NearCellIndexes = { ...currentCell, y: cellY + 1, direction: 'bottom' }
      const leftCell: NearCellIndexes = { ...currentCell, x: cellX - 1, direction: 'left' }
      const rightCell: NearCellIndexes = { ...currentCell, x: cellX + 1, direction: 'right' }

      if (cellX !== 0 && cellX !== this.size - 1) {
        nearCells.push(leftCell, rightCell)
      } else {
        if (cellX === 0) {
          nearCells.push(rightCell)
        } else if (cellX === this.size - 1) {
          nearCells.push(leftCell)
        }
      }

      if (cellY !== 0 && cellY !== this.size - 1) {
        nearCells.push(upCell, downCell)
      } else {
        if (cellY === 0) {
          nearCells.push(downCell)
        } else if (cellY === this.size - 1) {
          nearCells.push(upCell)
        }
      }

      return nearCells
    }
    const diff = (a1: Array<string>, a2: Array<NearCellIndexes>): Array<NearCellIndexes> => {
      return a2.filter((n) => {
        return a1.indexOf(arr[n.y][n.x].id) === -1
      })
    }
    const removeWall = (prevCell: ICell, nextCell: ICell, direction: NearDirection): void => {
      const reverseDirection = (d: NearDirection): NearDirection => {
        if (d === 'bottom') {
          return 'top'
        } else if (d === 'left') {
          return 'right'
        } else if (d === 'right') {
          return 'left'
        } else if (d === 'top') {
          return 'bottom'
        } else {
          return 'null'
        }
      }
      const reversedDirection = reverseDirection(direction)
      arr.forEach((r) => {
        r.forEach((l) => {
          if (l.id === prevCell.id) {
            if (direction !== 'null') {
              l.border[direction] = false
            }
          }
          if (l.id === nextCell.id) {
            if (reversedDirection !== 'null') {
              l.border[reversedDirection] = false
            }
          }
        })
      })
    }

    const visitedCells: Array<string> = [arr[generatorPosition.y][generatorPosition.x].id]

    //!ПРОХОД ГЕНЕРАТОРА ПО ЛАБИРИНТУ
    while (visitedCells.length < 15) {
      const prevCell = arr[generatorPosition.y][generatorPosition.x]
      const nears = diff(visitedCells, getNear(generatorPosition))
      if (nears.length !== 0) {
        generatorPosition = nears[getRandom(0, nears.length - 1)]
        const nextCell = arr[generatorPosition.y][generatorPosition.x]
        const direction = generatorPosition.direction
        removeWall(prevCell, nextCell, direction)
        visitedCells.push(nextCell.id)
      } else {
        break
      }
    }

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
