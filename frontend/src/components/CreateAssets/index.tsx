import { useState } from "react";
import * as style from "./CreateAssets.style";
import { useSignUpStore } from "@/stores/signUpStore";
import { makeAsset } from "@/apis/userService";

export const CreateAssets: React.FC<{
  onImageGenerated?: (isGenerated: boolean) => void;
}> = ({ onImageGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assetsDescription, setAssetsDescription] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isRegeneration, setIsRegeneration] = useState(false);

  const { setAsset } = useSignUpStore();

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssetsDescription(event.target.value);
    setError(null); // 입력 시 에러 메시지 초기화
  };

  const convertBase64ToFile = async (base64Data: string, fileName: string) => {
    const base64WithoutHeader =
      base64Data.split(";base64,").pop() || base64Data;

    const byteCharacters = atob(base64WithoutHeader);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    return new File([blob], fileName, { type: "image/png" });
  };

  const generateAsset = async () => {
    if (assetsDescription.trim().length < 5) {
      setError("캐릭터 설명을 5자 이상 입력해주세요.");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const response = await makeAsset(assetsDescription);

      if (response.image_data) {
        const imageUrl = `data:image/png;base64,${response.image_data}`;
        setGeneratedImage(imageUrl);

        const imageFile = await convertBase64ToFile(
          response.image_data,
          response.image_name || "generated-asset.png"
        );

        setAsset(imageFile);
        setShowButtons(true);
        setIsRegeneration(false);
        onImageGenerated?.(true); // 이미지 생성 성공 알림
      } else {
        throw new Error("이미지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      setError("이미지를 생성하는 중 오류가 발생했습니다.");
      onImageGenerated?.(false); // 이미지 생성 실패 알림
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateClick = () => {
    setIsRegeneration(true);
    setShowButtons(false);
    setGeneratedImage(null);
    setError(null);
    onImageGenerated?.(false); // 다시 생성하기 클릭 시 false로 설정
  };

  return (
    <style.Container>
      <style.title>나만의 동물 캐릭터를 만들어보세요!</style.title>
      <style.content>예) 귀여운 고양이, 화난 원숭이</style.content>
      <style.inputContainer>
        <style.assetsInput
          type="text"
          value={assetsDescription}
          onChange={handleDescriptionChange}
          placeholder="캐릭터를 설명해주세요"
          disabled={!!(isGenerating || (generatedImage && !isRegeneration))}
        />
        {(!showButtons || isRegeneration) && (
          <style.generateButton
            onClick={generateAsset}
            disabled={!assetsDescription.trim() || isGenerating}
          >
            {isGenerating ? "생성 중..." : "생성하기"}
          </style.generateButton>
        )}
      </style.inputContainer>
      <style.errorContainer>
        {error && <style.error>{error}</style.error>}
      </style.errorContainer>

      <style.resultContainer>
        <style.imageContainer>
          {generatedImage && !isRegeneration && (
            <style.characterImage
              src={generatedImage}
              alt="Generated character"
            />
          )}
        </style.imageContainer>
        {showButtons && !isRegeneration && (
          <style.buttonContainer>
            <style.regenerateButton onClick={handleRegenerateClick}>
              다시 생성하기
            </style.regenerateButton>
          </style.buttonContainer>
        )}
      </style.resultContainer>
    </style.Container>
  );
};
