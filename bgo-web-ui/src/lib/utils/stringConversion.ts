export const convertDate = (date: string, locale: string = 'default') => {
  const formattedDate = new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
  })

  return formattedDate
}

export const convertDateShort = (date: string, locale: string = 'default') => {
  const formattedDate = new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return formattedDate
}

export const elapsedSinceDate = (date: string, locale: string = 'default') => {
  const currentDate = new Date()
  const givenDate = new Date(date)

  const diffTime = Math.abs(currentDate.getTime() - givenDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const diffYears = currentDate.getFullYear() - givenDate.getFullYear()
  const diffMonths =
    currentDate.getMonth() - givenDate.getMonth() + diffYears * 12

  const years = Math.floor(diffMonths / 12)
  const months = diffMonths % 12
  const days = diffDays - (years * 365 + months * 30)

  let formattedDate = ``
  if (years > 0) formattedDate += `${years} year${years > 1 ? 's' : ''} `
  if (months > 0) formattedDate += `${months} month${months > 1 ? 's' : ''} `
  formattedDate += `${days} day${days > 1 ? 's' : ''} ago`

  const formattedTime = givenDate.toLocaleString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  formattedDate += ` at ${formattedTime}`

  return formattedDate
}

export const formatPlayerName = (
  player: Player | { fName: string; mInit: string; lName: string },
  includeMiddle: boolean = true
) => {
  const { fName, mInit, lName } = player
  if (includeMiddle) {
    return `${fName} ${mInit ? `${mInit}.` : ''} ${lName}`
  }
  return `${fName} ${lName}`
}
