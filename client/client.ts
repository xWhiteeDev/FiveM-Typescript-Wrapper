import { Chat } from './Chat/chat';
import { Player } from './Player/Player';

on('onClientResourceStart', async (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return;
  Chat.init();
  emitNet('serverCreatePlayer');
  emitNet('playerReady');
  new Player(PlayerId(), PlayerPedId());
});
