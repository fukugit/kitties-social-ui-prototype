import apiClient from "@/lib/api"

export const pedigreeUpload = async (formData) => {
    return apiClient.post('/file/pedigree', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
}