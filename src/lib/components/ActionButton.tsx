import { AlertTriangle, Icon, LargeIcon } from 'lib/icons'
import styled, { Color, css, keyframes, ThemedText } from 'lib/theme'
import { ReactNode, useMemo } from 'react'

import Button from './Button'
import Row from './Row'

const StyledButton = styled(Button)`
  border-radius: ${({ theme }) => theme.borderRadius}em;
  flex-grow: 1;
  transition: background-color 0.25s ease-out, flex-grow 0.25s ease-out, padding 0.25s ease-out;

  :disabled {
    margin: -1px;
  }
`

const UpdateRow = styled(Row)``

const grow = keyframes`
  from {
    opacity: 0;
    width: 0;
  }
  to {
    opacity: 1;
    width: max-content;
  }
`

const updateCss = css`
  border: 1px solid ${({ theme }) => theme.outline};
  padding: calc(0.25em - 1px);
  padding-left: calc(0.75em - 1px);

  ${UpdateRow} {
    animation: ${grow} 0.25s ease-in;
    white-space: nowrap;
  }

  ${StyledButton} {
    border-radius: ${({ theme }) => theme.borderRadius * 0.75}em;
    flex-grow: 0;
    padding: 1em;
  }
`

export const Overlay = styled(Row)<{ update?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius}em;
  flex-direction: row-reverse;
  min-height: 3.5em;
  transition: padding 0.25s ease-out;

  ${({ update }) => update && updateCss}
`

export interface ActionButtonProps {
  color?: Color
  disabled?: boolean
  update?: { message: ReactNode; action: ReactNode; icon?: Icon }
  onClick: () => void
  onUpdate?: () => void
  children: ReactNode
}

export default function ActionButton({
  color = 'accent',
  disabled,
  update,
  onClick,
  onUpdate,
  children,
}: ActionButtonProps) {
  const textColor = useMemo(() => (color === 'accent' && !disabled ? 'onAccent' : 'currentColor'), [color, disabled])
  return (
    <Overlay update={Boolean(update)} flex align="stretch">
      <StyledButton color={color} disabled={disabled} onClick={update ? onUpdate : onClick}>
        <ThemedText.TransitionButton buttonSize={update ? 'medium' : 'large'} color={textColor}>
          {update ? update.action : children}
        </ThemedText.TransitionButton>
      </StyledButton>
      {update && (
        <UpdateRow gap={0.5}>
          <LargeIcon color="currentColor" icon={update.icon || AlertTriangle} />
          <ThemedText.Subhead2>{update?.message}</ThemedText.Subhead2>
        </UpdateRow>
      )}
    </Overlay>
  )
}