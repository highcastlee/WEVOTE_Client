import * as AiIcons from 'react-icons/ai';
import * as React from 'react';

export const MenuData = [
  {
    id: 1,
    type: 'text',
    title: '선거정보',
    path: '/info',
    icon: <AiIcons.AiOutlineFile />,
  },
  // {
  //   id: 2,
  //   type: 'text',
  //   title: '공약게시판',
  //   path: '/board',
  //   icon: <AiIcons.AiOutlineOrderedList />,
  // },
  {
    id: 3,
    type: 'space',
    title: '공백',
    path: '/',
  },
  {
    id: 4,
    type: 'text',
    title: '관리자페이지',
    path: '/admin',
    icon: <AiIcons.AiOutlineBank />,
  },
];
