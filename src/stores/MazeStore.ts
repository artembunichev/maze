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
  isStart: boolean
  isVisited: boolean
}
type ICellArray = Array<Array<ICell>>
type NearDirection = 'top' | 'bottom' | 'right' | 'left' | 'null'
export interface ICellIndexes {
  y: number
  x: number
}
interface NearCellIndexes extends ICellIndexes {
  direction: NearDirection
}
interface IDate {
  start: number
  end: number
}

export interface IMazeStore {
  AppStore: IAppStore
  numberOfCells: number
  size: number
  cellsArray: ICellArray
  startPosition: ICellIndexes
  userPosition: ICellIndexes
  currentCell: ICell
  currentCellIndexes: ICellIndexes
  date: IDate

  updateXPosition(x: number): void
  updateYPosition(y: number): void
  setStartDate(date: number): void
  setEndDate(date: number): void
  setIsCellVisited(): void
}

export class MazeStore implements IMazeStore {
  AppStore: IAppStore
  currentCellIndexes: ICellIndexes
  cellsArray: ICellArray
  startPosition: ICellIndexes

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
          id: `${x}r${y}e`,
          isExit: false,
          isVisited: false,
          isStart: false,
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
    const startPosition: ICellIndexes = startPositions[randomIndex()]

    //!УСТАНОВКА ВЫХОДА В ПРОТИВОПОЛОЖНОЙ СТОРОНЕ ОТ СТАРТА
    const exitPosition: ICellIndexes = { x: 0, y: 0 }
    if (startPosition.y === 0) {
      exitPosition.y = this.size - 1
    } else exitPosition.y = 0
    if (startPosition.x === 0) {
      exitPosition.x = this.size - 1
    } else exitPosition.x = 0

    let generatorPosition: NearCellIndexes = { ...startPosition, direction: 'null' }
    this.currentCellIndexes = startPosition
    this.startPosition = startPosition

    arr[exitPosition.y][exitPosition.x].isExit = true
    arr[startPosition.y][startPosition.y].isStart = true

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

    const startPos = arr[generatorPosition.y][generatorPosition.x]
    const visitedCells: Array<string> = [startPos.id]
    const stack: Array<NearCellIndexes> = [generatorPosition]

    //!ПРОХОД ГЕНЕРАТОРА ПО ЛАБИРИНТУ
    while (visitedCells.length < this.numberOfCells) {
      const prevCell = arr[generatorPosition.y][generatorPosition.x]
      const nears = diff(visitedCells, getNear(generatorPosition))
      if (nears.length !== 0) {
        generatorPosition = nears[getRandom(0, nears.length - 1)]
        const nextCell = arr[generatorPosition.y][generatorPosition.x]
        const direction = generatorPosition.direction
        removeWall(prevCell, nextCell, direction)
        stack.push(generatorPosition)
        visitedCells.push(nextCell.id)
      } else {
        stack.pop()
        generatorPosition = stack[stack.length - 1]
      }
    }

    this.cellsArray = arr
  }
  date: IDate = {
    start: 0,
    end: 0,
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
  setStartDate(date: number): void {
    this.date.start = date
  }
  setEndDate(date: number): void {
    this.date.end = date
  }
  setIsCellVisited(): void {
    this.cellsArray[this.currentCellIndexes.y][this.currentCellIndexes.x].isVisited = true
  }

  get userPosition(): ICellIndexes {
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
