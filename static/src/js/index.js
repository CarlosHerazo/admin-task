import { ApiRestTask } from "./api.js";

export const RES_READ = async () => {
  const user_id = document.querySelector("input[name='user_id']").value;
  let csrftoken = document.cookie.replace(
      /(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
  );

  localStorage.csrftoken = csrftoken;
  localStorage.user_id = user_id;

  const containerCard = document.getElementById("card-container");
  const apirest = new ApiRestTask(user_id, null, csrftoken);

  // Esperar la respuesta de read()
  let res = await apirest.read();

  // Limpiar el contenedor antes de agregar nuevas tarjetas
  containerCard.innerHTML = '';

  // Mapeamos los datos
  res.map((x) => {
      let color, text;

      switch (x.state__name) {
          case "scheduled":
              color = "orange";
              text = "orange";
              break;
          case "to finish":
              color = "violet";
              text = "violet";
              break;
          case "compliment":
              color = "green";
              text = "green";
              break;
          case "expired":
              color = "red";
              text = "red";
              break;
          default:
              color = "gray"; // Color por defecto
              text = "gray";
      }

      let cardDiv = document.createElement('div');
      cardDiv.id = x.id;
      cardDiv.className = "flex flex-col m-6 bg-white shadow border border-slate-200 rounded-lg w-96 p-6 hover:shadow-lg cursor-pointer transition-colors duration-300";
      
      cardDiv.innerHTML = `
          <div class="flex items-center mb-4">
              <i class="fa-solid fa-pencil text-lg"></i>
              <h5 class="ml-3 text-slate-800 text-2xl font-semibold">${x.name}</h5>
          </div>
          <p class="block text-slate-600 leading-normal font-light mb-4">${x.description}</p>
          <div class="flex justify-between items-center text-sm text-slate-500">
              <span class="bg-${color}-300 p-1 rounded-lg text-${text}-800">${x.state__name}</span>
              <span>${x.end_date}</span>
          </div>
      `;
      
      containerCard.appendChild(cardDiv);
  });
};

// Llama a RES_READ cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', RES_READ);

