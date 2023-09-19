const _apiUrl = "/api/stylists";

// get all stylists
export const getStylists = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

// get active stylists
export const getActiveStylists = () => {
    return fetch(`${_apiUrl}/active`).then((r) => r.json());
};

// add a stylist
export const addStylist = (stylist) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stylist),
    }).then((res) => res.json());
};

// deactivate stylist
export const deactivateStylist = (id) => {
    return fetch(`${_apiUrl}/deactivate/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

// activate stylist
export const activateStylist = (id) => {
    return fetch(`${_apiUrl}/activate/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    });
};