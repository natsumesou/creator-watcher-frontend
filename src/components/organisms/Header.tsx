import { AppBar, Toolbar } from '@material-ui/core'
import React from 'react'
import { TitleButton } from "../atoms/TitleButton"
import { HeaderTabs } from '../molecules/HeaderTabs';

const style: React.CSSProperties = {
  width: '100%',
  height: 'calc(100vw/3)',
};

export const Header = ({location}) => {
  const routers = [
    {name: "タイムライン", link: "/"},
    {name: "ランキング", link: "/ranking"},
    {name: "個別", link: "/indivisual"},
  ]
  return (
    <header>
    <AppBar position="sticky">
      <Toolbar variant="regular">
        <TitleButton />
      </Toolbar>
    </AppBar>
    <HeaderTabs routers={routers} currentPage={location.pathname} />
    </header>
  )
}
