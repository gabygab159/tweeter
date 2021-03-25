$(document).ready(function () {
  document
    .querySelector(".textArea")
    .addEventListener("keyup", function (event) {
      let counter = $(this).parent().children().find(".counter");

      let counterValUpdate = $(counter).val(140 - $(this).val().length);
      counterValUpdate;

      if (counterValUpdate.val() < 0) {
        $(counter).css("color", "red");
      } else {
        $(counter).css("color", "black");
      }
    });
});
