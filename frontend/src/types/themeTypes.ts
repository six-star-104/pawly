export interface ThemeType {
  themeId?: number;
  themeName: string;
  backgroundColor: string;
  fontColor: string;
  borderColor: string;
  image: string | null;
  base: boolean;
  deleteFlag?: boolean;
}

export interface ThemeListProps {
  themes: ThemeType[];
  itemsPerPage: number;
  currentPage: number;
  onEdit: (theme: ThemeType) => void;
  onDelete: (themeId?: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}