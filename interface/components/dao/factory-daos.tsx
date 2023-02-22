import { BigNumber } from "ethers";

import { Grid, Spinner } from "@chakra-ui/react";

import { useQueryFactoryDAOCount } from "../../hooks/queries/useQueryFactoryDAOCount";
import { DaoCardFromId } from "./dao-card-from-id";

// Display all DAOs from a factory
export const FactoryDAOs = ({
  factoryAddress,
}: {
  factoryAddress: `0x${string}`;
}) => {
  const { daoCount, error, isLoading } =
    useQueryFactoryDAOCount(factoryAddress);

  if (error || isLoading || !daoCount) {
    return <Spinner />;
  }

  const count = daoCount.toNumber();

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
      {[...Array(count)].map((_, i) => (
        <DaoCardFromId
          key={i}
          daoId={BigNumber.from(i)}
          daoFactoryAddress={factoryAddress}
        />
      ))}
    </Grid>
  );
};
