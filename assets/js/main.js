//  - Full URL Architecture


let quizAnswers;
let answerOrCategoryBlock = document.querySelector('.quiz-block_categories');




let data = [
    {
        id: '1',
        img: './assets/img/html.svg',
        name: 'HTML',
        questions: [
            {
                id: '123',
                text: 'Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '4.5 : 1'
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

            },
            {
                id: '2',
                text: 'demo?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '11 : 1',
                    },
                    {
                        id: '2',
                        variant: 'B',
                        text: '25 : 1'
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
        name: 'Css'
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

let params = getCurrentUrl();


// Get Functions

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


function getFirstQuestionIDByCategory(categoryID) {
    const category = data.find(item => item.id === categoryID);

    if (category && category.questions && category.questions.length > 0) {
        return category.questions[0].id;
    } else {
        return null;
    }
}

function getQuestionByIDs(categoryID, questionID) {

    const category = data.find(item => item.id === categoryID);

    if (category && category.questions && category.questions.length > 0) {
        const question = category.questions.find(q => q.id === questionID);
        return question || null;
    } else {
        return null;
    }
}

function updateUrlWithParams(newParams) {
    let url = new URL(window.location.href);

    Object.entries(newParams).forEach(([key, value]) => url.searchParams.set(key, value));

    window.history.replaceState({}, '', url);

    generateQuestionPage(newParams.categoryID, newParams.questionID)
}


function callAnswerOrCategory(type) {
    quizAnswers = document.querySelectorAll('.quiz-block_li');

    quizAnswers.forEach(item => {
        if (type == 'category') {
            item.addEventListener('click', handleCategoryClick)
        } else {
            item.addEventListener('click', handleAnswerClick)
        }
    })
}

// Click Functions

function handleAnswerClick(event) {
    quizAnswers.forEach((item) => {
        item.classList.remove('selected')
    })

    event.target.classList.add('selected');
}


function handleCategoryClick(event) {
    let catID = event.target.getAttribute('data-category-id');

    let firstQuestionID = getFirstQuestionIDByCategory(catID);

    let newParams = {
        categoryID: catID,
        questionID: firstQuestionID,
    }

    updateUrlWithParams(newParams)
}


// Generate View Functions
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

function generateQuestionPage(catID, questionID) {
    let question = getQuestionByIDs(catID, questionID);

    generateAnswerData(question.answers)

    const quizBlockOp = document.querySelector('.quiz-block_op');
    quizBlockOp.innerHTML += `
    <div class="quiz-submit_btn">
    <button id='checkAnswer' class="button button-full button-primary">
        Submit Answer
    </button>
</div>
    `

    const questionBlock = document.querySelector('.quiz-block_desc');

    questionBlock.innerHTML = `
    <div class="quiz-block_head">
                        <p class="quiz-block_head--desc">Question 1 of 10</p>
                        <h3 class="quiz-block_head--question">
                            ${question.text}
                        </h3>
                    </div>
                    <div class="quiz-block_progress">
                        <p style="width: 5%"></p>
                    </div>`

    callAnswerOrCategory();
    checkAnswer()

}



function checkAnswer() {
    let submitBtn = document.querySelector('#checkAnswer');

    submitBtn.addEventListener('click', (e) => {

    })
}


if (!params.categoryID && !params.questionID) {
    generateCategoryData(data)
}


if (params.categoryID && params.questionID) {
    generateQuestionPage(params.categoryID, params.questionID)
}



