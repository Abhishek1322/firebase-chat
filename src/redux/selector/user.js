import { useSelector } from "react-redux";

export const useUserSelector = () => {
  return useSelector((state) => state.user)
}
