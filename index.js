$(document).ready(function() {
    spinnerNumber();
    eventBtnSpinner();

    $(window).scroll(function() {
      $('#container_float_total').removeClass('d-none');
      if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('#container_float_total').addClass('d-none');
      }
   });

});

function spinnerNumber(){
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
}
function eventBtnSpinner(){
  $('body').find('.quantity-up').on('click', function(){
    precioxLeccion($(this),'add');
    cantPedido($(this));
    totalPedido($(this));
    totalPedidoGnrl();
  });

  $('body').find('.quantity-down').on('click', function(){
    precioxLeccion($(this),'rest');
    cantPedido($(this));
    totalPedido($(this));
    totalPedidoGnrl();
  });
}
function precioxLeccion(div,opc){
  let cant = div.parent().parent().find('input.style-cant-pedido');
  let precio = div.parent().parent().find('span');
  let result = div.parent().parent().parent().parent().parent().find('.total-precio');

  if(opc == 'add'){
    result.text( precio.text() * cant.val() );
  }
  else{
    if(cant.val() == 0){
      result.text(0);
    }
    else{
      result.text( result.text() - precio.text() );
    }
  }
  
}
function cantPedido(content){
  let total = 0;
  let cant = content.parent().parent().parent().parent().parent().parent().parent();
  cant.find('.style-cant-pedido').each(function(){
    total += parseFloat($(this).val());
  });

  cant.find('.total-cant h5').text(total);
}
function totalPedido(content){
  let total = 0;
  let totalP = content.parent().parent().parent().parent().parent().parent().parent();
  totalP.find('.total-precio').each(function(){
    total += parseFloat($(this).text());
  });

  totalP.find('.total-pedido').text(total);
}
function totalPedidoGnrl(){
  let total = 0;
  $('.total-pedido').each(function(){
    total += parseFloat($(this).text());
  });

  $('#total_pedido_float').text(total);
}