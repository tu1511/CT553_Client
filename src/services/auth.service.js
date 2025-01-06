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
}
export default new authService();
