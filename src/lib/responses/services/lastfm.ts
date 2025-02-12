const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || 'your-api-key';
const LASTFM_BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

export interface LastFMAlbumInfo {
  name: string;
  artist: string;
  playcount: number;
  listeners: number;
  tracks: {
    name: string;
    duration: string;
    listeners: number;
  }[];
  tags: string[];
}

export class LastFMClient {
  private async fetch(method: string, params: Record<string, string>): Promise<any> {
    const searchParams = new URLSearchParams({
      method,
      api_key: LASTFM_API_KEY,
      format: 'json',
      ...params
    });

    const response = await fetch(`${LASTFM_BASE_URL}?${searchParams}`);
    return response.json();
  }

  async getAlbumInfo(artist: string, album: string): Promise<LastFMAlbumInfo | null> {
    try {
      const data = await this.fetch('album.getInfo', {
        artist,
        album
      });

      if (data.error) {
        return null;
      }

      return {
        name: data.album.name,
        artist: data.album.artist,
        playcount: parseInt(data.album.playcount),
        listeners: parseInt(data.album.listeners),
        tracks: data.album.tracks.track.map((t: any) => ({
          name: t.name,
          duration: t.duration,
          listeners: parseInt(t.listeners)
        })),
        tags: data.album.tags.tag.map((t: any) => t.name)
      };
    } catch (error) {
      console.error('Error fetching LastFM album info:', error);
      return null;
    }
  }
}

export const lastfm = new LastFMClient(); 