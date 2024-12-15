"use client";

import { useEffect, useState } from "react";

import { selectCurrentToken } from "@/src/lib/redux/features/auth/auth.slice";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { useGetMyProfileQuery } from "@/src/lib/redux/features/auth/auth.api";

const useUserDetails = () => {
  const token = useAppSelector(selectCurrentToken);
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, isLoading, refetch } = useGetMyProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      setIsRefetching(true);
      refetch().finally(() => {
        setIsRefetching(false);
      });
    }
  }, [token, refetch]);

  const effectiveLoading = isLoading || isRefetching;

  return { userData: data || null, isLoading: effectiveLoading };
};

export default useUserDetails;