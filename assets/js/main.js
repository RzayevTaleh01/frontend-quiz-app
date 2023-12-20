// Variables

let quizAnswers = document.querySelectorAll('.quiz-block_li');
let quizAnswerBlock = document.querySelector('.quiz-block_categories')


let data = [
    {
        id: "1",
        name: "HTML",
        logo: "assets/images/Group 83.svg",
        questions: [
            {
                id: "1",
                question:
                    "Bu rəng kontrakt nisbətlərindən hansı normal mətn üçün minimum WCAG 2.1 Səviyyə AA tələbini müəyyən edir?",
                trueAnswerId: "1",
                answers: [
                    {
                        id: "1",
                        variant: "A",
                        text: "4.5 : 1",
                    },
                    {
                        id: "2",
                        variant: "B",
                        text: "3:1",
                    },
                    {
                        id: "3",
                        variant: "C",
                        text: "2.5 : 1",
                    },
                    {
                        id: "4",
                        variant: "D",
                        text: "5 : 1",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        name: "CSS",
        logo: "assets/images/Group 82.svg",
        questions: [
            {
                id: "1",
                question:
                    "Bunlardan hansı css-i html-ə bağlamaq üsulu deyil?",
                trueAnswerId: "3",
                answers: [
                    {
                        id: "1",
                        logo: "A",
                        text: "<link rel='stylesheet'> href='/styles.css'",
                    },
                    {
                        id: "2",
                        logo: "B",
                        text: "<style></style>",
                    },
                    {
                        id: "3",
                        logo: "C",
                        text: "<script src='/main.js'>",
                    },
                    {
                        id: "4",
                        logo: "D",
                        text: "<p style='color:'red'>",
                    },
                ],
            },
        ],
    }
];

let params = getCurrentUrl();


function getCurrentUrl() {
    let urlParams = new URLSearchParams(window.location.search);
    let questionID = urlParams.get('questionID');
    let categoryID = urlParams.get('categoryID');

    let pageName = window.location.pathname.split('/').pop();

    return {
        questionID: questionID,
        categoryID: categoryID,
        pageName: pageName
    }
}


function handleAnswerClick(event) {
    console.log(event.target.getAttribute('data-id'));

    let answerId = event.target.getAttribute('data-id');

    let resultAnswer = handleCheckAnswer(answerId);

    if(resultAnswer){
        event.target.classList.add('right')
    }else{
        event.target.classList.add('wrong')
    }


    quizAnswers?.forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected')

}

function handleCheckAnswer(ansID) {
    let question = findQustion();
    return question.id == ansID;
}



function findQustion() {
    let catData = data.find(item => {
        return item.id == params.categoryID
    })
    let questionData = catData.questions.find(item => {
        return item.id = params.questionID
    })

    return questionData;
}



function getAnswerData(a) {
    let dataHtml = '';

    a.map((item) => {
        dataHtml += `
        <li data-id="${item.id}" class="quiz-block_li">
                            <div class="quiz-block_li--variant">
                                <p>${item.variant}</p>
                            </div>
                            <p class="quiz-block_li--title">
                                ${item.text}
                            </p>
       </li>
        `
    })

    quizAnswerBlock.innerHTML = dataHtml;

    quizAnswers = document.querySelectorAll('.quiz-block_li');
    quizAnswers?.forEach(item => {
        item.addEventListener('click', handleAnswerClick)
    })

}


getAnswerData(data[0].questions[0].answers)
