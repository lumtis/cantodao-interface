import { Spinner } from '@chakra-ui/react';

import useQueryTokenInfo from '../../hooks/queries/useTokenInfo';
import { FormatToken } from '../../types/token';
import ContainerSpaced from '../ui/container-spaced';
import Param from '../ui/param';
import ParamCopyCard from '../ui/param-copy-card';

export const TokenInfo = ({ address }: { address?: string }) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(address);

  return (
    <>
      {address && !isLoading && !error && tokenInfo && tokenInfo.totalSupply ? (
        <ContainerSpaced>
          <Param
            name="Total supply"
            value={FormatToken(tokenInfo.totalSupply, tokenInfo)}
          />
          <ParamCopyCard name="Address" value={address} />
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </>
  );
};
