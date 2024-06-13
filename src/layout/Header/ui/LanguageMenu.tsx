import { FC, useState } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, Menu, MenuItem } from 'shared/ui';

import { languageToImg } from '../constants/language';

export const LanguageMenu: FC = () => {
    const { currentLanguage, changeLanguage } = useTranslation('common');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onLanguageChange = (language: string) => {
        handleClose();
        changeLanguage(language);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button className="h-full !text-black hover:!text-[#6e3996] !text-base hover:!bg-transparent !text-lg" onClick={(e) => handleClick(e)}>
                <div className="flex gap-2 items-center">
                    <p>{currentLanguage}</p>
                    <img className="h-4 w-4 rounded-md" src={languageToImg[currentLanguage]} />
                </div>
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem onClick={() => onLanguageChange('en')}>
                    <div className="flex gap-2 items-center">
                        <p>English</p>
                        <img className="h-4 w-4 rounded-md" src={languageToImg['en']} />
                    </div>
                </MenuItem>
                <MenuItem onClick={() => onLanguageChange('bg')}>
                    <div className="flex gap-2 items-center">
                        <p>Bulgarian</p>
                        <img className="h-4 w-4 rounded-md" src={languageToImg['bg']} />
                    </div>
                </MenuItem>
            </Menu>
        </>
    );
};
