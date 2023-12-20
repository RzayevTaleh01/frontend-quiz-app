// Variables

let quizAnswers = document.querySelectorAll('.quiz-block_li');
let quizAnswerBlock = document.querySelector('.quiz-block_categories')


let data = [
    {
        id: "1",
        name: "HTML",
        logo: "assets/images/Group 83.svg",
        page: [
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
        page: [
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


function handleAnswerClick(event) {
    quizAnswers?.forEach(item => item.classList.remove('selected'));

    event.target.classList.add('selected')
}

quizAnswers?.forEach(item => {
    item.addEventListener('click', handleAnswerClick)
})




function getData(a) {
    let dataHtml = '';

    a.map((item) => {
        dataHtml += `
        <li class="quiz-block_li">
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

}


getData(data[0].page[0].answers)
