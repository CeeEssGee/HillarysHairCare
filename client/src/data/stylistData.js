const _apiUrl = "/api/stylists";

// get all stylists
export const getStylists = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

// add a stylist
export const addStylist = (stylist) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stylist),
    }).then((res) => res.json());
};