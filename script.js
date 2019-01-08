var urlApi = 'http://157.230.17.132:3017/todos'

$(document).ready(function() {
//-------------------only to view list
  $('.my_button_ii').click(function() {
    $('.list').addClass('bordo')

    getData()
  });
//-------------------post
  $('.my_button').click(function() {

    $('.list').addClass('bordo')

    var inp = $('.my_input').val()
    console.log(inp);
    //a ogni click mi ricrea tutta la lista ripescandola dal server. Ho messo la chiamata in questa funzione.
    //in pratica, ogni volta che faccio qualcosa, mi richiama tutta la lista modificata con post, update e delete,
    //e me la ristampa con la funzione printData

    $.ajax({
      url: urlApi,
      method: 'POST',
      //quando faccio POST, devo sempre mettere dei data da salvare nel server
      data: {
        text: inp,
      },
      success: function(data) {
        getData();
        //NB!!!! questa chiamata ajax che riaggiorna la lista va sempre nel success, non dopo o prima la chiamata
      },
      error: function() {
        alert('errore');
      }
    })
  });
//-------------------delete




$(document).on('click', '.list .fa-times', function() {//NB!!!! sono elemeni appesi, bisogna usare on
  $('.list').addClass('bordo')


//questa e' la forma per cancellare: innanzitutto aggiungo /id nell url, e per portare dentro l id lo prendo da attr
  var identifier = $(this).siblings('h4').find('span').attr('data_id')
  console.log(identifier);

  $.ajax({
    url: urlApi +'/'+ identifier,
    method: 'DELETE',
    success: function(data) {
      getData();
      //NB!!!! questa chiamata ajax che riaggiorna la lista va sempre nel success, non dopo o prima la chiamata
    },
    error: function() {
      alert('errore');
    }
  })
});
  //-------------------update
  $(document).on('click', '.my_button_iii', function() {

      console.log($(this).siblings('.elem_input').val());
      $('.list').addClass('bordo')
      $.ajax({
        url: urlApi,
        method: 'PUT',
        data: {
          text: $(this).siblings('.elem_input').val()
        },
        success: function(data) {
          console.log(data);
          getData()
        },
        error: function() {
          alert('errore');
        }
      })
    });




//funzioni-----------------------

  function getData() {
    $.ajax({
      url: urlApi,
      method: 'GET',
      success: function(data) {
        console.log(data);
        printData(data)
      },
      error: function() {
        alert('errore');
      }
    })
  }



  function printData(obj) {
    //prima di stampare azzero il contenuto dell html se no non sostituisce ma aggiunge sempre contenuto sotto
    $('.list').html('')

    for (var i = 0; i < obj.length; i++) {
      var elem_copy = $('.templates .list_elem').clone()
      $('.list').append(elem_copy)
      elem_copy.find('input').val('- ' + obj[i].text)
      elem_copy.find('h5').text('  (data_id =' + obj[i].id + ')')
      elem_copy.find('h4').html('<span data_id="' + obj[i].id + '"></span>')
    }
  }

});
