import { PlayerBufferElement } from '../types/Player';
import { IVector3 } from '../types/Vector3';

const players: PlayerBufferElement[] = [];

export class Player {
  private static instances = new Map<string, Player>();

  constructor(private source: string) {
    console.log(`[Player] Player assigned to: ${this.source}`);
    const payload: PlayerBufferElement = {
      source: this.source,
      name: GetPlayerName(this.source),
    };
    players.push(payload);
    Player.instances.set(this.source, this);
  }

  spawn(model: string, coords: IVector3) {
    if (!model || !coords) {
      console.error('[spawn]: Model or coords not provided');
      return;
    }
    emitNet('wrapper:executeSpawn', this.source, JSON.stringify({ model, coords }));
  }
  changeModel(newModel: string) {
    if (!newModel) {
      console.error('[changeModel]: Model not provided');
      return;
    }
    if (typeof newModel !== 'string') {
      console.error('[changeModel]: Model can be only string');
      return;
    }
    emitNet('wrapper:changeModel', this.source, JSON.stringify({ newModel }));
  }
  setCoords(coords: IVector3) {
    if (!coords) {
      console.error('[setCoords]: coords not provided');
      return;
    }
    if (typeof coords !== 'object') {
      console.error('[setCoords]: Type of coords can be only an object');
      return;
    }
    if (!('x' in coords || 'y' in coords || 'z' in coords)) {
      console.error('[setCoords]: Some of coords parameters mismatch');
      return;
    }
    emitNet('wrapper:setCoords', this.source, JSON.stringify({ coords }));
  }
  static get(source: string): Player | undefined {
    return Player.instances.get(source);
  }
}
