export interface ExhibitType {
  id: number;
  description: string;
  imageUrl: string;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
  commentCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}
