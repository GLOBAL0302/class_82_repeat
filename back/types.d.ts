export interface IArtist {
  title: string;
  image: string | null;
  description: string | null;
}

export interface IAlbum {
  title: string;
  artist: IArtist;
  created_at: string;
  image: string | null;
}

export interface ITrack {
  title: string;
  album: IAlbum;
  duration: string;
}

export interface IUserFields {
  username: string;
  password: string;
  // token:string
}
