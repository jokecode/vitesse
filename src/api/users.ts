import http from '~/utils/http'

export default {
  crud: {
    url: '/users',
    async getUsers(params: any) {
      return await http.get(this.url, { params })
    },
    async getUserInfo(data: any) {
      return await http.post(`${this.url}/info`, { data })
    },
    async getUserByName(username: string) {
      return await http.get(`${this.url}/${username}`)
    },
    async updateUser(username: string, data: any) {
      return await http.put(`${this.url}/${username}`, { data })
    },
    async deleteUser(username: string) {
      return await http.delete(`${this.url}/${username}`)
    },
    async login(data: any) {
      return await http.post(`${this.url}/login`, { data })
    },
    async logout() {
      return await http.post(`${this.url}/logout`)
    },
    async register(data: any) {
      return await http.post(`${this.url}/register`)
    },
  },
}
