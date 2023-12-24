//  - Full Url Architecture

let quizAnswers;
let answerOrCategoryBlock = document.querySelector('.quiz-block_categories');




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
                id: '213',
                text: 'Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?',
                rightAnswerID: '3',
                answers: [
                    {
                        id: '1',
                        variant: 'A',
                        text: '4.5 : 1',
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


function getCurrentUrl() {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryID = urlParams.get('categoryID');
    let questionID = urlParams.get('questionID');

    let pageName = window.location.pathname.split('/').pop();

    return {
        categoryID: categoryID,
        questionID: questionID,
        pageName: pageName
    }
}

function getFirstQuestionIDByCategory(catID) {
    let category = data.find(item => item.id === catID);

    if (category && category.questions && category.questions.length > 0) {
        return category.questions[0].id
    } else {
        return null
    }

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


function handleCategoryClick(event) {
    let catID = event.target.getAttribute("data-category-id")
    let firstQuestionID = getFirstQuestionIDByCategory(catID)

    console.log(catID + " "+ firstQuestionID);


}

function handleAnswerClick(event) {
    quizAnswers.forEach((item) => {
        item.classList.remove('selected')
    })

    event.target.classList.add('selected');
}




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



if (params.questionID && params.categoryID) {
    generateAnswerData(data[0].questions[0].answers)
} else {
    generateCategoryData(data)
}


let url = new URL(window.location.href);
console.log(url);
url.searchParams.set('questionID',1)
url.searchParams.set('categoryID',23)



window.history.replaceState({}, '', url)