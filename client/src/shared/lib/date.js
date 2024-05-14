import { months } from 'shared/consts'

export const showDate = str => {
  if (!str) return 'Present'
  const date = new Date(str)
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${months[month]} ${year}`
}
