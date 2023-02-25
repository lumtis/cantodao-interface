import { BigNumber } from "ethers";

import { Spinner, Text } from "@chakra-ui/react";

import useQueryPastTotalSupply from "../../hooks/queries/useQueryPastTotalSupply";
import { DAOInfo } from "../../types/dao";
import { Proposal } from "../../types/proposal";
import ContainerSpaced from "../ui/container-spaced";
import Progress from "../ui/progress";

export const VoteTurnout = ({
  proposal,
  daoInfo,
  finished,
}: {
  proposal?: Proposal;
  daoInfo?: DAOInfo;
  finished?: boolean;
}) => {
  const {
    pastTotalSupply,
    error: errorTotalSupply,
    isLoading: isLoadingTotalSupply,
  } = useQueryPastTotalSupply(daoInfo?.token, proposal?.startBlock);

  // Compute quorum
  const quorumPercent =
    pastTotalSupply && !pastTotalSupply.isZero()
      ? daoInfo?.quorumVotes?.mul(100).div(pastTotalSupply)
      : null;

  // Compute turnout
  const totalVotes = proposal?.forVotes
    ?.add(proposal?.againstVotes)
    .add(proposal?.abstainVotes);

  const turnoutPercent =
    pastTotalSupply && !pastTotalSupply.isZero()
      ? totalVotes?.mul(100).div(pastTotalSupply)
      : null;

  const quorumReached = daoInfo?.quorumVotes
    ? totalVotes?.gte(daoInfo?.quorumVotes)
    : false;

  // Compute yes percent
  const yesPlusNo = proposal?.forVotes?.add(proposal?.againstVotes);
  const yesPercent =
    yesPlusNo && !yesPlusNo.isZero()
      ? proposal?.forVotes.mul(100).div(yesPlusNo)
      : BigNumber.from(0);
  const yesReached = yesPercent?.gte(BigNumber.from(50));

  // Proposal must reach quorum and have a majority of yes votes to pass
  const passed = quorumReached && yesReached;

  const turnoutText = finished ? "Final turnout" : "Current turnout";
  const voteText = finished ? "Final vote" : "Current vote";
  const statusText = finished ? "Final status" : "Current status";

  if (
    errorTotalSupply ||
    isLoadingTotalSupply ||
    !turnoutPercent ||
    !quorumPercent ||
    !yesPercent
  ) {
    return <Spinner />;
  }

  return (
    <ContainerSpaced>
      <Text>
        {turnoutText}: {turnoutPercent.toString()}% (quorum:{" "}
        {quorumPercent.toString()}%)
      </Text>
      <Progress
        value={turnoutPercent.toNumber()}
        reached={quorumReached}
      ></Progress>
      <Text mt={4}>
        {voteText}: {yesPercent.toString()}% yes
      </Text>
      <Progress value={yesPercent.toNumber()} reached={yesReached}></Progress>
      <Text mt={4}>
        {statusText}: {passed ? "PASSED" : "REJECTED"}
      </Text>
    </ContainerSpaced>
  );
};
