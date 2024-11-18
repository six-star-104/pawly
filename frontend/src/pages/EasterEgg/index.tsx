import { useState, useEffect } from "react";
import {
  Container,
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
} from "./styles";
import cheer from "../../assets/icons/cheer.png";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import useEasterEggStore from "@/stores/easterEggStore";
import { EasterEggData } from "@/types/questTypes";
import { getEasterEggs } from "@/apis/easterEggService";

export const EasterEgg = () => {
  const [activeTab, setActiveTab] = useState<"inProgress" | "completed">(
    "inProgress"
  );
  const [progress, setProgress] = useState<number>(0);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] =
    useState<EasterEggData | null>(null);

  const { easterEggs, isInitialized, setEasterEggs, markEasterEggComplete } =
    useEasterEggStore();

  const challenges = easterEggs;

  useEffect(() => {
    const fetchEasterEggs = async () => {
      try {
        const response = await getEasterEggs();
        if (response?.status === "success") {
          setEasterEggs(response?.data);
        }
      } catch (error) {}
    };

    if (!isInitialized) {
      fetchEasterEggs();
    }
  }, [isInitialized, setEasterEggs]);

  useEffect(() => {
    const completedChallenges = challenges.filter(
      (challenge) => challenge.status === "완료됨"
    ).length;
    const progressPercentage = (completedChallenges / challenges.length) * 100;
    setProgress(progressPercentage);
  }, [challenges]);

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
      await markEasterEggComplete(selectedChallenge.easterEggId);
      closeCompleteModal();
    } catch (error) {}
  };

  return (
    <div css={Container}>
      <div css={challengeWrapper}>
        <div css={tabContainer(activeTab)}>
          <button
            onClick={() => setActiveTab("inProgress")}
            className={activeTab === "inProgress" ? "active" : ""}
          >
            진행중
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={activeTab === "completed" ? "active" : ""}
          >
            완료됨
          </button>
        </div>

        <div css={challengeListContainer}>
          {challenges
            .filter((challenge) => {
              if (activeTab === "inProgress") {
                return (
                  challenge.status === "진행중" ||
                  challenge.status === "완료하기"
                );
              }
              return challenge.status === "완료됨";
            })
            .map((challenge) => (
              <div key={challenge.easterEggId} css={challengeItem}>
                <div css={challengeTitle}>{challenge.content}</div>
                <div css={challengeReward}>
                  보상: {challenge.reward || "???"}
                </div>
                <div css={challengeStatus}>
                  {challenge.status === "완료하기" && (
                    <button
                      type="button"
                      className="nes-btn is-success"
                      onClick={() => openCompleteModal(challenge)}
                    >
                      완료하기
                    </button>
                  )}
                  {challenge.status === "진행중" && (
                    <button type="button" className="nes-btn is-primary">
                      진행중
                    </button>
                  )}
                  {challenge.status === "완료됨" && (
                    <button type="button" className="nes-btn is-disabled">
                      완료됨
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedChallenge && (
        <Modal
          isOpen={isCompleteModalOpen}
          onClose={closeCompleteModal}
          title="보상 수령"
        >
          <div css={[deleteModalOverlayStyle, modalBodyStyle]}>
            <div css={deleteModalContentStyle}>
              <h2 css={rewardTitleStyle}>보상 수령</h2>
              <div css={congratsContainerStyle}>
                <img src={cheer} alt="축하 아이콘" css={warningIconStyle} />
                <h4>
                  축하합니다! <br /> '{selectedChallenge.reward}'을
                  획득했습니다!
                </h4>
              </div>
              <Button
                backgroundColor="#ffffff"
                color="#000"
                variant="contained"
                fullwidth={false}
                rounded={0}
                handler={handleCompleteChallenge}
                fontSize="1rem"
                width="40%"
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <div css={progressContainer}>
        {progress && (
          <progress
            className="nes-progress is-success"
            value={progress}
            max="100"
          ></progress>
        )}

        <div>{progress.toFixed(1)}%</div>
      </div>
    </div>
  );
};
