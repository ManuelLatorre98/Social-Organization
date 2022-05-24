import { StyledMenuTemplate } from 'components/Header/utils/styles'
import styled from 'styled-components'

export const StyledMenu = styled(StyledMenuTemplate)`
  
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  left: 0;
`
