const _apiUrl = "/api/stylists";

// get all stylists
export const getStylists = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

