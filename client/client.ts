import { Chat } from './Chat/chat';
import { Player } from './Player/Player';


on('onClientResourceStart', async (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return; // ważne — onClientResourceStart odpala się dla KAŻDEGO resource'a, nie tylko Twojego
  Chat.init();
  emitNet('playerReady');
});
