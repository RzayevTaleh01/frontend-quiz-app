/*

-- QuestionID ?? - redirect
-- Check Answer
-- next Question

*/


let quizAnswers;
let answerOrCategoryBlock = document.querySelector('.quiz-block_categories');
let quizResult = 0;
let progressBar = 0;


let data = [
    {
        id: '1',
        img: './assets/img/html.svg',
        name: 'HTML',
        questions: [
            {
                id: '127',
                text: 'Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '12.5 : 1'
                    },
                    {
                        id: '2',
                        variant: 'B',
                        text: '3.5 : 1'
                    },
                    {
                        id: '3',
                        variant: 'C',
                        text: '2.5 : 2'
                    },
                    {
                        id: '4',
                        variant: 'D',
                        text: '3.5 : 1'
                    }

                ]

            },
               {
                id: '2327',
                text: 'Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '12.5 : 1'
                    },
                    {
                        id: '2',
                        variant: 'B',
                        text: '3.5 : 1'
                    },
                    {
                        id: '3',
                        variant: 'C',
                        text: '2.5 : 2'
                    },
                    {
                        id: '4',
                        variant: 'D',
                        text: '3.5 : 1'
                    }

                ]

            },
            {
                id: '213',
                text: 'WhicLevel AA requirement for normal text?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '41234 : 1',
                    },
                    {
                        id: '2',
                        variant: 'B',
                        text: '1.5 : 1'
                    },
                    {
                        id: '3',
                        variant: 'C',
                        text: '2.5 : 2'
                    },
                    {
                        id: '4',
                        variant: 'D',
                        text: '3.5 : 1'
                    }

                ]

            }
        ]
    },
    {
        id: '2',
        img: './assets/img/css.svg',
        name: 'Css',
    }
    ,
    {
        id: '3',
        img: './assets/img/js.svg',
        name: 'Javascript'
    }
    ,
    {
        id: '4',
        img: './assets/img/accessibility.svg',
        name: 'Accessibility'
    }

]

function updateUrlWithParams(type, newParams) {
    let url = new URL(window.location.href);

    if (type === 'delete') {
        quizResult=0;
        url.search = ''
        generateHomePage();
    }
    if (type === 'update') {
        Object.entries(newParams).forEach(([key, value]) => url.searchParams.set(key, value))
        
        newParams.result=='true' ? generateResultPage(newParams.categoryID) : generateQuestionPage(newParams.categoryID, newParams.questionID)
    }



    window.history.replaceState({}, '', url)
}

// Get functions

function getCurrentUrl() {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryID = urlParams.get('categoryID');
    let questionID = urlParams.get('questionID');
    let result = urlParams.get('result');

    let pageName = window.location.pathname.split('/').pop();

    return {
        categoryID: categoryID,
        questionID: questionID,
        result: result,
        pageName: pageName
    }
}


let params = getCurrentUrl();


function getFirstQuestionIDByCategory(catID) {
    let category = data.find(item => item.id === catID);

    if (category && category.questions && category.questions.length > 0) {
        return category.questions[0].id
    } else {
        return null
    }
}

function getNextQuestion(catID, currentQuestionID) {

    let category = data.find(item => item.id === catID);

    if (!category || !category.questions) {
        return null;
    }

    let currentQuestionIndex = category.questions.findIndex(item => item.id === currentQuestionID);

    if (currentQuestionIndex == -1 || currentQuestionIndex == category.questions.length - 1) {
        return null;
    }

    return category.questions[currentQuestionIndex + 1]

}

function callAnswerOrCategory(type) {

    quizAnswers = document.querySelectorAll('.quiz-block_li');

    quizAnswers.forEach(item => {
        if (type == 'category') {
            item.addEventListener('click', handleCategoryClick)
        }
        else {
            item.addEventListener('click', handleAnswerClick)
        }
    })


}


function callProgressBar(catID) {
    let category = data.find((item)=> item.id == catID);
    progressBar = progressBar + 100/(+category?.questions.length);
    console.log(progressBar);

    return progressBar; 
}


function getQuestionByIDs(catID, questionID) {
    let category = data.find(item => item.id == catID);

    if (category && category.questions && category.questions.length > 0) {
        let question = category.questions.find(q => q.id == questionID)
        return question;
    }
    else {
        return null;
    }
}


// Click Functions

function handleCategoryClick(event) {
    let catID = event.target.getAttribute("data-category-id")
    let firstQuestionID = getFirstQuestionIDByCategory(catID)

    let newParams = {
        categoryID: catID,
        questionID: firstQuestionID,
    }

    updateUrlWithParams('update', newParams)


}

function handleAnswerClick(event) {
    quizAnswers.forEach((item) => {
        item.classList.remove('selected')
    })

    event.target.classList.add('selected');
}

