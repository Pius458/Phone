import axios from "axios";
const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
     const response = await request;
    return response.data;
}

const update = async (id,updatedPerson) => {
    const request =  axios.put(`${baseUrl}/${id}`,updatedPerson)
        const response = await request;
    return response.data;
}

const deleting = async (id) => {
   const request= axios
         .delete(`${baseUrl}/${id}`)
    const response = await request;
    return response.status;
}

const create = async (newObject) => {
   const request= axios.post(baseUrl,newObject)
    const response = await request;
    return response.data;
}

export default {
    getAll,
    update,
    deleting,
    create
}