import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const root = document.getElementById('root');

if (!root) {
    throw new Error('No root element');
}

const container = createRoot(root);

container.render(<App />);
