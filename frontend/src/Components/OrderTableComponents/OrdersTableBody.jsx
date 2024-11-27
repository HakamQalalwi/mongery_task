import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ProductModal from "../ProductModal";

const OrdersTableBody = ({ products, viewType, onSort, sortConfig, darkMode }) => {
    const { translations } = useLanguage();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getSortIcon = (field) => {
        if (sortConfig.field !== field) return "▲";
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    const handleProductClick = (product) => {
        if (viewType === "product") {
            setSelectedProduct(product);
        }
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <>
            <div
                className={`overflow-x-auto shadow-md rounded-[5px] ${
                    darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                }`}
            >
                <table className="min-w-full border-collapse">
                    <thead className={`${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-600"}`}>
                    <tr>
                        {viewType === "product" ? (
                            <>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.productName}</th>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.invoiceNo}</th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("quantity")}
                                >
                                    {translations.quantity} {getSortIcon("quantity")}
                                </th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("adjustedTotalPrice")}
                                >
                                    {translations.totalAmount} {getSortIcon("adjustedTotalPrice")}
                                </th>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.totalExpense}</th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("grossProfit")}
                                >
                                    {translations.grossProfit} {getSortIcon("grossProfit")}
                                </th>
                            </>
                        ) : (
                            <>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.customer}</th>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.invoiceNo}</th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("totalQuantity")}
                                >
                                    {translations.quantity} {getSortIcon("totalQuantity")}
                                </th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("totalAmount")}
                                >
                                    {translations.totalAmount} {getSortIcon("totalAmount")}
                                </th>
                                <th className="border px-6 py-3 text-left text-base font-bold">{translations.totalCost}</th>
                                <th
                                    className="border px-6 py-3 text-left text-base font-bold cursor-pointer"
                                    onClick={() => onSort("grossProfit")}
                                >
                                    {translations.grossProfit} {getSortIcon("grossProfit")}
                                </th>
                            </>
                        )}
                    </tr>
                    </thead>
                    <tbody className={`${darkMode ? "divide-gray-700 text-gray-300" : "divide-gray-200 text-gray-700"}`}>
                    {products.map((product, index) => (
                        <tr
                            key={index}
                            className={`${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                            } ${selectedProduct === product ? "bg-green-500" : ""}`}
                            onClick={() => handleProductClick(product)}
                        >
                            {viewType === "product" ? (
                                <>
                                    <td className="border px-6 py-4">
                                            <span className="px-3 py-1 rounded-lg text-base font-bold bg-purple-100 text-purple-700">
                                                {product.product_name}
                                            </span>
                                    </td>
                                    <td className="border px-6 py-4 font-bold">{product.invoiceNumber}</td>
                                    <td className="border px-6 py-4 font-bold">{product.quantity} ton</td>
                                    <td className="border px-6 py-4 font-bold">
                                        {product.adjustedTotalPrice + " " + product.currency}
                                    </td>
                                    <td className="border px-6 py-4 font-bold">{product.totalExpense + " " + product.currency}</td>
                                    <td className="border px-6 py-4">
                                            <span
                                                className={`px-4 py-2 rounded-full text-base font-bold ${
                                                    parseFloat(product.grossProfit.replace(",", ".")) >= 0
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {product.grossProfit + " " + product.currency}
                                            </span>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="border px-6 py-4 font-bold">{product.customerName}</td>
                                    <td className="border px-6 py-4 font-bold">{product.invoiceNumber}</td>
                                    <td className="border px-6 py-4 font-bold">{product.totalQuantity} ton</td>
                                    <td className="border px-6 py-4 font-bold">{product.totalAmount + " " + product.currency}</td>
                                    <td className="border px-6 py-4 font-bold">{product.totalCost + " " + product.currency}</td>
                                    <td className="border px-6 py-4 font-bold">
                                            <span
                                                className={`px-4 py-2 rounded-full text-base font-bold ${
                                                    parseFloat(product.grossProfit.replace(",", ".")) >= 0
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {product.grossProfit + " " + product.currency}
                                            </span>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedProduct && (
                <ProductModal
                    selectedProduct={selectedProduct}
                    translations={translations}
                    closePopup={closePopup}
                />
            )}
        </>
    );
};

export default OrdersTableBody;
