
const players = ["X", "O"]
let curr_player = players[Math.random() <= 0.5 ? 0 : 1]

document.getElementById("turn_info").textContent = `${curr_player}'s turn`

function get_current_diff(){
	return document.querySelector('input[name = "difficulty"]:checked').value
}

