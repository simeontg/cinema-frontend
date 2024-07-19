import { FC } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
    return (
        <div className="w-full absolute h-60 bg-zinc-900 font-effra flex text-white">
            <div className="pt-14 pl-28">
                <h1 className="text-lg font-bold mb-2">About the developer</h1>
                <p>Simeon Georgiev</p>
                <p>+359884387308</p>
                <p>sgeorgiev783@gmail.com</p>
            </div>
            <div className="pt-14 pl-24">
                <h1 className="text-lg font-bold mb-2">Follow me</h1>
                <div className="flex gap-3">
                    <Link to="https://github.com/simeontg">
                        <GitHubIcon className="hover:bg-black" />
                    </Link>
                    <Link to="https://linkedin.com/in/simeon-georgiev-dev">
                        <LinkedInIcon />
                    </Link>
                </div>
            </div>
            <p className="absolute bottom-0 left-2/4">&copy; 2024</p>
        </div>
    );
};
