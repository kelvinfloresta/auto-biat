import { PAGGraphicInterface } from './adapters/gateways/GraphicUserInterface/PAGGraphicInterface.gateway'
import { Explorer } from './usecases/explorer/Explorer'

const waypoints = [{ imagePath: 'waypoint-0.png' }]
const gui = new PAGGraphicInterface()
const explorer = new Explorer({ gui, waypoints })

explorer.start()
