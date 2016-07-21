$("#rock").click(function(){
	checkForWinner("rock")
})


$("#paper").click(function(){
	checkForWinner("paper")
})

$("#scissor").click(function(){
	checkForWinner("scissor")
})

var points = 0
var compPoints = 0

$('#compRock').hide()
$('#compPaper').hide()
$('#compScissor').hide()

var checkForWinner = function(choice){
	var rand =  Math.floor((Math.random() * 3) + 0)
	console.log(rand)
	var compPicks = ["rock", "paper", "scissor"]
	var compPick = compPicks[rand] // chooses r, p, or s
	// show what computer picked
	$('#contain').hide()
	$('#text').text("Computer has chosen")
	$('#comp' + compPick.charAt(0).toUpperCase() + compPick.slice(1)).show()
	console.log("#comp" + compPick)
	setTimeout(function(){
		if(compPick === "rock"){
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
		} else if(compPick === "paper"){
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
		$('#comp' + compPick.charAt(0).toUpperCase() + compPick.slice(1)).hide()
	}, 1500)
}