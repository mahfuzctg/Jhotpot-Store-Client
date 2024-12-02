import { useGetMyProfileQuery } from "@/src/lib/redux/features/auth/auth.api";
import { selectCurrentUser } from "@/src/lib/redux/features/auth/auth.slice";
import { useAppSelector } from "@/src/lib/redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetMyProfileQuery(undefined);

  if (!user) {
    return { isLoading: false, userData: undefined };
  }

  return { userData: data, isLoading };
};

export default useUserDetails;
