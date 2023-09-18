const _apiUrl = "/api/services";

// get all services
export const getServices = () => {
    return fetch(_apiUrl).then((r) => r.json());
};