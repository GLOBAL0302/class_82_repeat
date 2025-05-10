export interface IArtists {
  _id: string;
  title: string;
  image: string;
  description: string;
  isPublished: boolean;
}

export interface IArtistsMutation {
  title: string;
  image: File | null;
  description: string;
}

export interface IAlbums {
  _id: string;
  title: string;
  artist: IArtists;
  created_at: number;
  image: string;
  isPublished: boolean;
}

export interface IAlbumMutation {
  title: string;
  artist: string;
  created_at: string;
  image: File | null;
}

export interface ITracks {
  _id: string;
  track_number: string;
  title: string;
  album: IAlbums;
  duration: string;
  isPublished: boolean;
}

export interface ITracksMutation {
  title: string;
  album: string;
  duration: string;
}

export interface ITracksHistory {
  _id: string;
  track: ITracks;
  dateTime: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface IRegisterMutation {
  username: string;
  password: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
