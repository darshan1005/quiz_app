const questions = [
    {
        question: "Which of the following is a valid method declaration in Java?",
        answers: [
            { text: "public int myMethod(int a, int b)", correct: true },
            { text: "public myMethod(int a, int b)", correct: false },
            { text: "int public myMethod(a, b)", correct: false },
            { text: "myMethod public(int a, int b)", correct: false }
        ]
    }, {
        question: "What is the size of a char in Java?",
        answers: [
            { text: "8 bits", correct: false },
            { text: "16 bits", correct: true },
            { text: "32 bits", correct: false },
            { text: "64 bits", correct: false }
        ]
    }, {
        question: "Which of the following is not a Java keyword?",
        answers: [
            { text: "volatile", correct: false },
            { text: "transient", correct: false },
            { text: "unsigned", correct: true },
            { text: "synchronized", correct: false }
        ]
    }, {
        question: " What is the output of the following Python code snippet: [i for i in range(10) if i%2==0]?",
        answers: [
            { text: "[0, 2, 4, 6, 8]", correct: true },
            { text: "[1, 3, 5, 7, 9", correct: false },
            { text: "[0, 1, 2, 3, 4]", correct: false },
            { text: "[1, 2, 3, 4, 5]", correct: false }
        ]
    }, {
        question: "Which of the following is not a valid variable name in Python?",
        answers: [
            { text: "_myvar", correct: false },
            { text: "my_var", correct: false },
            { text: "9myvar", correct: true },
            { text: "myVar", correct: false }
        ]
    }, {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "text-style", correct: false }
        ]
    }, {
        question: "How do you select an element with id “demo” in CSS?",
        answers: [
            { text: ".demo", correct: false },
            { text: "#demo", correct: true },
            { text: "demo", correct: false },
            { text: "$demo", correct: false }
        ]
    }, {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: true },
            { text: "Mozilla", correct: false },
            { text: "Apple", correct: false },
            { text: "Netscape", correct: false }
        ]
    }, {
        question: "What will be the output of the following JavaScript code: '2'+2 ?",
        answers: [
            { text: "4", correct: false },
            { text: "'2'", correct: false },
            { text: "'4'", correct: false },
            { text: "22", correct: true }
        ]
    }, 
    {
        question: "Which HTML tag is used to define an internal style sheet? (include <>)",
        answers: [
            { text: "css", correct: false },
            { text: "style", correct: true },
            { text: "script", correct: false },
            { text: "link", correct: false }
        ]
    }, {
        question: "How can you make a numbered list in HTML? (include <>)",
        answers: [
            { text: "dl", correct: false },
            { text: "ol", correct: true },
            { text: "list", correct: false },
            { text: "ul", correct: false }
        ]
    }, {
        question: "What does the final keyword do in Java?",
        answers: [
            { text: "Makes a variable changeable", correct: false },
            { text: "Makes a variable unchangeable", correct: true },
            { text: "Makes a class inheritable", correct: false },
            { text: "Makes a class non-inheritable", correct: false }
        ]
    }, {
        question: "What is the correct way to comment a line in Python?",
        answers: [
            { text: "// This is a comment", correct: false },
            { text: "/* This is a comment */", correct: false },
            { text: "# This is a comment", correct: true },
            { text: ") -- This is a comment", correct: false }
        ]
    }, 
    {
        question: "What will be the output of the following Python code: print(type([]))?(include <>)",
        answers: [
            { text: "class 'list'", correct: true },
            { text: "class 'array'", correct: false },
            { text: "class 'tuple'", correct: false },
            { text: "class 'dict'", correct: false }
        ]
    }, {
        question: "How do you insert a comment in CSS?",
        answers: [
            { text: "// This is a comment", correct: false },
            { text: "# This is a comment", correct: false },
            { text: "/* This is a comment */", correct: true }
        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    ShowQuestion();
}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerText = questionNumber + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextBtn.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "play again" ;
    nextBtn.style.display = "block" ;
}

function handelNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handelNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();