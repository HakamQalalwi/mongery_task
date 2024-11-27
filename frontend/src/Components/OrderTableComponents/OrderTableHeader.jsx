import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import {Spin} from "antd";

const OrdersTableHeader = ({ viewType, onSearchChange, onViewChange, darkMode }) => {
    const { translations } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleViewChange = (value) => {
        setLoading(true);
        setTimeout(() => {
            onViewChange(value);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="flex flex-wrap justify-between items-center mb-6 gap-6">
            <div className="flex items-center gap-4">
                <label htmlFor="viewType" className="font-semibold text-lg text-gray-700 dark:text-white">
                    {translations.chooseView}:
                </label>
                <select
                    id="viewType"
                    value={viewType}
                    onChange={(e) => handleViewChange(e.target.value)} // Use the new handler
                    className={`transition-all ease-in-out duration-300 transform focus:outline-none rounded-lg shadow-md py-2 px-4 text-base ${
                        darkMode
                            ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-600'
                            : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                    }`}
                >
                    <option value="product">{translations.byProduct}</option>
                    <option value="order">{translations.byOrder}</option>
                </select>
            </div>
            <div className="relative w-full max-w-sm">
                <FaSearch
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all ease-in-out duration-200 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                />
                <input
                    type="text"
                    id="search"
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={translations.searchPlaceholder}
                    className={`w-full pl-10 py-2 rounded-full shadow-lg transition-all ease-in-out duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                />
            </div>
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default OrdersTableHeader;
