import quizData from './data.js'

let quiz_start_page_inner_HTML, 
    quiz_start_page, quiz_content_page_inner_HTML, 
    quiz_content_page, quiz_end_page, quiz_end_page_inner_HTML, body, can_select_answer, question_index, score;

const OPTION_COLOR = 'rgba(0, 0, 0, .05)';


function hide_quiz_start_page(){
    quiz_start_page.innerHTML = '';
}

function hide_quiz_content_page(){
    quiz_content_page.innerHTML = '';
}

function hide_quiz_end_page(){
    quiz_end_page.innerHTML = '';
}

function set_mocioni_bg(){
    body.className = 'mocioni-bg'
}

function set_gradient_bg(){
    body.className = 'gradient-bg'
}

function show_question(question_index){
    const q_obj = quizData[question_index]
    const q_text = q_obj['question']
    const q_progress = `${question_index + 1} / ${quizData.length}`

    document.querySelector('.question-area #quiz-progress').innerText = q_progress

    document.querySelector('.question-area #quiz-question').innerText = q_text

    for(let i = 1; i <=4; i++){
        const option = q_obj['answers'][i-1];

        document
            .querySelector(`#op${i} p`)
            .innerText = option;
    }

    can_select_answer = true;
}

function hide_continue_btn(){
    document.querySelector('#continue-btn').classList.add('hidden');
}

function reset_options_color(){
    document.querySelectorAll('.option').forEach(
        option => {
            option.style.backgroundColor = OPTION_COLOR;
        }
    )
}

function show_quiz_ending(){
    hide_quiz_start_page();
    hide_quiz_content_page();
    set_gradient_bg();

    quiz_end_page.innerHTML = quiz_end_page_inner_HTML;

    const end_text = "Felicitări pentru completarea cu succes a quiz-ului despre Conacul Mocioni din Foeni! Ești acum un cunoscător în domeniul istoriei și arhitecturii acestui loc deosebit. Continuă să explorezi și să te bucuri de cunoaștere!"


    const end_score_text = `Scor final: ${score} / ${quizData.length}`;
    
    document.querySelector('.end-text').innerText = end_text;

    document.querySelector('.end-wrapper .end-score').innerText = end_score_text;
}

function set_continue_btn_action(){
    document.querySelector('#continue-btn').onclick = () => {
        hide_continue_btn();

        if (question_index + 1 < quizData.length) {
            reset_options_color();
            show_question(++question_index);
        } else {
            show_quiz_ending();
        }
    }
}


function show_quiz_content_page(){
    set_gradient_bg();
    // load content page html
    quiz_content_page.classList.remove('hidden');
    quiz_content_page.innerHTML = quiz_content_page_inner_HTML;
    question_index = 0;
    score = 0;
    
    show_question(question_index);

    set_option_btn_action();
    set_continue_btn_action();
}

function set_start_btn_action(){
    document.querySelector('#start-btn').onclick = () => {
        hide_quiz_start_page();
        show_quiz_content_page();
    }
}

function show_wrong_color(option){
    option.style.backgroundColor = 'red';
}

function show_right_answer(correct_id){
    const correct_option = document.querySelector(`#op${correct_id + 1}`);
    correct_option.style.backgroundColor = 'green';
}

function check_answer(option, question_index){
    const correct_id = quizData[question_index]['correct'];
    const option_id = option.id[2] - 1;
    if (option_id != correct_id){
        show_wrong_color(option);
    }
    show_right_answer(correct_id);

    return option_id == correct_id;
}

function show_continue_btn(){
    document.querySelector('#continue-btn').classList.remove('hidden');
}

function set_option_btn_action(){
    document.querySelectorAll('.option').forEach(el => {
        el.onclick = () => {
            if (can_select_answer) {
                can_select_answer = false;
                const result = check_answer(el, question_index);
                if (result) {
                    score++;
                }
                console.log(`score: ${score}`);
                show_continue_btn();
            }
        }
    })
}

function init(){
    quiz_start_page = document.querySelector('.quiz-start-page');
    quiz_content_page = document.querySelector('.quiz-content-page');
    quiz_end_page = document.querySelector('.quiz-end-page');

    quiz_content_page_inner_HTML = quiz_content_page.innerHTML;
    quiz_end_page_inner_HTML = quiz_end_page.innerHTML;
    hide_quiz_end_page();

    body = document.querySelector('body');
    set_mocioni_bg();
    set_start_btn_action();
    hide_quiz_content_page();
}

function view_content_page_only(){
    quiz_start_page = document.querySelector('.quiz-start-page');
    quiz_content_page = document.querySelector('.quiz-content-page');
    quiz_end_page = document.querySelector('.quiz-end-page');

    body = document.querySelector('body');

    quiz_start_page.innerHTML = '';
    quiz_end_page.innerHTML = '';
    
    quiz_content_page_inner_HTML = quiz_content_page.innerHTML;
    quiz_end_page_inner_HTML = quiz_end_page.innerHTML;

    
    show_quiz_content_page();
}

function view_quiz_ending_page_only(){
    quiz_start_page = document.querySelector('.quiz-start-page');
    quiz_content_page = document.querySelector('.quiz-content-page');
    body = document.querySelector('body');

    hide_quiz_start_page();
    hide_quiz_content_page();
    set_gradient_bg();

    const end_text = "Felicitări pentru completarea cu succes a quiz-ului despre Conacul Mocioni din Foeni! Ești acum un cunoscător în domeniul istoriei și arhitecturii acestui loc deosebit. Continuă să explorezi și să te bucuri de cunoaștere!"

    score = 5

    const end_score_text = `Scor final: ${score} / ${quizData.length}`;
    
    document.querySelector('.quiz-end-page .end-text').innerText = end_text;

    document.querySelector('.quiz-end-page .end-score').innerText = end_score_text;
}

window.onload = () => {
    init();
    // view_quiz_ending_page_only();
    // view_content_page_only();
}