export interface IArtist {
  title: string;
  image: string | null;
  description: string | null;
  isPublished: boolean;
}

export interface IAlbum {
  title: string;
  artist: IArtist;
  created_at: string;
  image: string | null;
  isPublished: boolean;
}

export interface ITrack {
  title: string;
  album: IAlbum;
  duration: string;
  isPublished: boolean;
}

export interface ITracksHistory {
  dateTime: string;
  track: ITrack;
}

export interface IUserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}
