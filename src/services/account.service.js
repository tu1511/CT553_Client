import createApiClient from "@services/api.service";

class accountService {
  constructor(path = "/account") {
    this.api = createApiClient(path);
  }

  async getLoggedInUser(accessToken) {
    const response = await this.api.get("/logged-in-account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async updateInformation(data, accessToken) {
    const response = await this.api.put("/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Dữ liệu trả về từ API cập nhật:", response.data); // Kiểm tra API phản hồi
    return response.data;
  }

  async changePassword(data, accessToken) {
    const response = await this.api.put("/password", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}
export default new accountService();
