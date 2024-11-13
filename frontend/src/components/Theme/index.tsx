import { useState, useEffect } from 'react';
import { createTheme, updateTheme, getThemes } from '@/apis/themeService';
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
} from './Theme.styles';

export const Theme = () => {
  const [themeName, setThemeName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#000000');
  const [image, setImage] = useState('');
  const [base, setBase] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // State for edit mode and selected theme for editing
  const [editMode, setEditMode] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);

  // Add fetchThemesFromAPI function from the store
  const { themes, fetchThemesFromAPI, addTheme, updateThemeInStore } = useThemeStore();

  // Fetch all themes on component mount
  useEffect(() => {
    const fetchAllThemes = async () => {
      try {
        await fetchThemesFromAPI(); // API에서 모든 테마 조회 후 상태 업데이트
      } catch (error) {
        console.error("테마 조회 중 오류:", error);
      }
    };
    fetchAllThemes();
  }, []);

  // Handle create or update theme
  const handleCreateOrUpdateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editingThemeId !== null) {
        // Update theme
        const response = await updateTheme(editingThemeId, themeName, backgroundColor, fontColor, borderColor, image, base);
        setMessage(`테마 수정 성공: ${response.message}`);
        updateThemeInStore({ themeId: editingThemeId, themeName, backgroundColor, fontColor, borderColor, image, base, deleteFlag: false });
      } else {
        // Create theme
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

  // Reset form fields and exit edit mode
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

  // Enter edit mode and populate form with selected theme data
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

  // Color picker states and handlers
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

      {isColorPickerOpen && (
        <div style={{ position: 'absolute', top: '60%', left: '10%', zIndex: 1000 }}>
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

      <div css={previewContainerStyle}>
        <h3>미리보기</h3>
        <PreviewPostIt
          themeName={themeName || '미리보기'}
          background={image || backgroundColor || '#fff'}
          fontColor={fontColor || '#000'}
          borderColor={borderColor || '#000'}
          flag={true}
        />
      </div>

      <ul css={themeListStyle}>
        {themes.map((theme, index) => (
          <li key={index} css={themeItemStyle}>
            <PreviewPostIt
              themeName={theme.themeName}
              background={theme.image || theme.backgroundColor || '#fff'}
              fontColor={theme.fontColor || '#000'}
              borderColor={theme.borderColor || '#ea23ea'}
              flag={true}
            />
            <p><strong>테마 이름:</strong> {theme.themeName}</p>
            <button onClick={() => handleEditTheme(theme)}>수정</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
