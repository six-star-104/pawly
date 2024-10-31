import styles from "./style";
import Pawly from "@/assets/images/Pawly.png";
export const Signup = () => {
  return (
    <div>
      <div css={styles.container}>
        <img src={Pawly} css={styles.logoImg} alt="Pawly Logo" />

        <div css={styles.title}>닉네임을 입력해 주세요</div>
        <input type="text" css={styles.nicknameInput} />
        <button>중복 확인</button>
        <button>다음</button>
      </div>
    </div>
  );
};
