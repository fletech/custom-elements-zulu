import styles from "../styles/services-grid.css";

class ServicesGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.servicesData = null;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const heightInPixels = Math.ceil(entry.contentRect.height);
        console.log("Nueva altura detectada:", heightInPixels);

        window.parent.postMessage(
          {
            type: "resize",
            height: heightInPixels,
          },
          "*"
        );
      }
    });
  }

  connectedCallback() {
    this.render();
    this.setupMessageListener();
    window.parent.postMessage("READY", "*");
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  // Método para uso directo
  setServices(data) {
    console.log("setServices called with:", data);
    this.servicesData = data;
    this.renderServices();
  }

  setupMessageListener() {
    window.addEventListener("message", (event) => {
      console.log("Message received:", event.data);

      if (event.data && Array.isArray(event.data)) {
        this.servicesData = event.data;
        this.renderServices();
      }
    });
  }

  renderServices() {
    if (!this.servicesData || !Array.isArray(this.servicesData)) return;

    const container = this.shadowRoot.querySelector(".services-grid");
    if (!container) return;

    container.innerHTML = "";

    this.servicesData.forEach((service) => {
      if (!service) return;

      const card = document.createElement("div");
      card.className = "service-card";

      const serviceName = service.serviceName || "No name";
      const description = service.description || "No description available";
      const price =
        service.priceSummary ||
        `${service.priceAmount || 0} ${service.currency || "DKK"}`;
      const bookingUrl = service.bookingsFlowEntryUrl || "#";

      card.innerHTML = `
                <h3 class="service-name">${serviceName}</h3>
                <p class="service-description">${description}</p>
                <p class="service-price">${price}</p>
                <button class="book-button" onclick="window.location.href='${bookingUrl}'">
                    Book now
                </button>
            `;

      container.appendChild(card);
    });

    this.resizeObserver.observe(container);
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="services-grid" id="servicesContainer">
                <div class="loading">Loading services...</div>
            </div>
        `;
  }
}

customElements.define("services-grid", ServicesGrid);

export default ServicesGrid;
