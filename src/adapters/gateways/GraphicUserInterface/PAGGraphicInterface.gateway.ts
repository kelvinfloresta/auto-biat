import { exec } from 'child_process'
import { promisify } from 'util'
const execPromise = promisify(exec)

export class PAGGraphicInterface {
  private async exec(command: string): Promise<string | null> {
    const { stdout, stderr } = await execPromise(
      `python src/adapters/gateways/GraphicUserInterface/main.py "pyautogui.${command}"`,
    )
    if (stderr) {
      throw new Error(stderr)
    }

    if (stdout === 'null') {
      return null
    }

    return stdout
  }

  async locateCenterOnScreen(
    imagePath: string,
    options: { confidence: number },
  ) {
    const result = await this.exec(
      `locateCenterOnScreen('src/adapters/gateways/GraphicUserInterface/${imagePath}', confidence=${options.confidence})`,
    )
    if (result === null) {
      return []
    }

    return this.getCoordinate(result)
  }

  private getCoordinate(result: string): number[] {
    return result.split(',').map(el => {
      const coordinate = el.replace(/\D/g, '')
      return parseInt(coordinate)
    })
  }

  async click(x: number, y: number) {
    await this.exec(`click(x=${x}, y=${y})`)
  }
}
