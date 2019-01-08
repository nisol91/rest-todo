var urlApi = 'http://157.230.17.132:3/todos'

$(document).ready(function() {


  $('.my_button').click(function() {
    var inp = $('.my_input').val()
    console.log(inp);
    getData();

    $.ajax({
      url: urlApi,
      method: 'POST',
      data: {text: inp},
      success: function(data) {
        console.log(data);
      },
      error: function() {

      }
    })
  });


  function getData() {
    $.ajax({
      url: urlApi,
      method: 'GET',
      success: function(data) {
        console.log(data);
        printData(data)
      },
      error: function() {

      }
    })
  }


  function printData(obj) {
    for (var i = 0; i < obj.length; i++) {
      $('.list').append('<div>' + '<span>Id: ' + obj[i].id + '>> </span>' + obj[i]['text'] + '</div> X </span>')
    }
  }

});
