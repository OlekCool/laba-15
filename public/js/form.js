//USER_FORM
$(document).ready(function () {
  let modal = $("#myModal"); // Overlay
  let btn = $("#myBtn"); // Кнопка, яка відкриває віконце
  let span = $(".close"); //<span>, який закриває віконце

  // Коли користувач натиснув кнопку, відображаємо віконце
  btn.click(function () {
    modal.show(2000);
  });

  // Коли користувач натиснув <span> (x), приховуємо віконце
  span.click(function () {
    modal.hide(2000);
  });
});

//VALIDATION FOR FORM REGISTRATION
$(document).ready(function () {
  $("#regform").validate({
    rules: {
      username: "required",
      password: {
        required: true,
        strongPassword: true,
        minlength: 8,
      },
      aboutyou: {
        required: true,
        minlength: 15,
      },
      gender: "required",
      oblast: "required",
      date: "required",
    },
    messages: {
      username: "Будь ласка, введіть ваше ім'я",
      password: {
        required: "Будь ласка, введіть пароль",
        strongPassword:
          "Пароль має містити цифри, літери верхнього та нижнього регістру та спеціальні символи.",
        minlength: "Пароль має бути 8 символів і більше",
      },
      aboutyou: "Будь ласка, введіть інформацію про себе",
      gender: "Будь ласка, оберіть вашу стать",
      oblast: "Будь ласка, оберіть ваш регіон",
      date: "Будь ласка, введіть вашу дату народження",
    },
    submitHandler: function (form) {
      // Тут можна виконати додаткові дії перед відправленням форми, якщо потрібно
      form.submit();
    },
  });
});

$.validator.addMethod(
  "strongPassword",
  function (value, element) {
    return (
      this.optional(element) ||
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        value
      )
    );
  },
  "Пароль повинен містити цифри, літери верхнього та нижнього регістрів і спеціальні символи"
);

//CALCULATION_FORM
let radius_field = document.getElementById("radius");
let height_field = document.getElementById("height");
let result_field = document.getElementById("result");
let checkbox_info = document.getElementById("addinfo");
let btn_calc = document.getElementById("calc");
let btn_clear = document.getElementById("clear");
let checkbox = document.getElementById("addinfo");
let addinfotext = document.getElementById("additionalinfo");
let square_surf;

btn_calc.onclick = function () {
  let radius = parseFloat(radius_field.value);
  let height = parseFloat(height_field.value);

  let radius_error = document.getElementById("radius_error");
  let height_error = document.getElementById("height_error");

  radius_error.textContent = "";
  height_error.textContent = "";

  if (isNaN(radius) || radius <= 0 || isNaN(height) || height <= 0) {
    if (isNaN(radius) || radius <= 0) {
      radius_error.textContent = "Поле radius має бути числом, яке більше 0";
      radius_field.classList.add("wrong_radius");
      result_field.value = "";
    }
    if (isNaN(height) || height <= 0) {
      height_error.textContent = "Поле height має бути числом, яке більше 0";
      height_field.classList.add("wrong_height");
      result_field.value = "";
    }
  } else {
    radius_field.classList.remove("wrong_radius");
    height_field.classList.remove("wrong_height");
    radius_error.textContent = "";
    height_error.textContent = "";

    square_surf = (2 * Math.PI * radius * (height + radius)).toFixed(2);
    result_field.value = square_surf;
  }
};

btn_clear.onclick = function () {
  radius_field.value = "";
  height_field.value = "";
  result_field.value = "";
  height_error.textContent = "";
  radius_error.textContent = "";
  radius_field.classList.remove("wrong_radius");
  height_field.classList.remove("wrong_height");
  checkbox.checked = false;
  addinfotext.style.display = "none";
};

function toggleInfo() {
  addinfotext.style.display = checkbox.checked ? "block" : "none";
}

//FEEDBACK VALIDATION
$(document).ready(function () {
  // Валідація форми реєстрації
  $("#feedback_form").validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true,
      },
      topic: {
        required: true,
        minlength: 10,
      },
      this_text: {
        required: true,
        minlength: 10,
      },
    },

    messages: {
      name: "Будь ласка, введіть ваше ім'я",
      email: "Будь ласка, введіть коректну електронну адресу",
      topic: {
        required: "Будь ласка, введіть пароль",
        minlength: "Ваша тема повинна бути не менше 10 символів",
      },
      this_text: {
        required: "Будь ласка, введіть текст повідомлення",
        minlength: "Текст повідомлення повинен бути не менше 10 символів",
      },
    },

    submitHandler: function (form) {
      $(form).fadeOut(500, function () {
        $("<p>Ваше повідомлення успішно відправлено!</p>")
          .insertAfter(form)
          .fadeIn(500);
      });
      return false; // Забороняє стандартну подію відправлення форми
    },
  });
});
