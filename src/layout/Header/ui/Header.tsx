import { FC, useState } from 'react';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Menu, MenuItem, Button } from 'shared/ui';


export const Header: FC = () => {
    const { t, currentLanguage, changeLanguage } = useTranslation('common');
 
    const languageToImg: { [key: string]: string } = {
        'en': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png',
        'bg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/2000px-Flag_of_Bulgaria.svg.png'
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const onLanguageChange = (language: string) => {
        handleClose();
        changeLanguage(language);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="w-full h-20 flex justify-between items-center">
            <div>Logo</div>
            <nav>
                <ul className='flex gap-4 items-center'>
                    <li>
                        <a href="/">{t('login')}</a>
                    </li>
                    <li>
                        <Button
                            onClick={(e) => handleClick(e)}
                        >
                            <div className='flex gap-2 items-center'>
                                <p>{currentLanguage}</p>
                                <img className='h-4 w-4 rounded-md' src={languageToImg[currentLanguage]} />
                            </div>
                        </Button>                        
                        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                            <MenuItem onClick={() => onLanguageChange('en')}>
                                <div className='flex gap-2 items-center'>
                                    <p>English</p>
                                    <img className='h-4 w-4 rounded-md' src={languageToImg['en']}/>
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => onLanguageChange('bg')}>
                                <div className='flex gap-2 items-center'>
                                    <p>Bulgarian</p>
                                    <img className='h-4 w-4 rounded-md' src={languageToImg['bg']}/>
                                </div>
                            </MenuItem>
                        </Menu>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
