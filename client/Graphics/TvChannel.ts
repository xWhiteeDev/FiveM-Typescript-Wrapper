export class TvChannel {
  static clearTvChannelPlaylist(tvChannel: number): void {
    ClearTvChannelPlaylist(tvChannel);
  }

  static get tvChannel(): number {
    return GetTvChannel();
  }

  static setTvChannel(channel: number): void {
    SetTvChannel(channel);
  }

  static setTvChannelPlaylist(tvChannel: number, playlistName: string, restart: boolean): void {
    SetTvChannelPlaylist(tvChannel, playlistName, restart);
  }

  static setTvChannelPlaylistAtHour(tvChannel: number, playlistName: string, hour: number): void {
    SetTvChannelPlaylistAtHour(tvChannel, playlistName, hour);
  }
}