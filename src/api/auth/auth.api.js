import Swal from "sweetalert2";
import BaseAPI from "../BaseApi";

export class AuthAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }
  async googleSignIn(user) {

    const {name, picture, email} = user;
    const data = {username: name, avatar:picture, email, authentication_method: 'google', created_date: new Date()};

    const response = await this._baseApi.post('/auth/google',data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
        localStorage.setItem('token', JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify({name, picture, email}));
      return response.data;
    }else {
        Swal.fire({
            icon: "error",
            title: "Authentication Error!",
            text: response.data.message,
          });
          return null;
    }
  }

  async register(user) {
    const {name, email, password} = user;
    const data = {username: name, password:password, email:email, authentication_method: 'email', created_date: new Date()};

    const response = await this._baseApi.post('/auth/register', data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
        localStorage.setItem('token', JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify({name, picture:null, email}));
        return response.data;
    }else {
        Swal.fire({
            icon: "error",
            title: "Authentication Error!",
            text: response.data.message,
          });
          return null;
    }
  }

    async login(user) {
        const {email, password} = user;
        const data = {password:password, email:email};
    
        const response = await this._baseApi.post('/auth/login', data);
        if(response.status === 200 && response.data.message ==="Success") {
            const res = response.data;
            localStorage.setItem('token', JSON.stringify(res));
            localStorage.setItem('user', JSON.stringify({name:res.username, picture:null, email}));
            
            return response.data;
        }else {
            Swal.fire({
                icon: "error",
                title: "Authentication Error!",
                text: response.data.message,
              });
              return null;

        }
    }
}