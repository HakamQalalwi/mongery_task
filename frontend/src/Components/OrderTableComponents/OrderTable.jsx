import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import OrdersTableHeader from './OrdersTableHeader';
import OrdersTableBody from './OrdersTableBody';
import { useFetchOrdersQuery } from '../../api/orderApi';
import { sortProducts } from '../../utils/SortUtils';
import { FaMoneyBillWave } from 'react-icons/fa';
import { Spin } from "antd";

const OrdersTable = () => {
    const { darkMode } = useTheme();
    const { translations } = useLanguage();
    const [viewType, setViewType] = useState('product');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ field: null, direction: null });
    const [showTotalCash, setShowTotalCash] = useState(false);

    const { data, error } = useFetchOrdersQuery({ type: viewType, currency: 'USD' });
    console.log(data)
    useEffect(() => {
        if (data?.finalCashValue) {
            setShowTotalCash(false);
            const timer = setTimeout(() => {
                setShowTotalCash(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [data?.finalCashValue]);

    // if (isFetching) return <LoadingSpinner />;
    if (error) return <div>Error fetching orders: {error.message}</div>;

    const products = data?.results || [];
    const totalCash = data?.finalCashValue || 0;

    const handleSort = (field) => {
        setSortConfig((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const filteredProducts = products.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (product.product_name && product.product_name.toLowerCase().includes(searchLower)) ||
            (product.invoiceNumber && product.invoiceNumber.toLowerCase().includes(searchLower)) ||
            (product.customerName && product.customerName.toLowerCase().includes(searchLower))
        );
    });

    const sortedProducts = sortProducts(filteredProducts, sortConfig);

    return (
        <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">{translations.profitability}</h2>
                <div className="flex flex-col items-center mt-4">
                    <FaMoneyBillWave className="text-green-500 text-6xl mb-2" />
                    {showTotalCash ? (
                        <span className="text-xl font-semibold">{totalCash} USD</span>
                    ) : (
                        <div className="flex items-center">
                            <span className="text-xl font-semibold mr-2">{translations.calculate}</span>
                            <Spin />
                        </div>
                    )}
                </div>
            </div>
            <OrdersTableHeader
                viewType={viewType}
                onSearchChange={setSearchQuery}
                onViewChange={setViewType}
                darkMode={darkMode}
            />
            <OrdersTableBody
                products={sortedProducts}
                viewType={viewType}
                onSort={handleSort}
                sortConfig={sortConfig}
                darkMode={darkMode}
            />
        </div>
    );
};

export default OrdersTable;
