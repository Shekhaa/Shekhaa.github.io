// --- EmailJS + Theme Switch ---

// EmailJS init – tumhara public key
(function () {
  emailjs.init({
    publicKey: "51MAJKgT5mcwlDeZg",
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // Set year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Theme switch
  const themeSelect = document.getElementById("theme-select");
  const body = document.body;

  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      // value: netflix | cyberpunk | minimal
      body.setAttribute("data-theme", value);
    });
  }

  // Contact form + EmailJS
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (status) status.textContent = "Sending your message...";

      const templateParams = {
        from_name: document.getElementById("name").value,
        reply_to: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send("service_iabxg5n", "template_3smajth", templateParams)
        .then(() => {
          if (status) status.textContent = "Thanks! Your message has been sent ✅";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          if (status)
            status.textContent =
              "Oops, something went wrong. Please try again or email me directly.";
        });
    });
  }
});
