import type { Ped } from '../Entities/Ped';
import { IVector3 } from '../typings/Vector';
import type { RGB, RGBA } from '../Utils/RGBA';

export class DebugDraw {
  static clearDrawOrigin(): void {
    ClearDrawOrigin();
  }

  static drawBox(coords1: IVector3, coords2: IVector3, color: RGBA): void {
    DrawBox(coords1.x, coords1.y, coords1.z, coords2.x, coords2.y, coords2.z, color.r, color.g, color.b, color.a);
  }

  static drawDebugBox(coords1: IVector3, coords2: IVector3, color: RGBA): void {
    DrawDebugBox(coords1.x, coords1.y, coords1.z, coords2.x, coords2.y, coords2.z, color.r, color.g, color.b, color.a);
  }

  static drawDebugCross(coords: IVector3, size: number, color: RGBA): void {
    DrawDebugCross(coords.x, coords.y, coords.z, size, color.r, color.g, color.b, color.a);
  }

  static drawDebugLine(coords1: IVector3, coords2: IVector3, color: RGBA): void {
    DrawDebugLine(coords1.x, coords1.y, coords1.z, coords2.x, coords2.y, coords2.z, color.r, color.g, color.b, color.a);
  }

  static drawDebugLineWithTwoColours(coords1: IVector3, coords2: IVector3, color1: RGBA, color2: RGBA): void {
    DrawDebugLineWithTwoColours(
      coords1.x,
      coords1.y,
      coords1.z,
      coords2.x,
      coords2.y,
      coords2.z,
      color1.r,
      color1.g,
      color1.b,
      color2.r,
      color2.g,
      color2.b,
      color1.a,
      color2.a,
    );
  }

  static drawDebugSphere(coords: IVector3, radius: number, color: RGBA): void {
    DrawDebugSphere(coords.x, coords.y, coords.z, radius, color.r, color.g, color.b, color.a);
  }

  static drawDebugText(text: string, coords: IVector3, color: RGBA): void {
    DrawDebugText(text, coords.x, coords.y, coords.z, color.r, color.g, color.b, color.a);
  }

  static drawDebugText_2d(text: string, coords: IVector3, color: RGBA): void {
    DrawDebugText_2d(text, coords.x, coords.y, coords.z, color.r, color.g, color.b, color.a);
  }

  static drawInteractiveSprite(
    textureDict: string,
    textureName: string,
    screenX: number,
    screenY: number,
    width: number,
    height: number,
    heading: number,
    color: RGBA,
  ): void {
    DrawInteractiveSprite(textureDict, textureName, screenX, screenY, width, height, heading, color.r, color.g, color.b, color.a);
  }

  static drawLine(coords1: IVector3, coords2: IVector3, color: RGBA): void {
    DrawLine(coords1.x, coords1.y, coords1.z, coords2.x, coords2.y, coords2.z, color.r, color.g, color.b, color.a);
  }

  static drawMarker(
    type: number,
    coords: IVector3,
    dir: IVector3,
    rot: IVector3,
    scale: IVector3,
    color: RGBA,
    bobUpAndDown: boolean,
    faceCamera: boolean,
    rotationOrder: number,
    rotate: boolean,
    textureDict: string,
    textureName: string,
    drawOnEnts: boolean,
  ): void {
    DrawMarker(
      type,
      coords.x,
      coords.y,
      coords.z,
      dir.x,
      dir.y,
      dir.z,
      rot.x,
      rot.y,
      rot.z,
      scale.x,
      scale.y,
      scale.z,
      color.r,
      color.g,
      color.b,
      color.a,
      bobUpAndDown,
      faceCamera,
      rotationOrder,
      rotate,
      textureDict,
      textureName,
      drawOnEnts,
    );
  }

  static drawMarker_2(
    type: number,
    coords: IVector3,
    dir: IVector3,
    rot: IVector3,
    scale: IVector3,
    color: RGBA,
    bobUpAndDown: boolean,
    faceCamera: boolean,
    rotationOrder: number,
    rotate: boolean,
    textureDict: string,
    textureName: string,
    drawOnEnts: boolean,
    p24: boolean,
  ): void {
    DrawMarker_2(
      type,
      coords.x,
      coords.y,
      coords.z,
      dir.x,
      dir.y,
      dir.z,
      rot.x,
      rot.y,
      rot.z,
      scale.x,
      scale.y,
      scale.z,
      color.r,
      color.g,
      color.b,
      color.a,
      bobUpAndDown,
      faceCamera,
      rotationOrder,
      rotate,
      textureDict,
      textureName,
      drawOnEnts,
      p24,
    );
  }

  static drawPoly(coords1: IVector3, coords2: IVector3, coords3: IVector3, color: RGBA): void {
    DrawPoly(
      coords1.x,
      coords1.y,
      coords1.z,
      coords2.x,
      coords2.y,
      coords2.z,
      coords3.x,
      coords3.y,
      coords3.z,
      color.r,
      color.g,
      color.b,
      color.a,
    );
  }

