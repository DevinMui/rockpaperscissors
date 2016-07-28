/*
 *
 * Server side code for multiplayer
 *
 */ 
var picked = false
var pick;
var other;

var socket = io.connect()

var client;
console.log(client)

socket.on('id', function(data){
	if(client === undefined){
		client = data
	}
})

socket.on('message', function(data){
	console.log(data)
	var data = data.split(" ") 
	var player = data[0] // gets the id of user
	var choice = data[1] // gets the choice of user
	if(player != client){
		other = choice
	}
	if(picked){
		checkForWinner(pick, other)
	}
})

/*
 *
 * Client side code for normal play
 *
 */

$("#rock").click(function(){
	pick = "rock"
	picked = true
	$('#contain').hide()
	socket.emit('message', client + " " + pick)
})


$("#paper").click(function(){
	pick = "paper"
	picked = true
	$('#contain').hide()
	socket.emit('message', client + " " + pick)
})

$("#scissor").click(function(){
	pick = "scissor"
	picked = true
	$('#contain').hide()
	socket.emit('message', client + " " + pick)
})

$('#replay').hide()

var points = 0
var compPoints = 0

$('#compRock').hide()
$('#compPaper').hide()
$('#compScissor').hide()


var checkForWinner = function(choice, choice_2){
	if(points < 1 && compPoints < 1){
		// show what player picked
		$('#text').text("Player has chosen")
		$('#comp' + choice_2.charAt(0).toUpperCase() + choice_2.slice(1)).show()
		setTimeout(function(){
			if(choice_2 === "rock"){
				if(choice === "paper"){
					// you win
					$('#text').text("You win")
					points += 1
				} else if(choice === "scissor"){
					// you lose
					$('#text').text("You lose")
					compPoints += 1
				} else {
					// tie
					$('#text').text("Tie")
				}
			} else if(choice_2 === "paper"){
				if(choice === "scissor"){
					// you lose
					$('#text').text("You win")
					points += 1
				} else if(choice === "rock"){
					// you win
					$('#text').text("You lose")
					compPoints += 1
				} else {
					// tie
					$('#text').text("Tie")
				}
			} else {
				if(choice === "rock"){
					// you lose
					$('#text').text("You win")
					points += 1
				} else if(choice === "paper"){
					// you win
					$('#text').text("You lose")
					compPoints += 1
				} else {
					// tie
					$('#text').text("Tie")
				}   
			}
			$('#contain').show()
			$('#points').text(points)
			$('#compPoints').text(compPoints)
			$('#comp' + choice_2.charAt(0).toUpperCase() + choice_2.slice(1)).hide()
		}, 1500)
	} else if(points >= 1){
		$('#rock').hide()
		$('#paper').hide()
		$('#scissor').hide()
		$('body').css('background-image', 'url(images/firework.gif)')
		var audio = document.getElementById("audio")
		audio.play()
		$('#replay').show()
	} else {
		$('#rock').hide()
		$('#paper').hide()
		$('#scissor').hide()
		window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	}
}

$('#replay').click(function(){
	location.reload()
})
