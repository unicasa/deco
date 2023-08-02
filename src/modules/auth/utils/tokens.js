export const uniqueInputName = (name) => {
  const uniqueID = Math.random().toString(32).substring(2) + Date.now().toString(32)

  return `${name}_${uniqueID}`
}
