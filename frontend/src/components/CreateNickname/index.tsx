import { useState, useCallback } from "react";
import styles from "./CreateNickname.style";
import Pawly from "@/assets/images/Pawly.png";
import { SignupNicknameProps } from "@/types/UserType";

export const CreateNickname: React.FC<SignupNicknameProps> = () => {
  const [nickname, setNickname] = useState("");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(event.target.value);
    },
    []
  );

  return (
    <div css={styles.container}>
      <img src={Pawly} css={styles.logoImg} alt="Pawly Logo" />
      <div css={styles.title}>닉네임을 입력해 주세요</div>
      <input
        type="text"
        css={styles.nicknameInput}
        value={nickname}
        onChange={handleInputChange}
        placeholder="닉네임을 입력하세요"
      />
    </div>
  );
};
