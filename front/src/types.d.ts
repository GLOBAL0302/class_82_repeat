export interface IArtists {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export interface IAlbums {
  _id: string;
  title: string;
  arttist: string;
  created_at: string;
}

export interface ITracks {
  _id: string;
  title: string;
  album: string;
  duration: string;
}
