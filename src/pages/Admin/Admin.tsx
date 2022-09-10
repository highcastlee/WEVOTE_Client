import { MenuData, menuType, smallMenuType } from './MenuData';
import { theme, useStyles } from './materialStyle';

import Calendar from './Calendar/Calendar';
import Candidate from './Candidate';
import { cloneDeep } from 'lodash';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Information from './Information';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Notice from './Notice';
import { PledgeBoard } from './PledgeBoard/PledgeBoard';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';

function Admin() {
  const classes = useStyles();
  const [menus, setMenus] = useState<menuType[]>(MenuData);
  const [currentMenuId, setCurrentMenuId] = useState<number>(1);
  const [currentSmallMenu, setCurrentSmallMenu] = useState<smallMenuType[]>(
    menus[currentMenuId - 1].smallMenu
  );
  const [currentSmallMenuId, setCurrentSmallMenuId] = useState<number>(1);

  const GreetingMessage = '관리자님, 반갑습니다.';

  const Contents = [
    { id: 1, component: <Notice /> },
    { id: 2, component: <Calendar /> },
    { id: 3, component: <Candidate currentSmallMenuId={currentSmallMenuId} /> },
    { id: 4, component: <Information /> },
    { id: 5, component: <PledgeBoard /> },
  ];

  // 클릭한 메뉴를 active true로 변경, 나머지는 false
  // active 상태의 소메뉴 id 세팅
  const handleMenus = (e) => {
    const copyMenus = cloneDeep(menus);
    const newMenus = copyMenus.map((obj) => {
      if (e.target.innerText === obj.name) {
        obj.active = true;
        setCurrentMenuId(obj.id);
        setCurrentSmallMenu(copyMenus[obj.id - 1].smallMenu);
      } else {
        obj.active = false;
      }
      return obj;
    });
    setMenus(newMenus);
  };

  const handleCurrentSmallMenu = (e) => {
    const newSmallMenu = currentSmallMenu.map((obj) => {
      if (e.target.innerText === obj.name) {
        obj.active = true;
        setCurrentSmallMenuId(obj.id);
      } else {
        obj.active = false;
      }
      return obj;
    });
    setCurrentSmallMenu(newSmallMenu);
  };

  const renderMenu = () =>
    menus.map(({ id, name, icon, active, smallMenu }) => (
      <div key={id}>
        <ListItem
          button
          className={clsx(classes.item, active && classes.itemActiveItem)}
          onClick={handleMenus}
        >
          <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            {name}
          </ListItemText>
        </ListItem>
        {active && renderSmallMenu(smallMenu)}
      </div>
    ));

  const renderSmallMenu = (small) =>
    small.map((obj) => (
      <ListItem
        key={obj.id}
        className={clsx(classes.smallItem, obj.active && classes.activeItem)}
        button
        onClick={handleCurrentSmallMenu}
      >
        <ListItemText primary={obj.name} />
      </ListItem>
    ));

  const renderContent = () =>
    Contents.filter((component) => component.id === currentMenuId)[0].component;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden xsDown implementation="css">
            <Drawer variant="permanent" className={classes.drawer}>
              <List className={classes.paper} disablePadding>
                <ListItem
                  className={clsx(classes.firebase, classes.itemCategory)}
                >
                  {GreetingMessage}
                </ListItem>
                {menus && renderMenu()}
                <Divider className={classes.divider} />
              </List>
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.app}>
          <section className={classes.main}>{renderContent()}</section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Admin;
