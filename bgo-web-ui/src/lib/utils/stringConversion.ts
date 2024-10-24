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
