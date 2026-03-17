const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("is-open", !isExpanded);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

const printPageButton = document.querySelector("[data-print-page]");
const savePdfButton = document.querySelector("[data-save-pdf]");

if (printPageButton) {
  printPageButton.addEventListener("click", () => {
    window.print();
  });
}

if (savePdfButton) {
  savePdfButton.addEventListener("click", () => {
    window.print();
  });
}

const contactForm = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");

if (contactForm && statusMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const requiredFields = ["nombre", "correo", "telefono", "mensaje"];
    const missingField = requiredFields.find((field) => !String(formData.get(field) || "").trim());

    if (missingField) {
      statusMessage.textContent = "Por favor completa todos los campos obligatorios.";
      statusMessage.className = "form-status is-error";
      return;
    }

    const email = String(formData.get("correo") || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      statusMessage.textContent = "Por favor escribe un correo valido.";
      statusMessage.className = "form-status is-error";
      return;
    }

    const nombre = String(formData.get("nombre") || "").trim();
    const empresa = String(formData.get("empresa") || "").trim() || "No especificada";
    const telefono = String(formData.get("telefono") || "").trim();
    const mensaje = String(formData.get("mensaje") || "").trim();

    const subject = encodeURIComponent(`Nuevo mensaje de ${nombre}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${nombre}`,
        `Correo: ${email}`,
        `Empresa: ${empresa}`,
        `Telefono: ${telefono}`,
        "",
        "Mensaje:",
        mensaje
      ].join("\n")
    );

    window.location.href = `mailto:wevtor@gmail.com?subject=${subject}&body=${body}`;
    statusMessage.textContent = "Se abrio tu aplicacion de correo con el mensaje listo para enviarse.";
    statusMessage.className = "form-status is-success";
  });
}