function checkAnswer(questionData, catID) {
    let submitBtn = document.querySelector('#answerSubmitBtn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let selectedElement = document.querySelector('.quiz-block_li.selected');
        let selectedID = selectedElement?.getAttribute('data-id');
        let rightElement = document.querySelector(`.quiz-block_li[data-id="${questionData.rightAnswerID}"]`)
        let rightClassElement = document.querySelector('.quiz-block_li.right')
        let nextQuestion = getNextQuestion(catID, questionData.id)



        if (!rightClassElement) {

            if (selectedID) {

                if (selectedID == questionData.rightAnswerID) {
                    selectedElement.classList.add('right')
                    quizResult = quizResult+1;
                } else {
                    selectedElement.classList.add('wrong')
                    rightElement.classList.add('right')
                }
                e.target.innerText = nextQuestion ? 'Next Question' : 'Submit Answer';
            }
            else {

                console.log('no selected');
            }

        }

        else {

            if (nextQuestion) {
                updateUrlWithParams("update", { categoryID: catID, questionID: nextQuestion?.id })
            } else {
                updateUrlWithParams("update", { categoryID: catID, questionID: questionData.id,result: 'true' })
            }
        }
    })
}


// Generate Functions


function generateAnswerData(a) {
    let dataHtml = '';

    a.map((item) => {
        dataHtml += `
        <li data-id='${item.id}' class="quiz-block_li">
                            <div class="quiz-block_li--variant">
                                <p>${item.variant}</p>
                            </div>
                            <p class="quiz-block_li--title">
                                ${item.text}
                            </p>
                        </li>
        `
    })

    answerOrCategoryBlock.innerHTML = dataHtml;
    callAnswerOrCategory();
}


function generateCategoryData(a) {
    let dataHtml = '';

    a.map((item) => {
        dataHtml += `
        <li data-category-id="${item.id}" class="quiz-block_li">
        <div>
            <img src="${item.img}" alt="">
        </div>
        <p class="quiz-block_li--title">
           ${item.name}
        </p>
    </li>
        `
    })

    answerOrCategoryBlock.innerHTML = dataHtml;
    callAnswerOrCategory('category');

}



function generateHomePage() {

    generateCategoryData(data)

    const questionBlock = document.querySelector('.quiz-block_desc');
    questionBlock.innerHTML = `
        <div class="quiz-block_head">
        <h1 class="quiz-block_head--header">
            <span>
                Welcome to the
            </span><br>
            Frontend Quiz!
        </h1>
        <p class="quiz-block_head--desc">Pick a subject to get started.</p>
    </div>`

    let quizBlockBtn = document.querySelector('.quiz-submit_btn');

    quizBlockBtn.innerHTML = ` `

}

function generateQuestionPage(catID, questionID) {
    let question = getQuestionByIDs(catID, questionID);
    callProgressBar(catID)

    if (question) {

        generateAnswerData(question.answers)

        let questionBlock = document.querySelector('.quiz-block_desc');

        questionBlock.innerHTML = `
            <div class="quiz-block_head">
            <p class="quiz-block_head--desc">Question 6 of 10</p>
            <h3 class="quiz-block_head--question">
                ${question.text}
            </h3>
            </div>
            <div class="quiz-block_progress">
                <p style="width: ${progressBar}%"></p>
            </div>
    `

        let quizBlockBtn = document.querySelector('.quiz-submit_btn');

        quizBlockBtn.innerHTML = `
                    <button id='answerSubmitBtn' class="button button-full button-primary">
                        Submit Answer
                    </button>  `

        callAnswerOrCategory();
        checkAnswer(question, catID);
    }
    else {
        updateUrlWithParams('delete')
    }
}

function generateResultPage(catID) {

    let questionBlock = document.querySelector('.quiz-block_desc');
    let category = data.find(item => item.id === catID);
    let totalCount = category.questions?.length


    questionBlock.innerHTML = `
        <div class="quiz-block_head">
        <h1 class="quiz-block_head--header">
            <span>
                Quiz completed
            </span><br>
            You scored...
        </h1>
    </div>
    `
    let quizBlockBtn = document.querySelector('.quiz-submit_btn');
    quizBlockBtn.innerHTML = `
                    <button id='playAgainBtn' class="button button-full button-primary">
                        Play Again
                    </button>  `

    callAnswerOrCategory();

    answerOrCategoryBlock.innerHTML = `
        <li class="quiz-block_li quiz-block_li--result">
        <div class="quiz-block_li-category">
          <div>
            <img src="./assets/img/accessibility.svg" alt="">
        </div>
        <p class="quiz-block_li--title">
            Accessibility
        </p>  
        </div>
        
        <h1 class="quiz-block_li-result-right">${quizResult}</h1>
        <p class="quiz-block_li-result-common">out of ${totalCount}</p>
    </li>
        `;


        let playAgainBtn = document.querySelector("#playAgainBtn");

        playAgainBtn.addEventListener('click',(e)=>{
            updateUrlWithParams('delete')
        })
}



if (params.questionID && params.categoryID && params.result=='true') {
    generateResultPage(params.categoryID)
}

if (params.questionID && params.categoryID && params.result!='true') {
    generateQuestionPage(params.categoryID, params.questionID)
}

if (!params.questionID || !params.categoryID) {
    generateHomePage();
}

