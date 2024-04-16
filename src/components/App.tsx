import { useState } from 'react';
import * as styles from './App.module.css';
import image from '../assets/images.jpg';
import png from '../assets/PNG_transparency_demonstration_1.png'
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
    
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(prev => prev + 4);
    return (
        <div>
            <Link to={'/lazy'}>Lazy module</Link>
            <img style={{width: '200px', height: '200px'}} src={image}/>
            <img style={{width: '200px', height: '200px'}} src={png}/>
            <h1 className={styles.count}>{count}</h1>
            <button className={styles.btn} onClick={increment}>
                <span>Increment</span>
            </button>
            <Outlet/>
        </div>
    );
}