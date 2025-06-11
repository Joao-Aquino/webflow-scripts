document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.getElementById("Email");
  if (!emailField) return;

  const form = emailField.closest("form"); // Ensures we get the correct form element
  if (!form) return;

  form.addEventListener(
    "submit",
    function (e) {
      const email = emailField.value.trim().toLowerCase();
      const invalidEndings = [".c", ".con", ".comm", ".cmo", ".cpm", ".cm"];

      for (const ending of invalidEndings) {
        if (email.endsWith(ending)) {
          e.preventDefault(); // Prevents form submission
          e.stopImmediatePropagation(); // Stops Webflow or any other script from continuing
          alert(
            "Please check if your email domain is correct. Did you mean '.com'?"
          );
          emailField.focus();
          return;
        }
      }
    },
    true
  ); // 'true' enables capturing before Webflow or other listeners
});
