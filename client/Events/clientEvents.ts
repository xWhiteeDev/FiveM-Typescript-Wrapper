import { Player } from "../Entities/Player/Player";
on('onClientResourceStart', async (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return;
  Player.init(PlayerId(), PlayerPedId());
  emitNet('serverCreatePlayer');
  emitNet('playerReady');
});