  static drawRect(x: number, y: number, width: number, height: number, color: RGBA): void {
    DrawRect(x, y, width, height, color.r, color.g, color.b, color.a);
  }

  static drawShowroom(p0: string, ped: Ped, p2: number, pos: IVector3): boolean {
    return DrawShowroom(p0, ped.handle, p2, pos.x, pos.y, pos.z);
  }

  static drawSphere(coords: IVector3, radius: number, color: RGB, opacity: number): void {
    DrawSphere(coords.x, coords.y, coords.z, radius, color.r, color.g, color.b, opacity);
  }

  static drawSprite(
    textureDict: string,
    textureName: string,
    screenX: number,
    screenY: number,
    width: number,
    height: number,
    heading: number,
    color: RGBA,
  ): void {
    DrawSprite(textureDict, textureName, screenX, screenY, width, height, heading, color.r, color.g, color.b, color.a);
  }

  static drawSpritePoly_2(
    coords1: IVector3,
    coords2: IVector3,
    coords3: IVector3,
    color1: RGBA,
    color2: RGBA,
    color3: RGBA,
    textureDict: string,
    textureName: string,
    u1: number,
    v1: number,
    w1: number,
    u2: number,
    v2: number,
    w2: number,
    u3: number,
    v3: number,
    w3: number,
  ): void {
    DrawSpritePoly_2(
      coords1.x,
      coords1.y,
      coords1.z,
      coords2.x,
      coords2.y,
      coords2.z,
      coords3.x,
      coords3.y,
      coords3.z,
      color1.r,
      color1.g,
      color1.b,
      color1.a,
      color2.r,
      color2.g,
      color2.b,
      color2.a,
      color3.r,
      color3.g,
      color3.b,
      color3.a,
      textureDict,
      textureName,
      u1,
      v1,
      w1,
      u2,
      v2,
      w2,
      u3,
      v3,
      w3,
    );
  }

  static drawSpriteUv(
    textureDict: string,
    textureName: string,
    x: number,
    y: number,
    width: number,
    height: number,
    u1: number,
    v1: number,
    u2: number,
    v2: number,
    heading: number,
    color: RGBA,
  ): void {
    DrawSpriteUv(textureDict, textureName, x, y, width, height, u1, v1, u2, v2, heading, color.r, color.g, color.b, color.a);
  }

  static drawTexturedPoly(
    coords1: IVector3,
    coords2: IVector3,
    coords3: IVector3,
    color: RGBA,
    textureDict: string,
    textureName: string,
    u1: number,
    v1: number,
    w1: number,
    u2: number,
    v2: number,
    w2: number,
    u3: number,
    v3: number,
    w3: number,
  ): void {
    DrawTexturedPoly(
      coords1.x,
      coords1.y,
      coords1.z,
      coords2.x,
      coords2.y,
      coords2.z,
      coords3.x,
      coords3.y,
      coords3.z,
      color.r,
      color.g,
      color.b,
      color.a,
      textureDict,
      textureName,
      u1,
      v1,
      w1,
      u2,
      v2,
      w2,
      u3,
      v3,
      w3,
    );
  }

  static drawTvChannel(xPos: number, yPos: number, xScale: number, yScale: number, rotation: number, color: RGBA): void {
    DrawTvChannel(xPos, yPos, xScale, yScale, rotation, color.r, color.g, color.b, color.a);
  }

  static getTextureResolution(textureDict: string, textureName: string): IVector3 {
    const [x, y, z] = GetTextureResolution(textureDict, textureName);
    return { x, y, z };
  }

  static hasStreamedTextureDictLoaded(textureDict: string): boolean {
    return HasStreamedTextureDictLoaded(textureDict);
  }

  static overridePedBadgeTexture(ped: Ped, txd: string, txn: string): boolean {
    return OverridePedBadgeTexture(ped.handle, txd, txn);
  }

  static requestStreamedTextureDict(textureDict: string, p1: boolean): void {
    RequestStreamedTextureDict(textureDict, p1);
  }

  static setDebugLinesAndSpheresDrawingActive(enabled: boolean): void {
    SetDebugLinesAndSpheresDrawingActive(enabled);
  }

  static setDrawOrigin(x: number, y: number, z: number, p3: any): void {
    SetDrawOrigin(x, y, z, p3);
  }

  static setScriptGfxDrawBehindPausemenu(flag: boolean): void {
    SetScriptGfxDrawBehindPausemenu(flag);
  }

  static setScriptGfxDrawOrder(order: number): void {
    SetScriptGfxDrawOrder(order);
  }

  static setStreamedTextureDictAsNoLongerNeeded(textureDict: string): void {
    SetStreamedTextureDictAsNoLongerNeeded(textureDict);
  }
}
