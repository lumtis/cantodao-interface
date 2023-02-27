import { BigNumber } from 'ethers';

import { Spinner } from '@chakra-ui/react';

import { useQueryFactoryDAO } from '../../hooks/queries/useQueryFactoryDAO';
import { DaoCard } from './dao-card';

export const DaoCardFromId = ({
  daoId,
  daoFactoryAddress,
}: {
  daoId: BigNumber;
  daoFactoryAddress: `0x${string}`;
}) => {
  const { daoAddress, error, isLoading } = useQueryFactoryDAO(
    daoId,
    daoFactoryAddress
  );
  return (
    <>
      {!isLoading && !error && daoAddress ? (
        <DaoCard address={daoAddress} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
