import { PAGGraphicInterface } from '../../adapters/gateways/GraphicUserInterface/PAGGraphicInterface.gateway'

export interface IWaypoint {
  readonly imagePath: string;
}

export interface IExplorerCTOR {
  readonly waypoints: readonly IWaypoint[];
  readonly gui: PAGGraphicInterface;
}
