// 1. Initialize EmailJS with your public key
(function () {
  emailjs.init({
    publicKey: "51MAJKgT5mcwlDeZg", // <-- your public key
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // Set year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (status) status.textContent = "Sending your message...";

    const payload = {
      from_name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_iabxg5n", "template_3smajth", payload)
      .then(() => {
        if (status) status.textContent = "Thank you! Your message has been sent 🚀";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        if (status)
          status.textContent =
            "Kuch issue aa gaya. Please thodi der baad phir se try karo 🙏";
      });
  });
});
