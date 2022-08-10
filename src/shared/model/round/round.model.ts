export interface IRound {
  name: string;
  index: number;
  players: string[];
}

export class Round implements IRound {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public name: string,
    public index: number,
    public players: string[]
  ) {}
}
