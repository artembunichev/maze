import { wordFormater } from './wordFormater'

export const datePeriodFormater = (startDate: number, endDate: number): string => {
  const period = new Date(endDate - startDate)
  const minutes = period.getMinutes()
  const seconds = period.getSeconds()

  let periodDate = ''
  if (minutes !== 0) {
    periodDate += wordFormater('minute', minutes) + ' '
  }
  periodDate += wordFormater('second', seconds)
  return periodDate
}
