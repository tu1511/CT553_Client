import createApiClient from "@services/api.service";

class authService {
  constructor(path = "/auth") {
    this.api = createApiClient(path);
  }

  async login(data) {
    return this.api.post("/login", data);
  }

  async register(data) {
    return this.api.post("/register", data);
  }

  async getLoggedInUser(accessToken) {
    const response = await this.api.get("/logged-in-account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}
export default new authService();
