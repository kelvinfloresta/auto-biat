import { PAGGraphicInterface } from '../../adapters/gateways/GraphicUserInterface/PAGGraphicInterface.gateway'
import { randomDelay } from '../../utils/async.util'
import { ProcessHandler } from '../../utils/process-handler.util'

import { IWaypoint, IExplorerCTOR } from './IExplorer'

export class Explorer extends ProcessHandler {
  private static readonly options = { confidence: 0.3 }
  private static readonly minDelay = 300
  private static readonly maxDelay = 500

  private waypoints: readonly IWaypoint[]
  private gui: PAGGraphicInterface

  constructor(params: IExplorerCTOR) {
    super('Explorer')
    this.gui = params.gui
    this.waypoints = params.waypoints
    this.process.bind(this)
  }

  private async dispatch(waypoint: IWaypoint): Promise<void> {
    const result = await this.gui.locateCenterOnScreen(
      waypoint.imagePath,
      Explorer.options,
    )
    if (result.length === 0) {
      console.log('Waypoint not found:', waypoint)
      return this.dispatch(waypoint)
    }

    const [x, y] = result
    await randomDelay(Explorer.minDelay, Explorer.maxDelay)
    console.log('click', x, y)
    await this.gui.click(x, y)
  }

  protected async process() {
    for (const waypoint of this.waypoints) {
      await this.dispatch(waypoint)
    }
    console.log('End of waypoints, starting again...')
  }

  public async stop() {
    await super.stop()
  }

  public async start() {
    await super.start()
  }
}
