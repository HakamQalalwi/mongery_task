export const sortProducts = (products, sortConfig) => {
    if (!sortConfig.field) return products;

    return [...products].sort((a, b) => {

        const parseValue = (value) => {
            if (typeof value === "string") {
                return parseFloat(value.replace(",", ".").replace(/[^\d.-]/g, ""));
            }
            return value;
        };
        const aValue = parseValue(a[sortConfig.field]);
        const bValue = parseValue(b[sortConfig.field]);
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });
};
