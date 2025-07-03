import axios from "axios";

const API=axios.create({
    baseURL:"https://skillforge-backend-apz3.onrender.com/api/auth",
})

export const register=(userData)=>API.post('/register',userData)
export const login=(userData)=>API.post('/login',userData)