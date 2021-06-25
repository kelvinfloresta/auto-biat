export function delay (ms: number) {
  console.log('Waiting:', ms, 'ms')
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomDelay (min: number, max: number) {
  const generatedDelay = Math.floor(Math.random() * (max + 1 - min)) + min
  return delay(generatedDelay)
}
