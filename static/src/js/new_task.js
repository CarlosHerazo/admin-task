import { ApiRestTask,CSRFTOKEN,URL_SERVER_API_READ,USER_ID,notyf } from "./api.js";
import { RES_READ } from "./index.js";
import {modalTask  } from "./modal_task.js";

document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // Enviar una petición POST
    const apiRest = new ApiRestTask(USER_ID, null, CSRFTOKEN);
    const res = await apiRest.create(data);
    
    if (res.message !== "") {
        
        await RES_READ(); 
        // Mostrar una notificación compacta
        notyf.success(res.message);
        modalTask.classList.toggle('hidden')
    }
});