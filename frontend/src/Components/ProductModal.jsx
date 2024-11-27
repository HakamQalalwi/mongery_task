import React from "react";

const ProductModal = ({ selectedProduct, translations, closePopup }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100 opacity-100">
                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-gray-900">{translations.productDetails}</h2>

                    <ul className="space-y-6 text-gray-700">
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.Package}</span>
                            <span className="text-gray-600">{selectedProduct.package || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.wind}</span>
                            <span className="text-gray-600">{selectedProduct.wind || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.innerDiameter}</span>
                            <span className="text-gray-600">{selectedProduct.innerDiameter || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.outsideDiameter}</span>
                            <span className="text-gray-600">{selectedProduct.outsideDiameter || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.wireDiameter}</span>
                            <span className="text-gray-600">{selectedProduct.wireDiameter || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.znCoating}</span>
                            <span className="text-gray-600">{selectedProduct.znCoating || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.windingType}</span>
                            <span className="text-gray-600">{selectedProduct.windingType || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.diameterTolerances}</span>
                            <span className="text-gray-600">{selectedProduct.diameterTolerances || "N/A"}</span>
                        </li>
                        <li className="flex justify-between text-lg">
                            <span className="font-medium">{translations.strength}</span>
                            <span className="text-gray-600">{selectedProduct.strength || "N/A"}</span>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={closePopup}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    {translations.close}
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
