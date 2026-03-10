import { useState, useEffect, useCallback } from "react";
import api from "../api/axios.js";

export const useComplaints = (params = {}) => {
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/complaints", { params });
      setComplaints(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { complaints, setComplaints, pagination, loading, error, refetch: fetch };
};
