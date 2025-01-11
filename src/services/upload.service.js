import createApiClient from "@services/api.service";

class uploadService {
  constructor(path = "/upload") {
    this.api = createApiClient(path);
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await this.api.post("/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

export default new uploadService();
