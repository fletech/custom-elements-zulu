class ServicesGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.services = []; // Array para almacenar los servicios
  }

  // Método para actualizar los servicios
  setServices(servicesData) {
    this.services = servicesData;
    this.render(); // Vuelve a renderizar con los nuevos datos
  }

  connectedCallback() {
    this.render();

    // Escuchar mensajes con nuevos datos
    window.addEventListener("message", (event) => {
      if (event.data && Array.isArray(event.data)) {
        this.setServices(event.data);
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    padding: 12px;
                }

                .service-card {
                    background: #ffffff;
                    border: 1px solid #eaeaea;
                    border-radius: 8px;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                }

                .service-name {
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin-bottom: 8px;
                }

                .service-description {
                    font-size: 0.9rem;
                    color: #666;
                    flex-grow: 1;
                }

                .service-price {
                    font-weight: 500;
                    margin: 8px 0;
                }

                .book-button {
                    background: #000;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 8px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .book-button:hover {
                    background: #333;
                }

                @media (max-width: 1024px) {
                    .services-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 640px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <div class="services-grid">
                ${
                  this.services.length
                    ? this.services
                        .map(
                          (service) => `
                        <div class="service-card">
                            <h3 class="service-name">${
                              service.serviceName || "Sin nombre"
                            }</h3>
                            <p class="service-description">${
                              service.description || "Sin descripción"
                            }</p>
                            <p class="service-price">${
                              service.priceSummary ||
                              `${service.priceAmount || 0} ${
                                service.currency || "DKK"
                              }`
                            }</p>
                            <button class="book-button" onclick="window.location.href='${
                              service.bookingsFlowEntryUrl || "#"
                            }'">
                                Reservar ahora
                            </button>
                        </div>
                    `
                        )
                        .join("")
                    : "<div>No hay servicios disponibles</div>"
                }
            </div>
        `;
  }
}

customElements.define("services-grid", ServicesGrid);

export default ServicesGrid;
