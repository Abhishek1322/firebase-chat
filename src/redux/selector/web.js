import { useSelector } from "react-redux";

export const useWebSelector = () => {
  return useSelector((state) => state.web)
}
