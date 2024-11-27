// Utility to calculate total from an array of objects
const sumBy = (array, callback) =>
    array.reduce((total, item) => total + callback(item), 0);

// Helper to format numbers with a comma as a decimal separator
const formatNumber = (number, fractionDigits) =>
    number.toLocaleString("de-DE", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });

// Calculate profit for orders
exports.calculateOrderProfit = (
    orders,
    currency = "USD",
    initialCash = 100000
) => {
    let totalNetProfit = 0;

    const results = orders.map((order) => {
        const {
            invoice_number: invoiceNumber,
            primary_rate: primaryRate,
            customer,
            products,
        } = order;

        // Parse JSON fields
        const customerName =
            JSON.parse(customer)?.companyname || "Unknown Customer";
        const parsedProducts = JSON.parse(products);

        // Aggregate product data
        const totalQuantity = sumBy(parsedProducts, (p) => p.quantity);
        const totalPrice = sumBy(parsedProducts, (p) => p.total_price);
        const totalAmount = totalPrice * primaryRate;

        // Calculate total cost
        const totalCost = sumBy(parsedProducts, (product) =>
            sumBy(product.stocklogs, (log) => {
                const {
                    stock_cost: stockCost,
                    shipment_cost: shipmentCost,
                    credit_cost: creditCost = 0,
                    stock_quantity: stockQuantity,
                } = log;
                return (stockCost + shipmentCost + creditCost) * stockQuantity;
            })
        );

        // Calculate profits
        const grossProfit = totalAmount - totalCost;
        const netProfit = grossProfit * 0.375;
        totalNetProfit += grossProfit;

        return {
            order_id: order.order_id,
            invoiceNumber,
            customerName,
            currency,
            totalQuantity: formatNumber(totalQuantity, 4),
            totalAmount: formatNumber(totalAmount, 2),
            totalCost: formatNumber(totalCost, 2),
            grossProfit: formatNumber(grossProfit, 2),
            netProfit: formatNumber(netProfit, 2),
        };
    });

    const finalCashValue = formatNumber(initialCash + totalNetProfit, 2);
    return { results, finalCashValue };
};
exports.calculateProductProfit = (orders, currency, initialCash = 100000) => {
    const rateKey = currency === "USD" ? "primary_rate" : "secondary_rate";
    let totalNetProfit = 0;

    const result = orders.flatMap((order) => {
        const { primary_rate: primaryRate, invoice_number: invoiceNumber, products } = order;
        const parsedProducts = JSON.parse(products);

        return parsedProducts.map((product) => {
            const {
                product_id: productId,
                product_name: productName,
                quantity,
                total_price: totalPrice,
                stocklogs,
                attributes,
            } = product;


            const { "Paket" : package, "Sarım" : wind, "İç Çap": innerDiameter, "Dış Çap": outsideDiameter,  "Tel Çapı": wireDiameter,"Zn Kaplama": znCoating, "Sarım Türü": windingType, "Çap Toleransları": diameterTolerances, "Mukavemet (Min-Max)":strength } = attributes;

            // Calculate totals
            const adjustedTotalPrice = totalPrice * primaryRate;
            const totalExpense = sumBy(
                stocklogs,
                ({ stock_cost, shipment_cost, credit_cost = 0, stock_quantity }) =>
                    (stock_cost + shipment_cost + credit_cost) * stock_quantity
            );

            // Calculate profits
            const grossProfit = adjustedTotalPrice - totalExpense;
            const netProfit = grossProfit * 0.375;
            totalNetProfit += grossProfit;

            return {
                product_id: productId,
                currency,
                product_name: productName,
                invoiceNumber,
                package,
                wind,
                innerDiameter,
                outsideDiameter,
                wireDiameter,
                znCoating,
                windingType,
                diameterTolerances,
                strength,
                quantity: formatNumber(quantity, 4),
                adjustedTotalPrice: formatNumber(adjustedTotalPrice, 2),
                totalExpense: formatNumber(totalExpense, 2),
                grossProfit: formatNumber(grossProfit, 2),
                netProfit: formatNumber(netProfit, 2),
            };
        });
    });

    const finalCashValue = formatNumber(initialCash + totalNetProfit, 2);

    // Return the results along with the final cash value
    return { results: result, finalCashValue };
};
