import { BigNumber } from "ethers";

import useQueryProposalCount from "../hooks/queries/useQueryProposalCount";
import { ProposalCard } from "./proposal-card";
import ContainerSpaced from "./ui/container-spaced";

export const Proposals = ({
  governorContract,
}: {
  governorContract?: string;
}) => {
  const { count, error, isLoading } = useQueryProposalCount(governorContract);

  const getDescendingArray = (num: number): number[] => {
    const descendingArray = Array.from({ length: num }, (_, i) => num - i - 1);
    return descendingArray;
  };
  const allIndexes = count ? getDescendingArray(count.toNumber()) : [];

  return (
    <ContainerSpaced>
      {!isLoading &&
        !error &&
        count &&
        allIndexes.map((proposalIndex) => (
          <ProposalCard
            key={proposalIndex}
            governorContract={governorContract}
            proposalIndex={BigNumber.from(proposalIndex)}
          />
        ))}
    </ContainerSpaced>
  );
};
