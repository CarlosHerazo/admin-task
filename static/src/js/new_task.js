import { ApiRestTask,CSRFTOKEN,URL_SERVER_API_READ,USER_ID,notyf } from "./api.js";
import { RES_READ } from "./index.js";
import {modalTask  } from "./modal_task.js";
document.querySelector('form').addEventListener('submit', async e => {
    const loading = document.getElementById('loadingIndicator');
    const modal_task = document.getElementById('modal_task')
    e.preventDefault(); // Previene el envío predeterminado del formulario

    // Muestra el indicador de carga
    loading.classList.remove('hidden');
    modal_task.classList.toggle('opacity-50')
    // Desactiva la interacción con el formulario
    e.target.setAttribute('inert', true);

    // Recopila los datos del formulario
    const data = Object.fromEntries(new FormData(e.target));

    // Enviar una petición POST
    const apiRest = new ApiRestTask(USER_ID, null, CSRFTOKEN);
    const res = await apiRest.create(data);

    // Manejo de la respuesta
    if (res.message !== "") {
        await RES_READ(); 
        // Mostrar una notificación compacta
        notyf.success(res.message);
        modalTask.classList.toggle('hidden'); 
        // Oculta el indicador de carga
        loading.classList.add('hidden');
        document.querySelector('form').reset(); 
        modal_task.classList.remove('opacity-50')
            // Reactiva la interacción con el formulario
        e.target.removeAttribute('inert');
    }else{
        notyf.success("ocurrio un error en el proceso");
        modalTask.classList.toggle('hidden'); 
        // Oculta el indicador de carga
        loading.classList.add('hidden');
        document.querySelector('form').reset(); 
            // Reactiva la interacción con el formulario
        e.target.removeAttribute('inert');
        modal_task.classList.remove('opacity-50')
    }
});
 