import { useState, useEffect } from 'react';
import { updateBirth } from '@/apis/myPageService';
import { useUserInfoStore } from '@/stores/userInfoStore';
import Modal from '@/components/Modal';
import { Button } from '@/components/Button';
import { birthCss,birthBtn, modalOverlayStyle, modalContentStyle, modalHeaderStyle, inputStyle, modalActionsStyle } from './Birth.styles';
import Warning from '@/assets/icons/Warning.png'; // 경고 아이콘 import
const BirthInput = () => {
  const [isBirthModalOpen, setIsBirthModalOpen] = useState(false);
  const [birthInput, setBirthInput] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // 미래 날짜 경고 모달 상태
  const [message, setMessage] = useState<string[]>([]); // 미래 날짜 경고 모달 메시지
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 저장 확인 모달 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 저장 확인 모달 메시지
  const { setUserInfo, birth } = useUserInfoStore();

  useEffect(() => {
    // 유저 정보의 생일을 초기 값으로 설정
    if (birth) {
      setBirthInput(birth);
    }
  }, [birth]);

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setMessage([]);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setConfirmMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/-/g, ''); // '-' 제거
    value = value.replace(/\D/g, ''); // 숫자만 남기기

    // 최대 길이 제한
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    // 연도 입력
    let formattedValue = value;
    if (value.length >= 4) {
      formattedValue = `${value.slice(0, 4)}`;
    }

    // 월 입력 및 검증
    if (value.length >= 5) {
      let month = value.slice(4, 6);
      if (parseInt(month, 10) > 12) {
        month = '12';
      }
      formattedValue = `${value.slice(0, 4)}-${month}`;
    }

    // 일 입력 및 검증
    if (value.length >= 7) {
      let day = value.slice(6, 8);
      if (parseInt(day, 10) > 31) {
        day = '31';
      }
      formattedValue = `${value.slice(0, 4)}-${value.slice(4, 6)}-${day}`;
    }

    // 미래 날짜 검증
    if (formattedValue.length === 10) {
      const inputDate = new Date(formattedValue);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // 시간 초기화

      if (inputDate > currentDate) {
        setMessage(['미래의 생년월일은', '입력할 수 없습니다.']);
        setIsMessageModalOpen(true);
        return;
      }
    }

    setBirthInput(formattedValue);
  };

  const handleSaveBirth = async () => {
    try {
      await updateBirth(birthInput);
      setUserInfo({ birth: birthInput });
      setIsBirthModalOpen(false);
    } catch (error) {
      console.error("생일 업데이트 실패:", error);
    }
  };

  const handleConfirmSave = () => {
    setConfirmMessage('최초 1회 입력 시 수정이 불가합니다.');
    setIsConfirmModalOpen(true);
  };

  const confirmAndSave = () => {
    closeConfirmModal();
    handleSaveBirth();
  };

  return (
    <div>
      {/* 유저의 생일이 없으면 생일 입력 버튼을 표시, 있으면 생일을 표시 */}
      {birth ? (
        <div css={birthCss}>{birth}</div>
      ) : (
        <button  
          onClick={() => setIsBirthModalOpen(true)}>
            생일 입력
        </button>
        
      )}

      {/* 생일 입력 모달 */}
      <Modal isOpen={isBirthModalOpen} onClose={() => setIsBirthModalOpen(false)} title="생일 입력">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <span>생일 입력</span>
            </div>
            <div css={inputStyle}>
              <input
                type="text"
                value={birthInput}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD 형식으로 입력"
                maxLength={10}
              />
            </div>
            <div css={modalActionsStyle}>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={handleConfirmSave}>
                저장
              </Button>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={() => setIsBirthModalOpen(false)}>
                취소
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 미래 날짜 경고 모달 */}
      <Modal isOpen={isMessageModalOpen} onClose={closeMessageModal} title="알림">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <img src={Warning} alt="경고 아이콘" width="30" height="30" />
            {message.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <div css={modalActionsStyle}>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={closeMessageModal}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 저장 확인 모달 */}
      <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} title="확인">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <img src={Warning} alt="경고 아이콘" width="30" height="30" />
            <p>{confirmMessage}</p>
            <div css={modalActionsStyle}>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={confirmAndSave}>
                확인
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BirthInput;
