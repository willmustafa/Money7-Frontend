import styled from 'styled-components'

const Navbar = styled.div`
position: relative;
top: 0;
left: -30%;
width: 68px;
min-height: 100vh;
background-color: #fff;
padding: 0.5rem 1rem 0 0;
transition: 0.5s;
z-index: 100;

.menu-show &{
  left: 0;
}

.nav_list{
  width: 3rem;
  overflow: hidden;
}

.logo-sidebar{
  width: 20px
}

@media screen and (min-width: 768px) {
  &{
      left: 0;
      padding: 1rem 1rem 0 0;
  }
  .menu-show &{
      width: calc(68px + 212px);
  }

  .nav_list{
    width: 100%
  }

  .logo-sidebar{
    width: 200px
  }
}
`

export default Navbar