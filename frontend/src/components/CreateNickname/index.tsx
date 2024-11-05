import { useState, useCallback, useEffect } from "react";
import { useSignUpStore } from "@/stores/signUpStore"; // useSignUpStore 가져오기
import { isNicknameDup } from "@/apis/userService";
import { SignupNicknameProps } from "@/types/UserType";
import styles from "./CreateNickname.style";

export const CreateNickname: React.FC<SignupNicknameProps> = ({
  onValidationChange,
}) => {
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // useSignUpStore에서 nickname과 setNickname 가져오기
  const { signUpState, setNickname } = useSignUpStore();
  const nickname = signUpState.nickname;

  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;

  const validateNickname = (value: string) => {
    if (value.length === 0) {
      setValidationError(null);
      onValidationChange?.(false);
      return true;
    }

    if (value.length < 2 || value.length > 8) {
      setValidationError("2~8글자 닉네임을 입력해주세요.");
      onValidationChange?.(false);
      return false;
    }

    if (!nicknameRegex.test(value)) {
      setValidationError("한글, 영어, 숫자만 입력 가능합니다.");
      onValidationChange?.(false);
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
      // 부모 컴포넌트로 유효성 전달
      onValidationChange?.(!isDup && !validationError && nickname.length >= 2);
    } catch (error) {
      console.error("닉네임 중복 체크 실패:", error);
      onValidationChange?.(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const debounceCheck = setTimeout(checkNickname, 300);
    return () => clearTimeout(debounceCheck);
  }, [nickname]);

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
