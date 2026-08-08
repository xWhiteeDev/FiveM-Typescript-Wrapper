import { CFX } from '../CFX/Cfx';
import { Player } from '../Player/Player';

onNet('serverCreatePlayer', () => {
  const src = source;
  const plr = new Player(String(src));
  if (plr) {
    console.log('Player created');
  }
});

CFX.addEventListener('playerReady', (player: Player, args) => {
  console.log('Player is ready to spawn');
  player.spawn('mp_m_freemode_01', { x: 0, y: 0, z: 72 });
});

CFX.addEventListener('playerSpawned', (player: Player, args) => {
  console.log('Player spawned!');
  player.giveWeapon(0x83bf0278, 500, { bForceInHand: true, isHidden: false });
  setTimeout(()=>{
    player.setCoords({x:152.51406860352,y: -1032.8862304688, z:29.339282989502})
  }, 5000)
});

CFX.addEventListener('playerChangeCoords', (player: Player, newCoords) => {
  console.log('Player changed his coords');
  player.changeModel('mp_f_freemode_01')
});
