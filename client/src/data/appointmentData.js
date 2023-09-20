const _apiUrl = "/api/appointments";

// get all appointments
export const getAppointments = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

// get appointment by id
export const getAppointment = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};

// add an appointment
export const addAppointment = (appointment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    }).then((res) => res.json());
};

// edit an appointment
export const updateAppointment = (id, appointment) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(appointment),
    });
};

// cancel appointment
export const cancelAppointment = (id) => {
    return fetch(`${_apiUrl}/cancel/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    });
};