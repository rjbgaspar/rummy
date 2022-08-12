export interface IPlayer {
  name: string;
  luckyCount: number;
}

export class Player implements IPlayer {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public name: string,
    public luckyCount: number
  ) {}
}
