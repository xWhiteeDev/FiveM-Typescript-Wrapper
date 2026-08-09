import { CFX } from '../CFX/Cfx';
import { Player } from '../Entities/Player/Player';

function createServerPlayer() {
  const src = source;
  const plr = new Player(String(src));
  if (plr) {
    console.log('Player created');
  }
}
onNet('serverCreatePlayer', createServerPlayer);

function playerReady(player: Player) {
  console.log('Player is ready to spawn');
  player.spawn('mp_m_freemode_01', { x: 0, y: 0, z: 72 });
}

CFX.addCrossEventListener('playerReady', playerReady);


function playerModelChange(player: Player, oldModel: string, newModel: string) {
  console.log(`Server get request to change model from: ${oldModel} to: ${newModel}`);
  player.giveWeapon(0xd1d5f52b, 455, { bForceInHand: true, isHidden: false });
}
CFX.addEventListener('playerChangeModel', playerModelChange);

function playerChangeWeapon(player: Player, hashNumber: number, ammo: number) {
  console.log(`New weapon: ${hashNumber} with: ${ammo} ammo`);
}
CFX.addEventListener('playerChangeWeapon', playerChangeWeapon);
