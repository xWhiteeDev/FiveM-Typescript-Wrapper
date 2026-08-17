import type { RGB } from '../Utils/RGBA';

export class HUD {
  static beginTextCommandBusyspinnerOn(string: string): void {
    BeginTextCommandBusyspinnerOn(string);
  }

  static beginTextCommandClearPrint(text: string): void {
    BeginTextCommandClearPrint(text);
  }

  static beginTextCommandDisplayHelp(inputType: string): void {
    BeginTextCommandDisplayHelp(inputType);
  }

  static beginTextCommandDisplayText(text: string): void {
    BeginTextCommandDisplayText(text);
  }

  static beginTextCommandGetWidth(text: string): void {
    BeginTextCommandGetWidth(text);
  }

  static beginTextCommandIsMessageDisplayed(text: string): void {
    BeginTextCommandIsMessageDisplayed(text);
  }

  static beginTextCommandIsThisHelpMessageBeingDisplayed(labelName: string): void {
    BeginTextCommandIsThisHelpMessageBeingDisplayed(labelName);
  }

  static beginTextCommandLineCount(entry: string): void {
    BeginTextCommandLineCount(entry);
  }

  static beginTextCommandObjective(p0: string): void {
    BeginTextCommandObjective(p0);
  }

  static beginTextCommandOverrideButtonText(gxtEntry: string): void {
    BeginTextCommandOverrideButtonText(gxtEntry);
  }

  static beginTextCommandPrint(GxtEntry: string): void {
    BeginTextCommandPrint(GxtEntry);
  }

  static beginTextCommandSetBlipName(textLabel: string): void {
    BeginTextCommandSetBlipName(textLabel);
  }

  static beginTextCommandThefeedPost(text: string): void {
    BeginTextCommandThefeedPost(text);
  }

  static busyspinnerIsDisplaying(): boolean {
    return BusyspinnerIsDisplaying();
  }

  static busyspinnerIsOn(): boolean {
    return BusyspinnerIsOn();
  }

  static busyspinnerOff(): void {
    BusyspinnerOff();
  }

  static endTextCommandBusyspinnerOn(busySpinnerType: number): void {
    EndTextCommandBusyspinnerOn(busySpinnerType);
  }

  static endTextCommandClearPrint(): void {
    EndTextCommandClearPrint();
  }

  static endTextCommandDisplayHelp(shape: number, loop: boolean, beep: boolean, duration: number): void {
    EndTextCommandDisplayHelp(shape, loop, beep, duration);
  }

  static endTextCommandDisplayText(x: number, y: number): void {
    EndTextCommandDisplayText(x, y);
  }

  static endTextCommandGetWidth(p0: boolean): number {
    return EndTextCommandGetWidth(p0);
  }

  static endTextCommandIsMessageDisplayed(): boolean {
    return EndTextCommandIsMessageDisplayed();
  }

  static endTextCommandIsThisHelpMessageBeingDisplayed(hudIndex: number): boolean {
    return EndTextCommandIsThisHelpMessageBeingDisplayed(hudIndex);
  }

  static endTextCommandLineCount(x: number, y: number): number {
    return EndTextCommandLineCount(x, y);
  }

  static endTextCommandObjective(p0: boolean): void {
    EndTextCommandObjective(p0);
  }

  static endTextCommandOverrideButtonText(buttonIndex: number): void {
    EndTextCommandOverrideButtonText(buttonIndex);
  }

  static endTextCommandPrint(duration: number, drawImmediately: boolean): void {
    EndTextCommandPrint(duration, drawImmediately);
  }

  static endTextCommandSetBlipName(blip: number): void {
    EndTextCommandSetBlipName(blip);
  }

  static endTextCommandThefeedPostAward(
    textureDict: string,
    textureName: string,
    rpBonus: number,
    colorOverlay: number,
    titleLabel: string,
  ): number {
    return EndTextCommandThefeedPostAward(textureDict, textureName, rpBonus, colorOverlay, titleLabel);
  }

  static endTextCommandThefeedPostCrewRankup(
    chTitle: string,
    clanTxd: string,
    clanTxn: string,
    isImportant: boolean,
    showSubtitle: boolean,
  ): number {
    return EndTextCommandThefeedPostCrewRankup(chTitle, clanTxd, clanTxn, isImportant, showSubtitle);
  }

  static endTextCommandThefeedPostCrewtag(
    crewTypeIsPrivate: boolean,
    crewTagContainsRockstar: boolean,
    rank: number,
    hasFounderStatus: boolean,
    isImportant: boolean,
    clanHandle: number,
    color: RGB,
  ): [number, any] {
    return EndTextCommandThefeedPostCrewtag(
      crewTypeIsPrivate,
      crewTagContainsRockstar,
      rank,
      hasFounderStatus,
      isImportant,
      clanHandle,
      color.r,
      color.g,
      color.b,
    );
  }

  static endTextCommandThefeedPostCrewtagWithGameName(
    crewTypeIsPrivate: boolean,
    crewTagContainsRockstar: boolean,
    rank: number,
    isLeader: boolean,
    isImportant: boolean,
    clanHandle: number,
    gamerStr: string,
    color: RGB,
  ): [number, any] {
    return EndTextCommandThefeedPostCrewtagWithGameName(
      crewTypeIsPrivate,
      crewTagContainsRockstar,
      rank,
      isLeader,
      isImportant,
      clanHandle,
      gamerStr,
      color.r,
      color.g,
      color.b,
    );
  }

