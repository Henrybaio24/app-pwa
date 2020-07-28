/* const fechas = document.getElementsByClassName('tiempo');

moment.locale('es');

for (let fecha of fechas) {
    date = moment(fecha.innerHTML).fromNow();
    fecha.innerHTML = date;
}*/

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();

  $('.tiempo').each(function() {
    console.log($(this).text());
    date = moment($(this).text()).fromNow();
    $this.text(date);
  });

  $('.fancybox').fancybox();

});

