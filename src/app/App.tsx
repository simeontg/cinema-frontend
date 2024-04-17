import { useState } from 'react';
import * as styles from './App.module.css';

export const App = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 4);
  return (
    <div>
      <h1 className={styles.count}>{count}</h1>
      <button className={styles.btn} onClick={increment}>
        <span>Increment</span>
      </button>
    </div>
  );
};
