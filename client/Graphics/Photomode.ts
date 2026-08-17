export class PhotoMode {
  static beginTakeHighQualityPhoto(): boolean {
    return BeginTakeHighQualityPhoto();
  }

  static beginTakeMissionCreatorPhoto(): boolean {
    return BeginTakeMissionCreatorPhoto();
  }

  static drawLowQualityPhotoToPhone(p0: boolean, p1: boolean): void {
    DrawLowQualityPhotoToPhone(p0, p1);
  }

  static freeMemoryForHighQualityPhoto(): void {
    FreeMemoryForHighQualityPhoto();
  }

  static freeMemoryForLowQualityPhoto(): void {
    FreeMemoryForLowQualityPhoto();
  }

  static freeMemoryForMissionCreatorPhoto(): void {
    FreeMemoryForMissionCreatorPhoto();
  }

  static get currentNumberOfCloudPhotos(): number {
    return GetCurrentNumberOfCloudPhotos();
  }

  static get maximumNumberOfCloudPhotos(): number {
    return GetMaximumNumberOfCloudPhotos();
  }

  static get maximumNumberOfPhotos(): number {
    return GetMaximumNumberOfPhotos();
  }

  static getStatusOfLoadMissionCreatorPhoto(p0: string): number {
    return GetStatusOfLoadMissionCreatorPhoto(p0);
  }

  static get statusOfSaveHighQualityPhoto(): number {
    return GetStatusOfSaveHighQualityPhoto();
  }

  static get statusOfTakeHighQualityPhoto(): number {
    return GetStatusOfTakeHighQualityPhoto();
  }

  static get statusOfTakeMissionCreatorPhoto(): number {
    return GetStatusOfTakeMissionCreatorPhoto();
  }

  static loadMissionCreatorPhoto(p0: string, p3: boolean): [boolean, any, any] {
    return LoadMissionCreatorPhoto(p0, p3);
  }

  static queueOperationToCreateSortedListOfPhotos(scanForSaving: boolean): boolean {
    return QueueOperationToCreateSortedListOfPhotos(scanForSaving);
  }

  static saveHighQualityPhoto(unused: number): boolean {
    return SaveHighQualityPhoto(unused);
  }
}
