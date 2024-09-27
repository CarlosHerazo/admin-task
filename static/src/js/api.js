
// constantes para peticiones
export const URL_SERVER_API = 'http://127.0.0.1:8000/api_task/tasks'
export const URL_SERVER_API_READ = `${URL_SERVER_API}/read` 
export const URL_SERVER_API_CREATE = `${URL_SERVER_API}/create` 
export const URL_SERVER_API_UPDATE = `${URL_SERVER_API}/update`
export const URL_SERVER_API_DELETE = `${URL_SERVER_API}/delete`
export const CSRFTOKEN = localStorage.getItem("csrftoken")
export const USER_ID = localStorage.getItem("user_id")

export const  notyf = new Notyf({
    duration: 4000,
    position: {
      x: 'right',
      y: 'top',
    },
  });



// clase para peticion
export class ApiRestTask {
    constructor(id_user = null, task_id = null, csrftoken = null) {
        this.id_user = id_user;
        this.task_id = task_id;
        this.csrftoken = csrftoken;
    }

    
    // método para obtener los datos del backend que serán cargados al momento de renderizar el template 
    // (esto se ejecutará cada vez que el usuario esté en inicio)
    read() {
        // Send a GET request
        return axios({
            method: 'get',
            url: `${URL_SERVER_API_READ}/${this.id_user}`,
            responseType: 'json'
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error('Error al obtener datos:', error);
        });
    }

    // método para crear una nueva tarea
    create(data_form) {
        // Enviar una petición POSTx|

        return axios({
            method: 'post',
            url: `${URL_SERVER_API_CREATE}/`,
            data: data_form, 
            headers: {
                'X-CSRFToken': this.csrftoken
            }
        }).then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error('Error al mandar datos:', error);
        });
        
    }

    read_data(task_id) {
        //  
        return axios({
            method:'get',
            url: `${URL_SERVER_API_READ}/task/${task_id}`,
            responseType:'json'

        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error('Error al obtener datos:', error);
        });
    }
    // método para actualizar una tarea
    update(task_id, csrftoken) {
        // Implementación aquí
    }

    // método para eliminar una tarea
    delete(task_id) {
        // Implementación aquí
    }
}
