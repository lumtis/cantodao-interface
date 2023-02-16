import { BigNumber } from "ethers";

import { Box, Grid } from "@chakra-ui/react";

import useQueryProposalCount from "../hooks/queries/useQueryProposalCount";
import { ProposalCard } from "./proposal-card";

export const Proposals = ({
  governorContract,
  proposerContract,
}: {
  governorContract?: string;
  proposerContract?: string;
}) => {
  const { count, error, isLoading } = useQueryProposalCount(proposerContract);

  const getDescendingArray = (num: number): number[] => {
    const descendingArray = Array.from({ length: num }, (_, i) => num - i - 1);
    return descendingArray;
  };
  const allIndexes = count ? getDescendingArray(count.toNumber()) : [];

  return (
    <Box textAlign="center">
      {!isLoading && !error && count && (
        <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))">
          {allIndexes.map((proposalIndex) => (
            <ProposalCard
              governorContract={governorContract}
              proposerContract={proposerContract}
              proposalIndex={BigNumber.from(proposalIndex)}
              key={proposalIndex}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};
