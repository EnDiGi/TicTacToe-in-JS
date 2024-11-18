
const players = ["X", "O"]
let curr_player = players[Math.random() <= 0.5 ? 0 : 1]
let turn = curr_player === "X" ? 0 : 1

document.getElementById("turn_info").textContent = `${curr_player}'s turn`

function get_current_diff(){
	return document.querySelector('input[name = "difficulty"]:checked').value
}

function make_move(pos_number){
	button = Array.from(document.getElementsByClassName("button"))[pos_number]

	if(button.textContent !== " "){
		return
	}

	button.style.color = curr_player === "X" ? "red" : "blue"
	button.textContent = curr_player

	
	turn += 1
	curr_player = players[turn % 2]	
	document.getElementById("turn_info").textContent = `${curr_player}'s turn`
}