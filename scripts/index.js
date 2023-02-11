import { lista_destino, lista_origen } from "./data.js";

const SET_ELEMENTOS = {
    init() {
        this.setSelects();
    },
    setSelects() {
        let html = "";

        lista_origen.forEach((e) => {
            html += `<option value="${e.origen_id}">${e.origen_nombre}</option>`;
        });

        document.querySelector("#origen_id").innerHTML = html;
    }
};

const DOM_EVENTOS = {
    init() {
        this.listarDestinos();
    },
    listarDestinos() {
        document.querySelector("#origen_id").addEventListener("change", (evento) => {
            const origen_id = Number(evento.target.value);
            let html = "";

            if (!origen_id) {
                document.querySelector("#destinos").innerHTML = html;

                return false;
            }

            const destinos = lista_destino.filter(e => e.origen_id === origen_id);

            destinos.forEach(e => {
                let html_ventajas = "", html_desventajas = "";

                e.lista_ventajas.forEach(f => {
                    html_ventajas += `<li class="list-group-item fs-8 fst-italic fw-bold text-primary">${f}</li>`;
                });

                e.lista_desventajas.forEach(f => {
                    html_desventajas += `<li class="list-group-item fs-8 fst-italic fw-bold text-danger">${f}</li>`;
                });

                html += `
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <div class="card">
                        <div class="card-body">
                            <h1 class="card-title fs-4 mb-5">${e.destino_nombre}</h1>

                            <h2 class="card-subtitle fs-5 mb-2">Beneficios</h2>

                            <ul class="list-group mb-4">
                                ${html_ventajas}
                            </ul>

                            <h2 class="card-subtitle fs-5 mb-2">Perdidas</h2>

                            <ul class="list-group">
                                ${html_desventajas}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            });

            document.querySelector("#destinos").innerHTML = html;

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        });
    }
};

(() => {
    SET_ELEMENTOS.init();
    DOM_EVENTOS.init();
})();