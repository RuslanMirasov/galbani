export const initQuiz = () => {
  const quiz = document.querySelector('.quiz');
  const results = {
    а: [
      'Ты - "Душа компании"!',
      'Твоё идеальное блюдо&nbsp;- лазанья с&nbsp;Galbani Mozzarella! Ты любишь собирать вокруг себя близких и&nbsp;щедро угощать их&nbsp;вкуснейшими блюдами. Твоё кредо - "больше гостей, больше радости!"',
    ],
    б: [
      'Ты - "Истинный Ценитель"!',
      'Твоё блюдо&nbsp;- классический салат Капрезе с&nbsp;Galbani Mozzarella! Ты&nbsp;ценишь простоту, натуральность и&nbsp;безупречный вкус. Твоё счастье - в&nbsp;гармонии, тишине и&nbsp;наслаждении моментом.',
    ],
    в: [
      'Ты - "Кулинарный Гений"!',
      'Твой выбор - пицца с&nbsp;необычными ингредиентами и&nbsp;Galbani Mozzarella! Ты обожаешь экспериментировать на&nbsp;кухне, создавать что-то новое и&nbsp;удивлять своими кулинарными шедеврами. Твоё вдохновение - в креативности и&nbsp;страсти к&nbsp;кулинарии!',
    ],
    г: [
      'Ты - "Утончённый Эстет"!',
      'Твой выбор&nbsp;- брускетта с&nbsp;Galbani Mozzarella и&nbsp;прошутто! Ты ценишь элегантность, изысканный вкус и&nbsp;внимание к&nbsp;деталям. Твоё счастье&nbsp;- в&nbsp;красоте, искусстве и&nbsp;наслаждении каждым моментом жизни.',
    ],
  };

  if (!quiz) return;

  let data = [];
  const quizTitle = document.querySelector('.quiz-title');
  const quizResult = document.querySelector('[data-quiz-result]');
  const questions = document.querySelectorAll('[data-quiz-question]');
  const currentCountEl = document.querySelector('[data-questions-current]');
  const currentSumEl = document.querySelector('[data-questions-sum]');

  const firstLoad = () => {
    const saved = localStorage.getItem('quiz');
    let lastQuestionNumber = 1;

    if (saved) {
      try {
        data = JSON.parse(saved);

        if (Array.isArray(data) && data.length > 0) {
          const lastAnswer = data[data.length - 1];
          const lastNum = Number(lastAnswer.questionNumber);

          if (lastNum < questions.length) {
            lastQuestionNumber = lastNum + 1;
          } else {
            showResult();
            return;
          }
        }
      } catch (e) {
        data = [];
      }
    }

    currentCountEl.innerHTML = lastQuestionNumber;
    currentSumEl.innerHTML = questions.length;
    showElement(questions[lastQuestionNumber - 1]);
  };

  const hideElement = el => {
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      el.classList.remove('active');
    }, 300);
  };

  const showElement = el => {
    if (!el) return;
    el.classList.add('active');
    setTimeout(() => {
      el.style.opacity = '1';
    }, 50);
  };

  const showResult = () => {
    const resultTitleEl = document.querySelector('[data-quiz-result-title]');
    const resultTextEl = document.querySelector('[data-quiz-result-text]');

    const counts = {};

    data.forEach(({ answerLetter }) => {
      const letter = answerLetter.toLowerCase();
      counts[letter] = (counts[letter] || 0) + 1;
    });

    const mostFrequent = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a));

    hideElement(quiz);
    hideElement(quizTitle);

    setTimeout(() => {
      showElement(quizResult);

      resultTitleEl.innerHTML = results[`${mostFrequent[0].toString()}`][0];
      resultTextEl.innerHTML = results[`${mostFrequent[0].toString()}`][1];
    }, 300);
  };

  const saveAnswer = e => {
    if (!e.target.classList.contains('answer')) return;

    const btn = e.target;
    const currentQuestionEl = btn.closest('[data-quiz-question]');
    const currentQuestionNumber = currentQuestionEl.dataset.quizQuestion;
    const currentQuestion = currentQuestionEl.querySelector('.question').textContent;
    const currentAnswer = btn.textContent;
    const currentAnswerLetter = btn.dataset.quizAnswer;

    const answerData = {
      questionNumber: currentQuestionNumber,
      questionText: currentQuestion,
      answerLetter: currentAnswerLetter,
      answerText: currentAnswer,
    };

    data.push(answerData);
    localStorage.setItem('quiz', JSON.stringify(data));

    if (Number(currentQuestionNumber) === Number(questions.length)) {
      showResult();
      return;
    }

    currentCountEl.innerHTML = Number(currentQuestionNumber) + 1;
    hideElement(currentQuestionEl);

    setTimeout(() => {
      showElement(questions[Number(currentQuestionNumber)]);
    }, 300);
  };

  quiz.addEventListener('click', saveAnswer);

  firstLoad();
};
