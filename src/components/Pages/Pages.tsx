import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import navLink from '../Navbar/NAVLINK';

const Pages = (props: { pages: navLink[] }) => {
  return (
    <Routes>
      {props.pages.map((page) => {
        return (
          <Route key={uuidv4()} path={page.path}>
            <Route index={true} element={page.component} />
            {/* render nested routes if children exist */}
            {page.children &&
              page.children.map((child) => {
                return (
                  <Route
                    key={uuidv4()}
                    path={child.path}
                    element={child.component}
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
