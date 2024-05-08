import { Outlet } from 'react-router-dom';


export const RootRoute = () => {
  return (
    <>
      <span className="text-9xl">Hello World</span>
      <Outlet />
    </>
  );
};
