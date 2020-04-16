//Variable Declarations
let button, input;
var choiceAmount;
let choices = [];
let scores = [];
let reachedResult = false;
let largestScore = 0;
let timeToRun;
let start, end;

//Setup: Runs function onLoad(). Sets up basic UI.
function setup() {
	createCanvas(windowWidth, windowHeight + 5000);
	var title = createElement('h1', 'Welcome to the Optimal Stopping Vizualizer!');
  	title.position(10, 5);
  	var title = createElement('label', 'Enter amount of choices:');
  	title.position(10, 70);
	input = createInput();
  	input.position(10, 100);
	button = createButton('Vizualize');
  	button.position(10, 130);
  	button.mousePressed(createChoicePerformance);
  	
  	refreshButton = createButton('Refresh');
  	refreshButton.position(80, 130);
  	refreshButton.mousePressed(refresh);

  	
}

//Draw: Infinit loop checking if the results where reached in order to display time taken to run
function draw() {
	if (reachedResult) {
		strokeWeight(0);
		textSize(32);
		fill('#5E5A5D');
		text("Success achieved in (milli): " + timeToRun.toFixed(5), 250, 180)
	}
}

/* REQUIRES: Button is clicked to start.
 * EFFECTS: Dsplays all squares (choices) based on the amount inputed by user;
 * Then calls for the defineOptimalStop() function.
 */
function createChoice() {
	choiceAmount = int(input.value());
	var currentX = 50;
	var currentY = 200;
	choices.push(new ChoicesBox(currentX, currentY));
	for(let i = 0; i < choiceAmount-1; i++) {
		currentX = currentX + 70;
		if (currentX > (width-100)) {
			currentX = 50;
			currentY = currentY + 70;
		}
		choices.push(new ChoicesBox(currentX, currentY));
	}

	for (let i = 0; i < choices.length; i++) {
			choices[i].display();
	}

	defineOptimalStop();

}

/* REQUIRES: createChoice()
 * EFFECTS: Runs Optimal Stopping algorithm and determines the optimal choice
 */
function defineOptimalStop() {
	fill(0,255,255);		
	rect(choices[(int(0.37*choices.length))-1].x, choices[(int(0.37*choices.length))-1].y, 50, 50);
	fill(255);
	text(choices[(int(0.37*choices.length))-1].percentageScore+" %", choices[(int(0.37*choices.length))-1].x+5, choices[(int(0.37*choices.length))-1].y+30);

	// Optimal Stopping Algorithm
	for (let i = (int(0.37*choices.length)); i < scores.length; i++) {
		for (let p = 0; p < (int(0.37*choices.length)); p++) {
			if (scores[p] > largestScore) {
				largestScore = scores[p];
			}
		}


		if (largestScore != 100) {
			if (choices[i].percentageScore > largestScore ) {
				if (!reachedResult) {
					fill(0,255,0);		
					rect(choices[i].x, choices[i].y, 50, 50);
					fill(255);
					text(choices[i].percentageScore+" %", choices[i].x+5, choices[i].y+30);
					reachedResult = true;
					textSize(32);
					strokeWeight(0);
					fill(0,255,0);
					text("Best Choice in Option: " + (i+1), 250, 130)
					strokeWeight(3);
					textSize(16);
					
				} else {
					fill(255);		
					rect(choices[i].x, choices[i].y, 50, 50);
					fill(255);
					text(choices[i].percentageScore+" %", choices[i].x+5, choices[i].y+30);
				}
			}

		} else {
			if (choices[i].percentageScore >= largestScore ) {
				if (!reachedResult) {
					fill(0,255,0);		
					rect(choices[i].x, choices[i].y, 50, 50);
					fill(255);
					text(choices[i].percentageScore+" %", choices[i].x+5, choices[i].y+30);
					reachedResult = true;
					fill(0,255,0);
					textSize(32);
					strokeWeight(0);
					text("Best Choice in Option: " + (i+1), 250, 130)
					strokeWeight(3);
					textSize(16);

				} else {
					fill(255);		
					rect(choices[i].x, choices[i].y, 50, 50);
					fill(255);
					text(choices[i].percentageScore+" %", choices[i].x+5, choices[i].y+30);
				}
			}
		}

	}

	if (!reachedResult) {
	fill(255,0,0);		
	rect(choices[choices.length-1].x, choices[choices.length-1].y, 50, 50);
	fill(255);
	text(choices[choices.length-1].percentageScore+" %", choices[choices.length-1].x+5, choices[choices.length-1].y+30);
	strokeWeight(0);
	fill(255,0,0);
	textSize(32);
	text("Failed to Achieve Optimal Choice", 250, 130)
	}
} 

/* REQUIRES: RefreshButton is clicked to start.
 * EFFECTS: Refreshes the screen by deleting all canvas elements and setting all variables to their initial state
 */
function refresh() {
	choices = [];
 	scores = [];
 	reachedResult = false;
	largestScore = 0;
	start = 0;
	end = 0;
	clear();
}
			
//Choices Object
class ChoicesBox {

	// EFFECTS: sets a random score for the choice; sets x and y to the object parameter
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.percentageScore = int(random(0,101));
		
	}

	// EFFECTS: draws a box with the choice properties
	display() {	
		
		stroke('#000')
		strokeWeight(3)
		textSize(15);
		fill(255);		
		rect(this.x, this.y, 50, 50);
		fill(255);
		text(this.percentageScore+" %", this.x+5, this.y+30);
		scores.push(this.percentageScore);

		
	}
}

// EFFECTS: runs the algorithm performance
function createChoicePerformance() {
	start = window.performance.now();
  	createChoice();
  	end = window.performance.now();
  	timeToRun = end - start;
}