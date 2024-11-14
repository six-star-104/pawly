import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

interface Mailbox {
  postboxId: number;
  memberId: number;
  title: string;
  latitude: number;
  longtitude: number;
}

// method 는  ar 또는 map
export const useFetchMailBoxes = (method: string) => {
  const [mailBoxes, setMailBoxes] = useState<Mailbox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  const fetchMailBoxes = async (
    latitude: number, // 현재 위도
    longitude: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(
        `postbox/${method}?latitude=${latitude}&longitude=${longitude}`
      );
      console.log("위치조회성공", res.data);
      setMailBoxes(res.data.data);
    } catch (err) {
      setError("Failed to fetch mailboxes.");
    } finally {
      setLoading(false);
    }
  };

  return { mailBoxes, loading, error, fetchMailBoxes };
};
