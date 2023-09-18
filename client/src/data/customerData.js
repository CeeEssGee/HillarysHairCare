const _apiUrl = "/api/customers";

// get all customers
export const getCustomers = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

// add a customer
export const addCustomer = (customer) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    }).then((res) => res.json());
};