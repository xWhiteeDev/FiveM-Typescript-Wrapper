import { Chat } from './Chat/chat';
import { Player } from './Player/Player';


on('onClientResourceStart', async (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return; 
  Chat.init();
  emitNet('playerReady');
  let localPlayer = new Player(PlayerId(), PlayerPedId());
  setTimeout(async ()=> {
   await localPlayer.giveWeapon(0x22D8FE39,100)
  },3000 )
});
