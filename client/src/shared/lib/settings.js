export const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

//console.log(userLocale); //"en-US"

// ["en-US", "en", "de"]
//console.log(navigator.languages);

export const showTodayDate = () => {
  const date = new Date()
  console.log(date)
  /* const day = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear() */
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat(userLocale, options).format(date)
}
