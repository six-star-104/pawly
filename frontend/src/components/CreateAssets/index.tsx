import { useState } from "react";
import styles from "./CreateAssets.style";
import { SignupAssetsProps } from "@/types/UserType";

export const CreateAssets: React.FC<SignupAssetsProps> = () => {
  const [assetsName, setAssetsName] = useState("");

  const handleAssetsNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssetsName(event.target.value);
  };

  return (
    <div css={styles.container}>
      <div css={styles.title}>Assets Name을 입력해 주세요</div>
      <input
        type="text"
        css={styles.assetsInput}
        value={assetsName}
        onChange={handleAssetsNameChange}
      />
    </div>
  );
};
