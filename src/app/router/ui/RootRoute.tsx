import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const RootRoute = () => {
  const { t } = useTranslation(['translation']);
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 4);

  return (
    <>
      <div>
        <h1>{count}</h1>
        <button onClick={increment}>
          <span>Increment</span>
        </button>
      </div>
      <div>{t('title')}</div>
      <Outlet />
    </>
  );
};
