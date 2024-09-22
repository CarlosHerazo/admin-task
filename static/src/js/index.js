import { ApiRestTask } from "./api.js";
export const RES_READ = async () => {
    const user_id = document.querySelector("input[name='user_id']").value;
    const csrftoken = document.cookie.match(/csrftoken=([^;]*)/)[1];

    localStorage.csrftoken = csrftoken;
    localStorage.user_id = user_id;

    const containerCard = document.getElementById("card-container");
    const apirest = new ApiRestTask(user_id, null, csrftoken);

    try {
        const res = await apirest.read();
        // Limpiar el contenedor antes de agregar nuevas tarjetas
        containerCard.innerHTML = '';

        res.forEach(x => {
            const [color, text] = getColorAndText(x.state__name);
            const cardDiv = createCard(x, color, text);
            containerCard.appendChild(cardDiv);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    const card_task = document.querySelectorAll(".card_task")

    card_task.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(btn.id)
        })
    })
   
};

function getColorAndText(state) {
    switch (state) {
        case "scheduled": return ["orange", "orange"];
        case "to finish": return ["violet", "violet"];
        case "compliment": return ["green", "green"];
        case "expired": return ["red", "red"];
        default: return ["gray", "gray"];
    }
}

function createCard(x, color, text) {
    const cardDiv = document.createElement('div');
    cardDiv.id = x.id;
    cardDiv.className = "flex card_task flex-col m-6 bg-white shadow border border-slate-200 rounded-lg w-96 p-6 hover:shadow-lg cursor-pointer transition-colors duration-300";

    cardDiv.innerHTML = `
        <div class="flex  items-center mb-4 justify-between">
            <div class="flex items-center">
                <i class="fa-solid fa-pencil text-lg"></i>
                <h5 class="ml-3 text-slate-800 text-2xl font-semibold">${x.name}</h5>
            </div>
        </div>
        <p class="block text-slate-600 leading-normal font-light mb-4">${x.description}</p>
        <div class="flex justify-between items-center text-sm text-slate-500">
            <span class="bg-${color}-300 p-1 rounded-lg text-${text}-800">${x.state__name}</span>
            <span>${x.end_date}</span>
        </div>
    `;

    
    return cardDiv;
}




// Llama a RES_READ cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', RES_READ);