  static endTextCommandThefeedPostMessagetext(
    textureDict: string,
    textureName: string,
    flash: boolean,
    iconType: number,
    sender: string,
    subject: string,
  ): number {
    return EndTextCommandThefeedPostMessagetext(textureDict, textureName, flash, iconType, sender, subject);
  }

  static endTextCommandThefeedPostMessagetextGxtEntry(
    txdName: string,
    textureName: string,
    flash: boolean,
    iconType: number,
    sender: string,
    subject: string,
  ): number {
    return EndTextCommandThefeedPostMessagetextGxtEntry(txdName, textureName, flash, iconType, sender, subject);
  }

  static endTextCommandThefeedPostMessagetextTu(
    picTxd: string,
    picTxn: string,
    flash: boolean,
    iconType: number,
    nameStr: string,
    subtitleStr: string,
    durationMultiplier: number,
  ): number {
    return EndTextCommandThefeedPostMessagetextTu(picTxd, picTxn, flash, iconType, nameStr, subtitleStr, durationMultiplier);
  }

  static endTextCommandThefeedPostMessagetextWithCrewTag(
    picTxd: string,
    picTxn: string,
    flash: boolean,
    iconType: number,
    nameStr: string,
    subtitleStr: string,
    duration: number,
    crewPackedStr: string,
  ): number {
    return EndTextCommandThefeedPostMessagetextWithCrewTag(
      picTxd,
      picTxn,
      flash,
      iconType,
      nameStr,
      subtitleStr,
      duration,
      crewPackedStr,
    );
  }

  static endTextCommandThefeedPostMessagetextWithCrewTagAndAdditionalIcon(
    picTxd: string,
    picTxn: string,
    flash: boolean,
    iconType1: number,
    nameStr: string,
    subtitleStr: string,
    duration: number,
    crewPackedStr: string,
    iconType2: number,
    textColor: number,
  ): number {
    return EndTextCommandThefeedPostMessagetextWithCrewTagAndAdditionalIcon(
      picTxd,
      picTxn,
      flash,
      iconType1,
      nameStr,
      subtitleStr,
      duration,
      crewPackedStr,
      iconType2,
      textColor,
    );
  }

  static endTextCommandThefeedPostMpticker(isImportant: boolean, showInBrief: boolean): number {
    return EndTextCommandThefeedPostMpticker(isImportant, showInBrief);
  }

  static endTextCommandThefeedPostReplayIcon(eType: number, iIcon: number, sTitle: string): number {
    return EndTextCommandThefeedPostReplayIcon(eType, iIcon, sTitle);
  }

  static endTextCommandThefeedPostReplayInput(type: number, button: string, text: string): number {
    return EndTextCommandThefeedPostReplayInput(type, button, text);
  }

  static endTextCommandThefeedPostStats(
    statTitle: string,
    iconEnum: number,
    stepVal: boolean,
    barValue: number,
    isImportant: boolean,
    picTxd: string,
    picTxn: string,
  ): number {
    return EndTextCommandThefeedPostStats(statTitle, iconEnum, stepVal, barValue, isImportant, picTxd, picTxn);
  }

  static endTextCommandThefeedPostTicker(isImportant: boolean, showInBrief: boolean): number {
    return EndTextCommandThefeedPostTicker(isImportant, showInBrief);
  }

  static endTextCommandThefeedPostTickerForced(isImportant: boolean, showInBrief: boolean): number {
    return EndTextCommandThefeedPostTickerForced(isImportant, showInBrief);
  }

  static endTextCommandThefeedPostTickerWithTokens(isImportant: boolean, showInBrief: boolean): number {
    return EndTextCommandThefeedPostTickerWithTokens(isImportant, showInBrief);
  }

  static endTextCommandThefeedPostUnlock(chTitle: string, iconType: number, chSubtitle: string): any {
    return EndTextCommandThefeedPostUnlock(chTitle, iconType, chSubtitle);
  }

  static endTextCommandThefeedPostUnlockTu(chTitle: string, iconType: number, chSubtitle: string, isImportant: boolean): any {
    return EndTextCommandThefeedPostUnlockTu(chTitle, iconType, chSubtitle, isImportant);
  }

  static endTextCommandThefeedPostUnlockTuWithColor(
    chTitle: string,
    iconType: number,
    chSubtitle: string,
    isImportant: boolean,
    titleColor: number,
    p5: boolean,
  ): any {
    return EndTextCommandThefeedPostUnlockTuWithColor(chTitle, iconType, chSubtitle, isImportant, titleColor, p5);
  }

  static endTextCommandThefeedPostVersusTu(
    ch1TXD: string,
    ch1TXN: string,
    val1: number,
    ch2TXD: string,
    ch2TXN: string,
    val2: number,
  ): number {
    return EndTextCommandThefeedPostVersusTu(ch1TXD, ch1TXN, val1, ch2TXD, ch2TXN, val2);
  }

  static pauseMenuDisableBusyspinner(toggle: boolean): void {
    PauseMenuDisableBusyspinner(toggle);
  }

  static pauseMenuSetBusySpinner(bVisible: boolean, iColumnID: number, iSpinnerIndex: number): void {
    PauseMenuSetBusySpinner(bVisible, iColumnID, iSpinnerIndex);
  }

  static preloadBusyspinner(): void {
    PreloadBusyspinner();
  }
}
