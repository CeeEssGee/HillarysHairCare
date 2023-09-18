const _apiUrl = "/api/customers";

// get all customers
export const getCustomers = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

