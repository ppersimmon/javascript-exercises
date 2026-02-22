export interface ExhibitType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
  commentCount: number;
}
