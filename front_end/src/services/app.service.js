import http from "../http-common";

class AppDataService {
  getAll() {
    return http.get("/home/");
  }

  get(id) {
    return http.get(`/home/${id}`);
  }

  create(data) {
    return http.post("/home", data);
  }

  update(data) {
    return http.put(`/home/`, data);
  }

  deleteStocks(data) {
    return http.post(`/home/delete`, data);
  }

  deleteAll() {
    return http.delete(`/home`);
  }

  findByName(name) {
    return http.get(`/home/${name}`);
  }

  findStocks(data) {
    return http.post(`/home/graph`,data);
  }

  findTwoStocks(data){
    return http.post(`/home/twograph`,data); 
  }

  findMeta(data){
    return http.post(`/home/metastocks`,data);
  }

}

export default new AppDataService();