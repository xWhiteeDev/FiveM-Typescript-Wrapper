import { Utils } from '../Utlis/Utils';
import { JSONString } from '../typings/Unions';
import { IVector3 } from '../typings/Vector3';

export class Player {
  constructor(
    private playerId: number,
    private playerPedId: number,
  ) {
    console.log(`[WRAPPER] Attached playerId: ${playerId} | playerPedId: ${playerPedId} `);
    onNet('wrapper:executeSpawn', this.syncSpawn.bind(this));
    onNet('wrapper:changeModel', this.syncChangeModel.bind(this));
    onNet('wrapper:setCoords', this.syncCoordsChange.bind(this));
  }

  async spawn(hashModel: string, coords: IVector3): Promise<boolean> {
    const hashNumber: number = GetHashKey(hashModel);
    const maxAttempts: number = 200;
    if (!IsEntityPositionFrozen(this.playerPedId)) {
      FreezeEntityPosition(this.playerPedId, true);
    }
    const playerActive: boolean = await Utils.waitUntil(() => NetworkIsPlayerActive(this.playerId), {
      waitInterval: 150,
      maxAttempts: 50,
    });

    if (!playerActive) {
      console.error('Player did not become network active in time');
      return false;
    }

    if (!IsModelValid(hashNumber)) {
      console.error('Cannot load hash');
      return false;
    }
    const modelLoaded: boolean = await Utils.waitUntil(() => HasModelLoaded(hashNumber), {
      waitInterval: 30,
      maxAttempts,
      onTick: () => {
        RequestModel(hashNumber);
      },
    });

    if (!modelLoaded) {
      console.error('Cannot load ped model');
      SetModelAsNoLongerNeeded(hashNumber);
      return false;
    }
    SetPlayerModel(this.playerId, hashNumber);
    const newPlayerPedId = PlayerPedId();
    this.playerPedId = newPlayerPedId;
    NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, 0, 0, false);
    SetPedDefaultComponentVariation(this.playerPedId);
    ClearPedTasksImmediately(this.playerPedId);
    FreezeEntityPosition(this.playerPedId, true);

    SetEntityCoordsNoOffset(this.playerPedId, coords.x, coords.y, coords.z, true, true, true);
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);

    const hasCollisionLoaded: boolean = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(this.playerPedId), {
      waitInterval: 100,
      maxAttempts,
      onTick: () => {
        RequestCollisionAtCoord(coords.x, coords.y, coords.z);
      },
    });

    // if (!hasCollisionLoaded) {
    //   console.error('Cannot load collisions around Entity');
    //   FreezeEntityPosition(this.playerPedId, false);
    //   return false;
    // }
    FreezeEntityPosition(this.playerPedId, false);

    SetPedDefaultComponentVariation(this.playerPedId);
    SetModelAsNoLongerNeeded(hashNumber);
    ShutdownLoadingScreenNui();
    ShutdownLoadingScreen();
    return true;
  }
  async changeModel(newModel: string): Promise<boolean> {
    const maxAttempts: number = 100;
    const hashKey = GetHashKey(newModel);
    if (!IsModelValid(hashKey)) {
      console.error('Cannot load hash');
      return false;
    }
    const hasModelLoaded: boolean = await Utils.waitUntil(() => HasModelLoaded(hashKey), {
      waitInterval: 30,
      maxAttempts,
      onTick: () => RequestModel(hashKey),
    });

    if (!hasModelLoaded) {
      console.error('Cannot load ped model');
      SetModelAsNoLongerNeeded(hashKey);
      return false;
    }

    SetPlayerModel(this.playerId, hashKey);
    this.playerPedId = PlayerPedId();
    SetPedDefaultComponentVariation(this.playerPedId);
    SetModelAsNoLongerNeeded(hashKey);
    return true;
  }
  get currentPedId() {
    return this.playerPedId;
  }
  async setCoords(coords: IVector3): Promise<boolean> {
    const maxAttempts: number = 100;
    const wasEntityPositionFrozen: boolean = IsEntityPositionFrozen(this.playerPedId);

    SetEntityCoordsNoOffset(this.playerPedId, coords.x, coords.y, coords.z, true, true, true);
    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(this.playerPedId, true);
    }

    const isCollisionLoaded = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(this.playerPedId), {
      waitInterval: 50,
      maxAttempts,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });

    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(this.playerPedId, false);
    }
    return isCollisionLoaded;
  }
  get coords() {
    const [x, y, z] = GetEntityCoords(this.playerPedId, true);
    return { x, y, z };
  }
  private async syncSpawn(data: JSONString) {
    try {
      const { model, coords }: { model: string; coords: IVector3 } = JSON.parse(data);
      await this.spawn(model, coords);
    } catch (error) {
      console.error('[syncSpawn]:Parsing model or coordinates error');
      return;
    }
  }
  private async syncChangeModel(data: JSONString) {
    try {
      const { newModel }: { newModel: string } = JSON.parse(data);
      await this.changeModel(newModel);
    } catch (error) {
      console.error('[syncChangeModel]:Parsing model error');
      return;
    }
  }
  private async syncCoordsChange(data: JSONString) {
    try {
      const { coords }: { coords: IVector3 } = JSON.parse(data);
      await this.setCoords(coords);
    } catch (error) {
      console.error('[syncCoordsChange]:Parsing coordinates error');
      return;
    }
  }
}
