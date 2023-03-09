import {
  Heading,
  Spinner,
} from '@chakra-ui/react';

import useQueryWrappedTokenAsset
  from '../../hooks/queries/useQueryWrappedTokenAsset';
import { TokenInfo } from './token-info';

export const UnderlyingInfo = ({ address }: { address?: string }) => {
  const { asset, error, isLoading } = useQueryWrappedTokenAsset(address);

  return (
    <>
      <Heading fontSize="30px">Underlying token:</Heading>
      {address && !isLoading && !error && asset ? (
        <TokenInfo address={asset} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
