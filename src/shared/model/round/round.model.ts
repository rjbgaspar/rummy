import { IPlayer } from '@/shared/model/player/player.model'

export interface IRound {
  name: string;
  index: number;
  players: IPlayer[];
}

export class Round implements IRound {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public name: string,
    public index: number,
    public players: IPlayer[]
  ) {}
}
