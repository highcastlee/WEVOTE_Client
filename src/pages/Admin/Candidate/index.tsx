import Category from './Category/Category';
import Editor from './Editor';
import React from 'react';
import Register from './Register/Register';

interface Props {
  currentSmallMenuId: number;
}

export default function Candidate({ currentSmallMenuId }: Props) {
  const Content = [
    { id: 1, component: <Category /> },
    { id: 2, component: <Register /> },
    { id: 3, component: <Editor /> },
  ];

  return (
    <>
      {
        Content.filter((component) => component.id === currentSmallMenuId)[0]
          .component
      }
    </>
  );
}
