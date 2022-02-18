import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NAVLINK from '../Types';

const Pages = (props: { pages: NAVLINK[] }) => {
  return (
    <Routes>
      {props.pages.map((page: NAVLINK) => {
        return (
          <Route key={uuidv4()} path={page.path}>
            <Route index={true} element={page.component}/>
            {/* render nested routes if children exist */}
            {page.children &&
              page.children.map((child) => {
                return (
                  <Route
                    key={uuidv4()}
                    path={child.path}
                    element={<div><h1>{child.text}</h1></div>}
                    index={false}
                  />
                );
              })}
          </Route>
        );
      })}
    </Routes>
  );
};

export default Pages;
