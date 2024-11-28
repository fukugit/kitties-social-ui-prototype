import apiClient from "@/lib/api"

export const userLogin = async (mail, password) => {
    return apiClient.post('/auth', {
        id: mail,
        pw: password
      });
}