import { useEffect, useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { Wrapper, AccountPageWrapper, Subtitle, MainText, AccountCard, AccountHeading, RemoveTokens } from '../styled'
import { AccountMenu } from '../Menu'
import { useAllTokens } from 'hooks/Tokens'
import { isTruthy } from 'utils/misc'
import TokensTable from 'components/Tokens/TokensTable'
import { useFavouriteTokens, useRemoveAllFavouriteTokens } from 'state/user/hooks'

export default function TokensOverview() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const favouriteTokens = useFavouriteTokens()
  const allTokens = useAllTokens()

  const removeAllFavouriteTokens = useRemoveAllFavouriteTokens()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens).filter(isTruthy)
  }, [allTokens])

  return (
    <Wrapper>
      <AccountMenu />
      <AccountPageWrapper>
        <AccountHeading>
          <Subtitle>
            <Trans>Favourite tokens</Trans>
          </Subtitle>
          <RemoveTokens onClick={() => removeAllFavouriteTokens()}>
            (<Trans>Clear</Trans>)
          </RemoveTokens>
        </AccountHeading>
        <AccountCard>
          {favouriteTokens.length > 0 ? (
            <TokensTable tokensData={favouriteTokens} />
          ) : (
            <MainText>
              <Trans>Favourite tokens will appear here</Trans>
            </MainText>
          )}
        </AccountCard>

        <AccountHeading>
          <Subtitle>
            <Trans>All tokens</Trans>
          </Subtitle>
        </AccountHeading>
        <AccountCard>
          <TokensTable tokensData={formattedTokens} />
        </AccountCard>
      </AccountPageWrapper>
    </Wrapper>
  )
}
