import styled from 'styled-components'
import { NavLink as NavLinkR } from "react-router-dom";

const NavLink = styled(NavLinkR)`
display: grid;
grid-template-columns: max-content max-content;
align-items: center;
column-gap: 1rem;
padding: .65rem 1.5rem;
position: relative;
color: #afa5d9;
transition: 0.3s;

  &:hover {
    color: black;
  }

  &.active {
    color: black;
  }
  &.active::before {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 32px;
      background-color: #fff;
  }

  & img{
    width: 190px;
  }
`

export default NavLink