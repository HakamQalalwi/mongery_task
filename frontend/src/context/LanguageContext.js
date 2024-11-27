import React, { createContext, useState, useContext } from 'react';
const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState(require(`../locales/en.json`));

    const changeLanguage = (lang) => {
        setLanguage(lang);
        const selectedTranslations = require(`../locales/${lang}.json`);
        setTranslations(selectedTranslations);
    };

    return (
        <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
