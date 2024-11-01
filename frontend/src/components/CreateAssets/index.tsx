import { useState } from "react";
import styles from "./CreateAssets.style";
import { SignupAssetsProps } from "@/types/UserType";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const CreateAssets: React.FC<SignupAssetsProps> = ({
  assets,
  setAssets,
  assetsName,
  setAssetsName,
}) => {
  console.log(assets);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assetsDescription, setAssetsDescription] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const translateToEnglish = async (text: string) => {
    try {
      const response = await fetch("/api/papago/n2mt", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `source=ko&target=en&text=${encodeURIComponent(text)}`,
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.message?.result?.translatedText) {
        throw new Error("Invalid translation response format");
      }

      return data.message.result.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  };

  const generateAndSaveImage = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const translatedText = await translateToEnglish(assetsDescription);

      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: `please create simple animation-styled pixel art image of a ${translatedText} without any fruits on this image and with no background`,
        n: 1,
        size: "1024x1024",
        quality: "hd",
      });

      if (!response.data[0].url) {
        throw new Error("이미지 생성에 실패했습니다.");
      }

      const imageUrl = response.data[0].url;
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const fileName = `character-${uuidv4()}.png`;
      const imageFile = new File([imageBlob], fileName, { type: "image/png" });

      setAssets(fileName);

      const imageUrl_local = URL.createObjectURL(imageFile);
      localStorage.setItem(fileName, imageUrl_local);
      setGeneratedImage(imageUrl_local);
      setShowNameInput(true);

      return fileName;
    } catch (error) {
      console.error("Image generation error:", error);
      setError("이미지 생성 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssetsDescription(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetsName(event.target.value);
  };

  const handleGenerateClick = async () => {
    if (!assetsDescription.trim()) {
      setError("캐릭터 설명을 입력해주세요.");
      return;
    }

    try {
      await generateAndSaveImage();
    } catch (error) {
      console.error("Character generation failed:", error);
    }
  };

  const handleRegenerateClick = () => {
    setGeneratedImage(null);
    setShowNameInput(false);
    setAssetsDescription("");
    setAssetsName("");
    setAssets("");
    setError(null);
  };

  return (
    <div css={styles.container}>
      <div css={styles.title}>나만의 동물 캐릭터를 만들어보세요!</div>
      <div css={styles.content}>예) 귀여운 고양이, 화난 원숭이</div>
      <div css={styles.inputContainer}>
        <input
          type="text"
          css={styles.assetsInput}
          value={assetsDescription}
          onChange={handleDescriptionChange}
          placeholder="캐릭터를 설명해주세요"
          disabled={showNameInput}
        />
        {!showNameInput && (
          <button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            css={styles.generateButton}
          >
            {isGenerating ? "생성 중..." : "캐릭터 생성하기"}
          </button>
        )}
      </div>
      {error && <div css={styles.error}>{error}</div>}

      {generatedImage && (
        <div css={styles.resultContainer}>
          <img
            src={generatedImage}
            alt="Generated character"
            css={styles.characterImage}
          />
          {showNameInput && (
            <div css={styles.nameInputContainer}>
              <input
                type="text"
                value={assetsName}
                onChange={handleNameChange}
                placeholder="캐릭터의 이름을 입력해주세요"
                css={styles.nameInput}
              />
              <button
                onClick={handleRegenerateClick}
                css={styles.regenerateButton}
              >
                다시 생성하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
