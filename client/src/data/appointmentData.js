const _apiUrl = "/api/appointments";

// get all appointments
export const getAppointments = () => {
    return fetch(_apiUrl).then((r) => r.json());
};
