/** @jsxImportSource @emotion/react */
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
} from './styles';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import { Hamberger } from '../Hamberger';
import { IChallenges } from '@/types/questTypes';

export const Quest = () => {
  const navigate = useNavigate();
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');
  const [challenges, setChallenges] = useState<IChallenges[]>([]);
  const [progress, setProgress] = useState<number>(71.2);

  useEffect(() => {
    // Mock data for challenges
    const mockChallenges: IChallenges[] = [
      {
        id: 1,
        title: '친구 도감 10명 이상 등록하기',
        reward: '보상: 포스트잇 배경(하늘색)',
        status: '진행중',
      },
      {
        id: 2,
        title: '친구 도감 15명 이상 등록하기',
        reward: '보상: 포스트잇 배경(하늘색)',
        status: '완료하기',
      },
      {
        id: 3,
        title: '포스트잇 3회 작성',
        reward: '보상: 포스트잇 배경(하늘색)',
        status: '완료됨',
      },
    ];
    setChallenges(mockChallenges);
  }, []);

  const close = () => {
    navigate(-1);
  };

  const openMenu = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
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
        {/* 타블 메뉴 */}
        <div css={tabContainer(activeTab)}>
          <button onClick={() => setActiveTab('inProgress')} className={activeTab === 'inProgress' ? 'active' : ''}>진행중</button>
          <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>완료됨</button>
        </div>

        {/* 도전과제 목록 */}
        <div css={challengeListContainer}>
          {challenges
            .filter((challenge) => {
              if (activeTab === 'inProgress') {
                return challenge.status === '진행중' || challenge.status === '완료하기';
              }
              return challenge.status === '완료됨';
            })
            .map((challenge) => (
              <div key={challenge.id} css={challengeItem}>
                <div css={challengeTitle}>{challenge.title}</div>
                <div css={challengeReward}>{challenge.reward}</div>
                <div css={challengeStatus}>
                  {challenge.status === '완료하기' && (
                    <button type="button" className="nes-btn is-success">완료하기</button>
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

      {/* 진행도 바 */}
      <div css={progressContainer}>
        <progress className="nes-progress is-success" value={progress} max="100"></progress>
        <div>{progress}%</div>
      </div>
    </div>
  );
};