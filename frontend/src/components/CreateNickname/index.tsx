import { useState, useCallback, useEffect } from "react";
import { SignupNicknameProps } from "@/types/UserType";
import { isNicknameDup } from "@/apis/userService";
import styles from "./CreateNickname.style";

export const CreateNickname: React.FC<SignupNicknameProps> = ({
  nickname,
  setNickname,
  onValidationChange,
}) => {
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;

  const validateNickname = (value: string) => {
    if (value.length === 0) {
      setValidationError(null);
      return true;
    }

    if (value.length < 2 || value.length > 8) {
      setValidationError("2~8글자 닉네임을 입력해주세요.");
      return false;
    }

    if (!nicknameRegex.test(value)) {
      setValidationError("한글, 영어, 숫자만 입력 가능합니다.");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const checkNickname = async () => {
    if (nickname.trim().length === 0) {
      setIsDuplicate(null);
      return;
    }

    if (!validateNickname(nickname)) {
      return;
    }

    setIsChecking(true);
    try {
      const isDup = await isNicknameDup(nickname);
      setIsDuplicate(isDup);

      // 유효성 검사 결과를 부모 컴포넌트로 전달
      onValidationChange?.(!isDup && !validationError && nickname.length >= 2);
    } catch (error) {
      console.error("닉네임 중복 체크 실패:", error);
      onValidationChange?.(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const debounceCheck = setTimeout(checkNickname, 500);
    return () => clearTimeout(debounceCheck);
  }, [nickname]);

  // 닉네임이나 유효성 상태가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onValidationChange?.(
      !isDuplicate && !validationError && nickname.length >= 2 && !isChecking
    );
  }, [isDuplicate, validationError, nickname, isChecking, onValidationChange]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.length <= 8) {
        setNickname(value);
        validateNickname(value);
      }
    },
    [setNickname]
  );

  const getValidationMessage = () => {
    if (!nickname) return "\u00A0";

    if (validationError) {
      return validationError;
    }

    if (isChecking) return "";
    if (isDuplicate) return "이미 존재하는 닉네임입니다.";
    if (isDuplicate === false) return "사용 가능한 닉네임입니다.";
    return "\u00A0";
  };

  const isValid = !validationError && isDuplicate === false;

  return (
    <div css={styles.container}>
      <div css={styles.title}>닉네임을 입력해 주세요</div>
      <div css={styles.inputWrapper}>
        <input
          css={styles.nicknameInput}
          type="text"
          value={nickname}
          onChange={handleInputChange}
          maxLength={8}
        />
        <div css={styles.messageContainer}>
          <styles.Message isValid={isValid}>
            {getValidationMessage()}
          </styles.Message>
        </div>
      </div>
    </div>
  );
};
