const _apiUrl = "/api/appointments";

// get all appointments
export const getAppointments = () => {
    return fetch(_apiUrl).then((r) => r.json());
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