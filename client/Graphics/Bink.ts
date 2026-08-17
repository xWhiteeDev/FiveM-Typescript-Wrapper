import type { RGBA } from '../Utils/RGBA';

export class BinkMovie {
  constructor(private _handle: number) {}

  drawBinkMovie(posX: number, posY: number, scaleX: number, scaleY: number, rotation: number, color: RGBA): void {
    DrawBinkMovie(this._handle, posX, posY, scaleX, scaleY, rotation, color.r, color.g, color.b, color.a);
  }

  static enableMovieKeyframeWait(toggle: boolean): void {
    EnableMovieKeyframeWait(toggle);
  }

  static enableMovieSubtitles(toggle: boolean): void {
    EnableMovieSubtitles(toggle);
  }

  get binkMovieTime(): number {
    return GetBinkMovieTime(this._handle);
  }

  static loadMovieMeshSet(movieMeshSetName: string): number {
    return LoadMovieMeshSet(movieMeshSetName);
  }

  playBinkMovie(): void {
    PlayBinkMovie(this._handle);
  }

  static queryMovieMeshSetState(p0: number): number {
    return QueryMovieMeshSetState(p0);
  }

  releaseBinkMovie(): void {
    ReleaseBinkMovie(this._handle);
  }

  static releaseMovieMeshSet(movieMeshSet: number): void {
    ReleaseMovieMeshSet(movieMeshSet);
  }

  static create(name: string): BinkMovie {
    const handle = SetBinkMovie(name);
    return new this(handle);
  }

  setBinkMovieTime(progress: number): void {
    SetBinkMovieTime(this._handle, progress);
  }

  setBinkMovieUnk_2(p1: boolean): void {
    SetBinkMovieUnk_2(this._handle, p1);
  }

  setBinkMovieVolume(value: number): void {
    SetBinkMovieVolume(this._handle, value);
  }

  setBinkShouldSkip(shouldSkip: boolean): void {
    SetBinkShouldSkip(this._handle, shouldSkip);
  }

  stopBinkMovie(): void {
    StopBinkMovie(this._handle);
  }
}
