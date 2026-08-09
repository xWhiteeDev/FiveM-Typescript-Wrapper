export interface IVehicleOptions {
  engine: boolean;
  locked: boolean;
  color: number[];
  engineHealth: number;
  bodyHealth: number;
}

export enum eVehicleSeat {
  DRIVER = -1,
  RF_PASS = 0,
  LR_PASS = 1,
  RR_PASS = 2,
}
