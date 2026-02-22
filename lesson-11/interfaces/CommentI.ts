export interface CommentI {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}
