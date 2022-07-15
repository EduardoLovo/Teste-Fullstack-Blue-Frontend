import { JwtHandler } from "../jwt-handler/jwt-handler";

export const Api = {
    baseUrl: "http://localhost:3000",

    // Rota Login
    loginUrl: () => Api.baseUrl + "/login/",

    // Rotas Usuarios
    createUsuariosUrl: () => Api.baseUrl + "/auth/register",

    readAllUrl: () => Api.baseUrl + "/task",

    readByIdUrl: id => Api.baseUrl + "/task/getById/" + id,

    createTaskUrl: () => Api.baseUrl + "/task/create",

    updateUrl: id => Api.baseUrl + "/task/updateOne/" + id,

    deleteUrl: id => Api.baseUrl + "/task/deleteOne/" + id,

    // Auth Header

    authHeader: () => ({
        Authorization: "Bearer " + JwtHandler.getJwt(),
    }),

    // GET
    buildApiGetRequest: (url, auth) =>
        fetch(url, {
            method: "GET",
            headers: auth ? new Headers(Api.authHeader()) : undefined,
        }),


    // POST
    buildApiPostRequest: (url, body, auth) =>
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",

                ...(auth ? Api.authHeader() : {}),
            }),
            body: JSON.stringify(body),
        }),

    // PATCH
    buildApiPatchRequest: (url, body, auth) =>
        fetch(url, {
            method: "PATCH",
            headers: new Headers({
                "Content-type": "application/json",
                ...(auth ? Api.authHeader() : {}),
            }),
            body: JSON.stringify(body),
        }),

    // DELETE
    buildApiDeleteRequest: (url, auth) =>
        fetch(url, {
            method: "DELETE",
            headers: auth ? new Headers(Api.authHeader()) : undefined,
        }),
}