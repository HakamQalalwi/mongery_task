import React from 'react';
import { FiBell } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import logo from '../assets/logo.png';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
const Navbar = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const { language, translations, changeLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'tr' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <nav className={`flex items-center justify-between px-8 py-5 md:px-12 md:py-2 transition-colors duration-300 ease-in-out ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} `}>
            {/* Company Logo and Name */}
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                />
                <div className="text-4xl font-extrabold tracking-wider text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 transition-all hover:scale-110 hover:text-shadow-lg hover:opacity-90">
                    {translations.companyName}
                </div>
            </div>

            {/* Notification and User */}
            <div className="flex items-center gap-8 md:gap-12">
                {/* Notification Bell */}
                <button className="relative group">
                    <FiBell
                        size={16}
                        className="text-gray-600 dark:text-gray-300 transition-all transform group-hover:scale-110 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-4">
                    <Avatar
                        size={{ xs: 24 }}
                        icon={<AntDesignOutlined />}
                    />
                    <span className="font-medium text-base text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        {translations.userName} {/* Display user name */}
                    </span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    aria-label="Toggle theme"
                >
                    {darkMode ? <BsSun size={12} className="text-yellow-500" /> : <BsMoon size={12} />}
                </button>

                {/* Language Switch */}
                <button
                    onClick={toggleLanguage}
                    className="px-6 py-2 text-sm font-semibold border-2 rounded-full text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    {translations.languageSwitch}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
