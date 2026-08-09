import { CFX } from '../CFX/cfx';
import { Player } from '../Entities/Player/Player';
import { Vehicle } from '../Entities/Vehicle/Vehicle';

async function playerSpawned() {
  setTimeout(async () => {
    const veh = await Vehicle.create('zentorno', Player.coords);
    if (veh) {
      Player.setIntoVehicle(veh.handle, -1);
    }
  }, 2000);
}
CFX.addEventListener('playerSpawned', playerSpawned);
