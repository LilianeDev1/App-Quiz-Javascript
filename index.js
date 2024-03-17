const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual é o significado da frase perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores?",
    answers: [
      { text: "Pedir a Deus para aumentar nossas posses financeiras", correct: false },
      { text: "Solicitar a Deus que ignore nossas dívidas", correct: false },
      { text: "Pedir a Deus para nos perdoar assim como perdoamos os outros", correct: true },
      { text: "Dizer a Deus que estamos cheios de dívidas", correct: false }
    ]
  },
  {
    question: "Por que Jesus incluiu a ideia de perdão ao falar sobre dívidas?",
    answers: [
      { text: "Para ressaltar a importância do perdão mútuo na vida espiritual", correct: true },
      { text: "Para enfatizar a importância da economia financeira", correct: false },
      { text: "Para destacar a necessidade de pedir emprestado", correct: false },
      { text: "Para que a gente não peça emprestado", correct: false }
    ]
  },
  {
    question: "Qual é a importância do perdão mútuo na vida cristã, de acordo com Mateus 6:12?",
    answers: [
      { text: "Reconhecer a necessidade de perdoar como Deus perdoa", correct: true },
      { text: "Não tem importância", correct: false },
      { text: "Vingança", correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: "O que essa oração nos ensina sobre a natureza de Deus em relação ao perdão?",
    answers: [
      { text: "Deus é impiedoso e inflexível", correct: false },
      { text: "Deus ignora nossas dívidas", correct: false },
      { text: "Deus é misericordioso e está disposto a perdoar", correct: true },
      { text: "Deus ignora os pecados", correct: false }
    ]
  },
  {
    question: 'Como o perdão está relacionado à reconciliação nas relações humanas, de acordo com essa passagem?',
    answers: [
      { text: "O perdão não está relacionado à reconciliação", correct: false },
      { text: "O perdão pode abrir o caminho para a cura e a restauração dos relacionamentos", correct: true },
      { text: "A reconciliação não é possível", correct: false },
      { text: "Eu não preciso perdoar", correct: false }
    ]
  },
  {
    question: 'Como podemos aplicar o princípio do perdão em nossas próprias vidas?',
    answers: [
      { text: 'Mantendo rancor e ressentimento', correct: false },
      { text: 'Estendendo a mesma graça que recebemos de Deus aos outros', correct: true },
      { text: 'Ignorando as ofensas', correct: false },
      { text: 'Ficando entrigado do irmão', correct: false }
    ]
  },
  {
    question: 'Que exemplos bíblicos ou histórias podem ilustrar a importância do perdão?',
    answers: [
      { text: ' Parábola do Bom Samaritano', correct: false },
      { text: 'Parábola do Servo Impiedoso', correct: true },
      { text: 'A história de Caim e Abel.', correct: false },
      { text: 'Os discipulos no barco', correct: false }
    ]
  },
  {
    question: 'Qual o significado na forma mais simples de perdão?',
    answers: [
      { text: 'Sair no tapa', correct: false },
      { text: 'Chingar ', correct: false },
      { text: 'cortar os vinculos', correct: false },
      { text: 'Permitir que o irmão volte a ocupar o mesmo lugar no seu coração', correct: true }
    ]
  },
  {
    question: 'Qual é a mensagem principal de Paulo sobre perdão na carta de Filemon?',
    answers: [
      { text: 'Que Filemon deve buscar vingança contra Onésimo', correct: false },
      { text: 'Que é melhor esquecer e ignorar as ofensas ', correct: false },
      { text: 'cortar os vinculos', correct: false },
      { text: 'Que o perdão e a reconciliação devem ser estendidos, mesmo em situações difíceis', correct: true },
    ]
  },
]