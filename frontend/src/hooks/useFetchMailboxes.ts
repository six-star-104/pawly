import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

interface Mailbox {
  postboxId: number;
  memberId: number;
  title: string;
  latitude: number;
  longitude: number;
  postboxOwner: string;
}

// method 는  ar 또는 map
export const useFetchMailBoxes = (method: string) => {
  const [mailBoxes, setMailBoxes] = useState<Mailbox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMailBoxes = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    console.log("조회 시작");
    try {
      const res = await axiosInstance.get(
        `postbox/${method}/${latitude}/${longitude}`
      );
      console.log("위치조회성공", res);
      setMailBoxes(res.data.data);
    } catch (err) {
      console.log("조회 실패", err);
      setError("Failed to fetch mailboxes.");
    } finally {
      setLoading(false);
    }
  };

  return { mailBoxes, loading, error, fetchMailBoxes };
};
