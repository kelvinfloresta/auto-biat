import readline from 'readline'

import Jimp from 'jimp'
import robot from 'robotjs'

import { IPoint } from './adapters/gateways/GraphicUserInterface/IGraphicInterface.gateway'

function getMousePosition(): Promise<IPoint> {
  const term = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => {
    term.question(
      '\nPut mouse on your character and Press ENTER to continue...',
      () => {
        const position = robot.getMousePos()
        console.log('Getted position:', position)
        term.close()
        resolve(position)
      },
    )
  })
}

async function screenCaptureToFile(point: IPoint, path: string) {
  const pic = robot.screen.capture(point.x, point.y, 250, 250)
  const image = new Jimp(pic.width, pic.height)
  let pos = 0
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    image.bitmap.data[idx + 2] = pic.image.readUInt8(pos++)
    image.bitmap.data[idx + 1] = pic.image.readUInt8(pos++)
    image.bitmap.data[idx + 0] = pic.image.readUInt8(pos++)
    image.bitmap.data[idx + 3] = pic.image.readUInt8(pos++)
  })

  const fileName = path + '.' + image.getExtension()
  await image.writeAsync(fileName)
  console.log('Image saved:', fileName)
}

async function start() {
  const position = await getMousePosition()
  const stdin = process.openStdin()

  let index = 0
  console.log('\nPress ENTER to capture...')
  stdin.on('data', async () => {
    console.clear()
    console.log('')
    await screenCaptureToFile(position, 'waypoint-' + index++)
    console.log('\nPress Ctrl+C to exit')
  })
}

start()
