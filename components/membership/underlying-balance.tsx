import { useState } from 'react';

import { BigNumber } from 'ethers';

import {
  Box,
  Heading,
  Spinner,
} from '@chakra-ui/react';

import useQueryTokenAllowance from '../../hooks/queries/useQueryTokenAllowance';
import useQueryWrappedTokenAsset
  from '../../hooks/queries/useQueryWrappedTokenAsset';
import useQueryTokenInfo from '../../hooks/queries/useTokenInfo';
import { Balance } from '../token/balance';
import { ApproveButton } from '../token/button-approve';
import { DepositButton } from '../token/button-deposit';
import { WithdrawButton } from '../token/button-withdraw';
import ContainerSpaced from '../ui/container-spaced';

// TODO: break into smaller components
export const UnderlyingBalance = ({
  address,
  votingModuleAddress,
}: {
  address: string;
  votingModuleAddress?: string;
}) => {
  const { asset, error, isLoading } =
    useQueryWrappedTokenAsset(votingModuleAddress);
  const [underlyingBalance, setUnderlyingBalance] = useState<
    BigNumber | undefined
  >(undefined);

  const {
    allowance,
    error: errorAllowance,
    isLoading: isLoadingAllowance,
  } = useQueryTokenAllowance(address, votingModuleAddress, asset);

  const {
    tokenInfo,
    error: errorTokenInfo,
    isLoading: isLoadingTokenInfo,
  } = useQueryTokenInfo(asset);

  const showDepositButton =
    underlyingBalance &&
    !errorAllowance &&
    !isLoadingAllowance &&
    allowance &&
    !errorTokenInfo &&
    !isLoadingTokenInfo &&
    tokenInfo;

  return (
    <>
      <Heading fontSize="30px">Underlying token balance:</Heading>
      {votingModuleAddress && !isLoading && !error && asset ? (
        <ContainerSpaced>
          <Balance
            holderAddress={address}
            contractAddress={asset}
            setBalance={setUnderlyingBalance}
          />
          {showDepositButton &&
            underlyingBalance.gt(0) &&
            allowance.isZero() && (
              <ApproveButton
                contractAddress={asset}
                spenderAddress={votingModuleAddress}
              />
            )}
          {showDepositButton && underlyingBalance.gt(0) && allowance.gt(0) && (
            <Box display="flex" flexDirection="row" alignItems="flex-start">
              <DepositButton
                address={address}
                contractAddress={votingModuleAddress}
                tokenDecimals={tokenInfo?.decimals || 0}
              />
              <WithdrawButton
                address={address}
                contractAddress={votingModuleAddress}
              />
            </Box>
          )}
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </>
  );
};
