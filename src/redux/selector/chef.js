import { useSelector } from "react-redux";

export const useChefSelector = () => {
  return useSelector((state) => state.chef)
}
