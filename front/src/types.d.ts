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
  track_number: string;
  title: string;
  album: IAlbums;
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
