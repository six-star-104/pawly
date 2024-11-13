import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  BackBtnContainer,
  BackBtnCss,
  HamBtnContainer,
  HamBtnCss,
  slidePanelStyle,
  panelContentStyle,
  tabContainer,
  challengeWrapper,
  challengeListContainer,
  challengeItem,
  challengeTitle,
  challengeReward,
  challengeStatus,
  progressContainer,
  deleteModalOverlayStyle,
  deleteModalContentStyle,
  warningIconStyle,
  modalBodyStyle,
  rewardTitleStyle,
  congratsContainerStyle,
} from './styles';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import cheer from '../../assets/icons/cheer.png';
import { Hamberger } from '../Hamberger';
import Modal from '@/components/Modal';
import { Button } from '@/components/Button';
import useEasterEggStore from '@/stores/easterEggStore';
import { EasterEggData } from '@/types/questTypes';
import { getEasterEggs } from '@/apis/easterEggService';

export const EasterEgg = () => {
  const navigate = useNavigate();
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');
  const [progress, setProgress] = useState<number>(0);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<EasterEggData | null>(null);

  const { easterEggs, isInitialized, setEasterEggs, markEasterEggComplete } = useEasterEggStore();

  // `easterEggs`와 `challenges` 간의 동기화
  const challenges = easterEggs; // 스토어의 상태를 직접 사용하여 동기화

  useEffect(() => {
    const fetchEasterEggs = async () => {
      try {
        const response = await getEasterEggs(); // 실제 조회 API 호출 함수
        if (response?.status === 'success') {
          setEasterEggs(response?.data); // 스토어에 원본 데이터를 저장
          // console.log("조회된 과제들:", response.data); // 콘솔에 과제 데이터 출력
        }
      } catch (error) {
        // console.error("도전과제 데이터 조회 실패:", error);
      }
    };
  
    if (!isInitialized) {
      fetchEasterEggs();
    }
  }, [isInitialized, setEasterEggs]);
  
  useEffect(() => {
    // 진행률 계산
    const completedChallenges = challenges.filter((challenge) => challenge.status === '완료됨').length;
    const progressPercentage = (completedChallenges / challenges.length) * 100;
    setProgress(progressPercentage);
  
    // 콘솔에 현재 challenges 상태 출력
    // console.log("현재 저장된 과제들 (challenges):", challenges);
  }, [challenges]);
  
  const close = () => {
    navigate(-1);
  };

  const openMenu = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  const openCompleteModal = (challenge: EasterEggData) => {
    setSelectedChallenge(challenge);
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    setIsCompleteModalOpen(false);
    setSelectedChallenge(null);
  };

  const handleCompleteChallenge = async () => {
    if (!selectedChallenge) return;

    try {
      // 도전과제 완료 API 호출 및 상태 업데이트
      await markEasterEggComplete(selectedChallenge.easterEggId);
      closeCompleteModal();
      // console.log(`도전과제 ${selectedChallenge.easterEggId} 완료 처리되었습니다.`);
    } catch (error) {
      // console.error("도전과제 완료 중 오류 발생:", error);
    }
  };

  return (
    <div css={Container}>
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={close}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={openMenu}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>

      <div css={challengeWrapper}>
        <div css={tabContainer(activeTab)}>
          <button onClick={() => setActiveTab('inProgress')} className={activeTab === 'inProgress' ? 'active' : ''}>진행중</button>
          <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>완료됨</button>
        </div>

        <div css={challengeListContainer}>
          {challenges
            .filter((challenge) => {
              if (activeTab === 'inProgress') {
                return challenge.status === '진행중' || challenge.status === '완료하기';
              }
              return challenge.status === '완료됨';
            })
            .map((challenge) => (
              <div key={challenge.easterEggId} css={challengeItem}>
                <div css={challengeTitle}>{challenge.content}</div>
                <div css={challengeReward}>{challenge.reward || '???'}</div>
                <div css={challengeStatus}>
                  {challenge.status === '완료하기' && (
                    <button type="button" className="nes-btn is-success" onClick={() => openCompleteModal(challenge)}>완료하기</button>
                  )}
                  {challenge.status === '진행중' && (
                    <button type="button" className="nes-btn is-primary">진행중</button>
                  )}
                  {challenge.status === '완료됨' && (
                    <button type="button" className="nes-btn">완료됨</button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedChallenge && (
        <Modal isOpen={isCompleteModalOpen} onClose={closeCompleteModal} title="보상 수령">
          <div css={[deleteModalOverlayStyle, modalBodyStyle]}>
            <div css={deleteModalContentStyle}>
              <h2 css={rewardTitleStyle}>보상 수령</h2>
              <div css={congratsContainerStyle}>
                <img src={cheer} alt="축하 아이콘" css={warningIconStyle} />
                <h4>축하합니다! <br /> '{selectedChallenge.reward}'을 획득했습니다!</h4>
              </div>
              <Button
                backgroundColor='#ffffff'
                color='#000'
                variant="contained"
                fullwidth={false}
                rounded={0}
                handler={handleCompleteChallenge}
                fontSize='1rem'
                width='40%'
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <div css={progressContainer}>
        <progress className="nes-progress is-success" value={progress} max="100"></progress>
        <div>{progress.toFixed(1)}%</div>
      </div>
    </div>
  );
};
