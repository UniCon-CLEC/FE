export interface Survey {
  id: string;
  title: string;
  content: string;
  isMine: boolean;
  recommendUsers: string[];
  tags: string[];
  tagId: number;
}
