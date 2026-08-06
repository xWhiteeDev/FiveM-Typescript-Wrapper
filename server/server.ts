// import {Player} from "./Player/Player";

import { Player } from './Player/Player';
import { Utils } from './Utils/Utils';

on('playerJoining', async (deferrals: { defer: any; done: any; handover: any; presentCard: any; update: any }) => {
  // deferrals.done();
});
let src;
onNet('playerReady', () => {
  const src = String(source);

  new Player(src);
  const player = Player.get(src);
  if (!player) {
    console.error(`[wrapper:clientReady] Brak instancji Player dla source: ${src}`);
    return;
  }
  player.spawn('mp_m_freemode_01', { x: 0, y: 0, z: 72 });
});
