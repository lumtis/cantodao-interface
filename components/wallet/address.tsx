import useAccountWrapped from "../../hooks/useAccount";
import { CopyCard } from "../ui/copy-card";

export const Address = () => {
  const { address, isConnected } = useAccountWrapped();
  if (!isConnected) return null;
  return <CopyCard address={address} isLoading={false} />;
};
