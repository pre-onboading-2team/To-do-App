export interface IToken {
  access_token: string;
}

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
