
let players = Math.random() >= 0.5 ? ["X", "O"] : ["O", "X"]
let curr_player = players[0]
let turn = 0
let match_state = "not finished"
let buttons = Array.from(document.getElementsByClassName("button"))
let win = false;

document.getElementById("turn-info").textContent = `${curr_player}'s turn`

function restart_game(){

	players = Math.random() >= 0.5 ? ["X", "O"] : ["O", "X"]
	curr_player = players[0]
	turn = 0
	document.getElementById("turn-info").textContent = `${curr_player}'s turn`

	match_state = "not finished"
	win = false;

	buttons.forEach((element) => {
		element.textContent = " "
	})
}

function check_winner(buttons){
	let full_cells = 0;

	winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
					  [0, 3, 6], [1, 4, 7], [2, 5, 8],
					  [0, 4, 8], [2, 4, 6]]

	for(let win_combo of winning_combos){
		if(buttons[win_combo[0]].textContent === buttons[win_combo[1]].textContent && 
		   buttons[win_combo[0]].textContent === buttons[win_combo[2]].textContent &&
		   buttons[win_combo[0]].textContent !== " "){
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

function get_current_diff(){
	return document.querySelector('input[name = "difficulty"]:checked').value
}

function make_easy_move(buttons){
	
	try{
		let rand_pos = Math.floor(Math.random() * 9)

		if(buttons[rand_pos].textContent !== " "){
			make_easy_move(buttons)
		}
		make_move(rand_pos)

	} catch(RangeError){
		return;
	}
}

function make_medium_move(buttons){
	let rand_num = Math.random()

	if(rand_num > 0.15){
		make_hard_move(buttons)
	} else{
		make_easy_move(buttons)
	}
}

function minimax (is_max, buttons){
	
	let best_score = is_max ? -Infinity : Infinity;
	let score = 0;

	result = check_winner_minimax(buttons)

	if(result !== null){
		return result
	}

	if(is_max){
		for(let i = 0; i < 9; i++){
			if(buttons[i].textContent === " "){
				buttons[i].textContent = players[1]
				score = minimax(false, buttons)
				buttons[i].textContent = " "
				best_score = Math.max(best_score, score)
			}
		}
		return best_score
		
	} else {
		for(let i = 0; i < 9; i++){
			if(buttons[i].textContent === " "){
				buttons[i].textContent = players[0]
				score = minimax(true, buttons)
				buttons[i].textContent = " "
				best_score = Math.min(best_score, score)
			}
		}
		return best_score
	}
}

function check_winner_minimax(buttons){

	let full_cells = 0;

	winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
						[0, 3, 6], [1, 4, 7], [2, 5, 8],
						[0, 4, 8], [2, 4, 6]]

	for(let win_combo of winning_combos){
		if(buttons[win_combo[0]].textContent === buttons[win_combo[1]].textContent && 
			buttons[win_combo[0]].textContent === buttons[win_combo[2]].textContent &&
			buttons[win_combo[0]].textContent !== " "){

			if(buttons[win_combo[0]].textContent === players[0]){
				return -1
			} else {
				return 1
			}
		}
	}

	buttons.forEach((element) => {if(element.textContent !== " "){full_cells += 1}})
	if(!win && full_cells === 9){
		return 0
	}

	return null
}

function make_hard_move(buttons){
	best_score = -Infinity
	best_move = null;
	for(let i = 0; i < 9; i++){
		if(buttons[i].textContent === " "){
			buttons[i].textContent = players[1]
			score = minimax(false, buttons)
			buttons[i].textContent = " "
			if(score > best_score){
				best_score = score
				best_move = i
			}
		}
	}

	if(best_move !== null){
		make_move(best_move)
	}
}

function make_move(pos){

	if(win){
		return
	}

	let button = Array.from(document.getElementsByClassName("button"))[pos]

	if(button.textContent !== " "){
		return
	}

	button.style.color = curr_player === "X" ? "red" : "blue"
	button.textContent = curr_player

	edit_turn_info(buttons)
}

function edit_turn_info(buttons){
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

function handle_difficulty(){

	let curr_diff = get_current_diff()
	
	switch(curr_diff){
		case "player":
			return;
		case "easy":
			setTimeout(function(){make_easy_move(buttons)}, 500)
			break;
		case "medium":
			setTimeout(function(){make_medium_move(buttons)}, 500);
			break;
		case "hard":
			setTimeout(function(){make_hard_move(buttons)}, 500);
			break;
		default:
			return;
	}
}

function move(pos_number){

	make_move(pos_number)

	handle_difficulty(buttons)
}