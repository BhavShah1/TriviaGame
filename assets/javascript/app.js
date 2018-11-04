$(document).ready(function () {
	
	
	// global variables
	$('#image').css('display', 'none');
	// timer variables
	var timerNumber = 31;

	// score variables
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	// question and answer variables
	var answers = [];
	var currentQuestion = 0;



	// question object array
	var trivia = [
		q1 = {
			question: 'Phobe says "hes her BLANK" to represetnthe realstionship between Ross and Rachel in the early espisodes.',
			correct: 3,
			multChoice: ['special someone', 'lover', 'lobster', 'cat'],
			
		},
		q2 = {
			question: 'What seasons do you find you get the hint that Rachel is pregenat?',
			correct: 2,
			multChoice: ['7', '6', '5', 'none'],
		
		},
		q3 = {
			question: 'Which character(s) have kissed everyone on the show both boys and girls?',
			correct: 1,
			multChoice: ['chandler', 'monica', 'Nphobe', 'joey'],
			
		},
		q4 = {
			question: 'What is the name of phobes half brother and twin sister?',
			correct: 2,
			multChoice: ['frank and Izzy', 'Frank jr. Irsula', 'Irsula and Fred Jr.', 'Frank and Irsula'],
			
		},
		q5 = {
			question: 'Who does Ross take out for Valentines day in season 1?',
			correct: 3,
			multChoice: ['Rachel', 'Kristen', 'Julie', 'Carol'],
			
		},
		q6 = {
			question: 'What names does Joey use when he tells his story about the time he went backpacking threw western Europe',
			correct: 1,
			multChoice: ['Ken Adams', 'Richard Falange', 'Rigina Falange', 'Scott Smith'],
			
		},
		q7 = {
			question: 'What magazine is Joey interviewed in in season 8?',
			correct: 3,
			multChoice: ['soal opera america', 'the soap', 'soap opera digest', 'the soap weekly'],
		
		},
		q8 = {
			question: 'What was Monicas 2nd favorite game as a kid?',
			correct: 2,
			multChoice: ['vending machine', 'ms. pac man', 'pac man', 'candy crane'],
		
		}
	];

	// helper functions
	//  helper function to hide html elements
	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};
	// helper function to show html elements
	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	// helper function for writing html elements
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	// write question function
	var questionWrite = function () {
		if (currentQuestion <= 7) { 
			$('#questionDiv').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].multChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

	// clears the html contents of the answers
	var answerClear = function () {
		// $('#answersDiv').empty();
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	// Timer
	// Timer run function
	var start = function() {
		// starts timer counter
		counter = setInterval(countDown, 1000);

		// clear startTitle
		$('#startTitle').empty();

		// hide start button
		hide('#start');

		//write question & answers
		questionWrite();	
	};

	// clears all content
	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questionDiv').empty();
		$('#scoreDiv').empty();
		answerClear();
	}

	// Timer countdown function
	var countDown = function () {
		// decrement timerNumber
		timerNumber --;
		// write timer to html timerDiv
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');

		// when timer reaches 0
		if (timerNumber == 0) {
			gameOver();
		}
	};

	// Timer stop function
	var stop = function () {
		clearInterval(counter);
	};

	// reset function
	var reset = function () {
		stop();
		timerNumber = 31;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
		// stop the timer
		stop();

		// clear the question and answers
		clearScreen();

		// interact with game over
		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
	};

	//next question function
	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 31;
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').attr('src', trivia[currentQuestion].gif);
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 5 * 1000);
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			timerNumber = 31;
			$('#questionDiv').empty();
			answerClear();
			questionWrite();
		}
	});

	 // click handlers	
	$('#start').on("click", start);
	$('#reset').on('click', reset);
})