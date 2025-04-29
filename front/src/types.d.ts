export interface IArtists {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export interface IAlbums {
  _id: string;
  title: string;
  artist: IArtists;
  created_at: string;
  image: string;
}

export interface ITracks {
  _id: string;
  title: string;
  album: IAlbums;
  duration: string;
}
