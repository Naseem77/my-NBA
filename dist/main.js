$(".container").on('click','#btn',function(){
    $('#res').empty()
   let value = $("#inputName").val();
    $.get(`teams/${value}`, function(players){
        render(players);
    })
   
})

const render = function(players) {
  $(".dataDiv").empty();
  const source = $("#players-template").html();
  const template = Handlebars.compile(source);
  const newHTML = template({players});

  $(".dataDiv").append(newHTML);
};
