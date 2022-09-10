import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import React from 'react';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

export interface smallMenuType {
  id: number;
  name: string;
  active: boolean;
}

export interface menuType {
  id: number;
  name: string;
  icon: JSX.Element;
  active: boolean;
  smallMenu: smallMenuType[];
}

export const MenuData = [
  {
    id: 1,
    name: '공지사항 관리',
    icon: <PeopleIcon />,
    active: true,
    smallMenu: [],
  },
  {
    id: 2,
    name: '캘린더 관리',
    icon: <DnsRoundedIcon />,
    active: false,
    smallMenu: [],
  },
  {
    id: 3,
    name: '선거 관리',
    icon: <PublicIcon />,
    active: false,
    smallMenu: [
      { id: 1, name: '선거 조직 등록', active: true },
      { id: 2, name: '선거 후보 등록', active: false },
      { id: 3, name: '조직별 선거 관리', active: false },
    ],
  },
  {
    id: 4,
    name: '선거 안내 관리',
    icon: <SettingsEthernetIcon />,
    active: false,
    smallMenu: [],
  },
  {
    id: 5,
    name: '공약 게시판 관리',
    icon: <SettingsEthernetIcon />,
    active: false,
    smallMenu: [],
  },
];
