import { PreviewPostIt } from '../PreviewPostit';
import {
  themeListStyle,
  themeItemStyle,
  paginationContainerStyle,
  paginationButtonStyle,
} from './ThemeList.styles';
import { ThemeListProps } from '@/types/themeTypes';
import { useEffect } from 'react';

export const ThemeList: React.FC<ThemeListProps> = ({
  themes,
  itemsPerPage,
  currentPage,
  onEdit,
  onDelete,
  onPreviousPage,
  onNextPage,
}) => {
  const filteredThemes = themes.filter((theme) => theme.deleteFlag === false);
  const maxPage = Math.max(1, Math.ceil(filteredThemes.length / itemsPerPage)); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentThemes = filteredThemes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > maxPage) {
      onPreviousPage();
    }
  }, [currentPage, maxPage, onPreviousPage]);

  return (
    <div css={paginationContainerStyle}>
      <button onClick={onPreviousPage} disabled={currentPage === 1} css={paginationButtonStyle}>&lt;</button>
      <ul css={themeListStyle}>
        {currentThemes.map((theme, index) => (
          <li key={index} css={themeItemStyle}>
            <PreviewPostIt
              themeName={theme.themeName}
              background={theme.image || theme.backgroundColor || '#fff'}
              fontColor={theme.fontColor || '#000'}
              borderColor={theme.borderColor || '#000000'}
              flag={true}
            />
            <p><strong>테마 이름:</strong> {theme.themeName}</p>
            <button onClick={() => onEdit(theme)}>수정</button>
            <button onClick={() => onDelete(theme.themeId)}>삭제</button>
          </li>
        ))}
      </ul>
      <button onClick={onNextPage} disabled={currentPage >= maxPage} css={paginationButtonStyle}>&gt;</button>
    </div>
  );
};
