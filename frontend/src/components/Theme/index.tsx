import { useState, useEffect } from 'react';
import { createTheme, updateTheme } from '@/apis/themeService';
import { PreviewPostIt } from '../PreviewPostit';
import useThemeStore from '@/stores/themeStore';
import { SketchPicker } from 'react-color';
import {
  containerStyle,
  formStyle,
  inputGroupStyle,
  checkboxGroupStyle,
  buttonStyle,
  messageStyle,
  previewContainerStyle,
  themeListStyle,
  themeItemStyle,
  paginationStyle,
} from './Theme.styles';

export const Theme = () => {
  const [themeName, setThemeName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#000000');
  const [image, setImage] = useState('');
  const [base, setBase] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);

  const { themes, fetchThemesFromAPI, addTheme, updateThemeInStore, deleteTheme } = useThemeStore();

  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAllThemes = async () => {
      try {
        await fetchThemesFromAPI(); 
      } catch (error) {
        console.error("테마 조회 중 오류:", error);
      }
    };
    fetchAllThemes();
  }, [fetchThemesFromAPI]);

  const handleCreateOrUpdateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editingThemeId !== null) {
        const response = await updateTheme(editingThemeId, themeName, backgroundColor, fontColor, borderColor, image, base);
        setMessage(`테마 수정 성공: ${response.message}`);
        updateThemeInStore({ themeId: editingThemeId, themeName, backgroundColor, fontColor, borderColor, image, base, deleteFlag: false });
      } else {
        const response = await createTheme(themeName, backgroundColor, fontColor, borderColor, image, base);
        setMessage(`테마 생성 성공: ${response.message}`);
        const newTheme = {
          themeId: Date.now(),
          themeName,
          backgroundColor,
          fontColor,
          borderColor,
          image,
          base,
          deleteFlag: false,
        };
        addTheme(newTheme);
      }
      resetForm();
    } catch (error) {
      setMessage('테마 생성/수정 실패. 다시 시도해 주세요.');
    }
  };

  const resetForm = () => {
    setThemeName('');
    setBackgroundColor('#ffffff');
    setFontColor('#000000');
    setBorderColor('#000000');
    setImage('');
    setBase(false);
    setEditMode(false);
    setEditingThemeId(null);
  };

  const handleEditTheme = (theme: any) => {
    setThemeName(theme.themeName);
    setBackgroundColor(theme.backgroundColor);
    setFontColor(theme.fontColor);
    setBorderColor(theme.borderColor);
    setImage(theme.image);
    setBase(theme.base);
    setEditMode(true);
    setEditingThemeId(theme.themeId);
  };

  const handleDeleteTheme = async (themeId?: number) => {
    if (themeId !== undefined) {
      try {
        await deleteTheme(themeId); 
        setMessage(`테마 삭제 성공`);
        await fetchThemesFromAPI(); 
      } catch (error) {
        setMessage('테마 삭제 실패. 다시 시도해 주세요.');
      }
    } else {
      console.error("삭제할 테마의 ID가 없습니다.");
    }
  };
  
  

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [currentColorPickerField, setCurrentColorPickerField] = useState<string | null>(null);

  const openColorPicker = (field: string) => {
    setCurrentColorPickerField(field);
    setIsColorPickerOpen(true);
  };

  const handleColorChange = (color: any) => {
    if (currentColorPickerField === 'backgroundColor') {
      setBackgroundColor(color.hex);
    } else if (currentColorPickerField === 'fontColor') {
      setFontColor(color.hex);
    } else if (currentColorPickerField === 'borderColor') {
      setBorderColor(color.hex);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentThemes = themes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(themes.length / itemsPerPage)));
  };

  return (
    <div css={containerStyle}>
      <form onSubmit={handleCreateOrUpdateTheme} css={formStyle}>
        <div css={inputGroupStyle}>
          <label>테마 이름:</label>
          <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} required />
        </div>

        <div css={inputGroupStyle}>
          <label>배경 색상:</label>
          <input type="text" value={backgroundColor} onClick={() => openColorPicker('backgroundColor')} readOnly />
        </div>

        <div css={inputGroupStyle}>
          <label>폰트 색상:</label>
          <input type="text" value={fontColor} onClick={() => openColorPicker('fontColor')} readOnly />
        </div>

        <div css={inputGroupStyle}>
          <label>테두리 색상:</label>
          <input type="text" value={borderColor} onClick={() => openColorPicker('borderColor')} readOnly />
        </div>

        <div css={inputGroupStyle}>
          <label>이미지 URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div css={checkboxGroupStyle}>
          <label>기본 테마로 설정:</label>
          <input type="checkbox" checked={base} onChange={(e) => setBase(e.target.checked)} />
        </div>

        <button type="submit" css={buttonStyle}>
          {editMode ? '테마 수정' : '테마 생성'}
        </button>
        {message && <p css={messageStyle}>{message}</p>}
      </form>

      <div css={previewContainerStyle}>
        <h3>미리보기</h3>
        <PreviewPostIt
          themeName={themeName || '미리보기'}
          background={image || backgroundColor || '#fff'}
          fontColor={fontColor || '#000'}
          borderColor={borderColor || '#000'}
          flag={true}
        />
        {isColorPickerOpen && (
          <div style={{ marginTop: '10px' }}>
            <SketchPicker
              color={
                currentColorPickerField === 'backgroundColor'
                  ? backgroundColor
                  : currentColorPickerField === 'fontColor'
                  ? fontColor
                  : borderColor
              }
              onChange={handleColorChange}
            />
            <button onClick={() => setIsColorPickerOpen(false)} css={buttonStyle} style={{ marginTop: '10px' }}>
              완료
            </button>
          </div>
        )}
      </div>

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
            <button onClick={() => handleEditTheme(theme)}>수정</button>
            <button onClick={() => handleDeleteTheme(theme.themeId)}>삭제</button>
          </li>
        ))}
        <div css={paginationStyle}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
          <span>{currentPage} / {Math.ceil(themes.length / itemsPerPage)}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(themes.length / itemsPerPage)}>다음</button>
        </div>
      </ul>
    </div>
  );
};
