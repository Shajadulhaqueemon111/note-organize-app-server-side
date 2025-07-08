export interface INote {
  title: string;
  content: string;
  category: string;
  isArchived: boolean;
  isDeleted: boolean;
  userId?: string;
}
