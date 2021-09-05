import { IAppStore } from '../stores/AppStore'

export const setValueFromInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  func: (number: number) => void,
  store: IAppStore
): void => {
  const value = Number(e.target.value)
  if (!isNaN(value)) {
    func.bind(store)(value)
  }
}
