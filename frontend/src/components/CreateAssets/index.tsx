import { useState } from "react";
import styles from "./CreateAssets.style";
import { SignupAssetsProps } from "@/types/UserType";

export const CreateAssets: React.FC<SignupAssetsProps> = () => {
  const [assets, setAssetsName] = useState("");

  const handleAssetsNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssetsName(event.target.value);
  };

  return (
    <div css={styles.container}>
      <div css={styles.title}>나만의 동물 캐릭터를 만들어보세요!</div>
      <div css={styles.content}>예) 귀여운 고양이, 화난 원숭이</div>
      <input
        type="text"
        css={styles.assetsInput}
        value={assets}
        onChange={handleAssetsNameChange}
      />
      <button>캐릭터 생성하기</button>
    </div>
  );
};
