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
        console.log(data);
      },
      error: function() {
        alert('errore');
      }
    })
    getData();
  });
//-------------------delete
$(document).on('click', '.list .fa-times', function() {//NB!!!! sono elemeni appesi, bisogna usare on
  $('.list').addClass('bordo')

  var identifier = $(this).index()
  console.log(identifier);

  // $.ajax({
  //   url: urlApi,
  //   method: 'DELETE',
  //   data: {
  //     id: identifier,
  //   },
  //   success: function(data) {
  //     console.log(data);
  //   },
  //   error: function() {
  //     alert('errore');
  //   }
  // })
  getData()
});
  //-------------------update
    // $('my_button_iii').click(function() {
    //   $('.list').addClass('bordo')
    //   $.ajax({
    //     url: urlApi,
    //     method: 'UPDATE',
    //     data: {
    //       id:
    //     },
    //     success: function(data) {
    //       console.log(data);
    //     },
    //     error: function() {
    //       alert('errore');
    //     }
    //   })
    //   getData()
    // });




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
      // $('.list').append('<div> - ' + ' <span id="deletes">x</span> ' + obj[i].text + '</div>')
      var elem_copy = $('.templates .list_elem').clone()
      console.log(elem_copy);
      console.log(obj[i].text);
      $('.list').append(elem_copy)
      elem_copy.find('input').val('- ' + obj[i].text + '  (id =' + obj[i].id + ')')
    }
  }

});
