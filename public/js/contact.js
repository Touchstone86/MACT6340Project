(function () {
  "use strict";

  let form = document.querySelector("#contact-form");

  document.querySelector("#submit-form").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formValid = true;
    if (!form.checkValidity()) {
      formValid = false;
    }
    form.classList.add("was-validated");
    if (formValid) {
      sendTheEmail();
    }
  });

  function sendTheEmail() {
    let obj = {
      sub: "Someone submitted a contact form",
      txt: `${document.querySelector("#name").value} ${
        document.querySelector("#user_message").value
      }. They're email address is ${
        document.querySelector("#email").value
      }`,
    };

    fetch("/mail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((response) => {
        document.querySelector("#submit-form").innerHTML =
          response.result;
      })
      .then(() => {
        setTimeout(() => {
          document.querySelector("#submit-form").innerHTML = "";
        }, "5000");
      });
  }
})();
