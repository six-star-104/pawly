import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";

interface Mailbox {
  postboxId: number;
  memberId: number;
  title: string;
  latitude: number;
  longtitude: number;
}

// method 는  ar 또는 map
export const useFetchMailboxes = (method: string) => {
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRollingPaper = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`postbox/${method}`);
        setMailboxes(res.data.data);
      } catch (err) {
        setError("Failed to fetch mailboxes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRollingPaper();
  }, []);

  return { mailboxes, loading, error };
};
