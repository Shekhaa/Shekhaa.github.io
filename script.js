// 1) EmailJS init – yahan apna public key lagao
(function () {
  emailjs.init({
    publicKey: "51MAJKgT5mcwlDeZg", // <- tumhara public key
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // year update for footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "Sending...";

    // 2) Yahan vo fields bhej rahe hain jo template me use ho rahe
    const data = {
      from_name: document.getElementById("name").value,   // {{from_name}}
      email: document.getElementById("email").value,       // {{email}}  (Reply To)
      message: document.getElementById("message").value,   // {{message}}
    };

    // 3) Yahan serviceID + templateID use ho raha hai
    emailjs
      .send("service_iabxg5n", "template_3smajth", data)
      .then(() => {
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        status.textContent = "Kuch galat ho gaya, later try karo.";
      });
  });
});
