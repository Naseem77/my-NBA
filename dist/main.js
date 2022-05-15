$(".container").on('click','#btn',function(){
    getPlayers()
})
const getPlayers = function(){
  $('#res').empty()
   let value = $("#inputName").val();
    $.get(`teams/${value}`, function(players){
        render(players);
    })  
}

$(".container").on('click','#btn2',function(){
    $('#res').empty()
    $.get(`dreamTeam`, function(players){
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

$(document).on('click', '.image', function () {
  let first = $(this).closest(".player-container").find("#first")[0].innerHTML;
  let jer = $(this).closest(".player-container").find("#jer")[0].innerHTML;
  let image = $(this).closest(".image")[0].currentSrc;
  let position = $(this).closest(".player-container").find("#pos")[0].innerHTML;

  $.post('/addPlayer', {firstName: first, jersey: jer, img: image, pos: position}, function(response){
    getPlayers()
  })
  alert("player has been added to your dream team")
});