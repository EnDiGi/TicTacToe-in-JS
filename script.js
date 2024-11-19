
const players = ["X", "O"]
let curr_player = players[Math.random() <= 0.5 ? 0 : 1]
let turn = curr_player === "X" ? 0 : 1
let match_state = "not finished"
let buttons = Array.from(document.getElementsByClassName("button"))
let win = false;

document.getElementById("turn-info").textContent = `${curr_player}'s turn`

function get_current_diff(){
	return document.querySelector('input[name = "difficulty"]:checked').value
}

function check_winner(buttons){
	let full_cells = 0;

	winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
					  [0, 3, 6], [1, 4, 7], [2, 5, 8],
					  [0, 4, 8], [2, 4, 6]]

	for(let win_combo of winning_combos){
		if(buttons[win_combo[0]].textContent === buttons[win_combo[1]].textContent && 
		   buttons[win_combo[0]].textContent === buttons[win_combo[2]].textContent &&
		   buttons[win_combo[0]].textContent !== " " &&
		   buttons[win_combo[1]].textContent !== " " &&
		   buttons[win_combo[2]].textContent !== " "){
			win = true;
			if(buttons[win_combo[0]].textContent === "O"){
				return "win O"
			} else{
				return "win X"
			}
		}
	}

	buttons.forEach((element) => {if(element.textContent !== " "){full_cells += 1}})
	if(!win && full_cells === 9){
		return "tie"
	}

	return "not finished"
}

function make_move(pos_number){
	if(win){
		return
	}
	let button = Array.from(document.getElementsByClassName("button"))[pos_number]

	if(button.textContent !== " "){
		return
	}

	button.style.color = curr_player === "X" ? "red" : "blue"
	button.textContent = curr_player

	
	turn += 1
	curr_player = players[turn % 2]	
	document.getElementById("turn-info").textContent = `${curr_player}'s turn`

	match_state = check_winner(buttons)
	if(match_state === "win O"){
		document.getElementById("turn-info").textContent = "O wins!"
	} else if(match_state === "win X"){
		document.getElementById("turn-info").textContent = "X wins!"
	} else if(match_state === "tie"){
		document.getElementById("turn-info").textContent = "Tie!"
	}
}