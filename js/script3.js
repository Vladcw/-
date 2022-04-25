const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const imageOut = document.querySelector('.image__out')
//Класс, который представляет сам тест
class Quiz
{
  constructor(type, questions, results)
  {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index)
  {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if(value >= 1)
    {
      correct = index;
    }
    else
    {
      //Иначе ищем, какой ответ может быть правильным
      for(let i = 0; i < this.questions[this.current].answers.length; i++)
      {
        if(this.questions[this.current].answers[i].value >= 1)
        {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next()
  {
    this.current++;
    
    if(this.current >= this.questions.length) 
    {
      this.End();
    }
  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End()
  {
    for(let i = 0; i < this.results.length; i++)
    {
      if(this.results[i].Check(this.score))
      {
        this.result = i;
      }
    }
  }
} 

//Класс, представляющий вопрос
class Question 
{
  constructor(text, answers)
  {
    this.text = text; 
    this.answers = answers; 
  }

  Click(index) 
  {
    return this.answers[index].value; 
  }
}

 

//Класс, представляющий ответ
class Answer 
{
  constructor(text, value) 
  {
    this.text = text; 
    this.value = value; 
  }
}

//Класс, представляющий результат
class Result 
{
  constructor(text, value)
  {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value)
  {
    if(this.value <= value)
    {
      return true;
    }
    else 
    {
      return false;
    }
  }
}

//Массив с результатами
const results = 
[
  new Result("Вам багато чому потрібно навчитись...", 0),
  new Result("Ви вже непогано розбираєтесь.", 1),
  new Result("Ваш рівень вище середнього.", 2),
  new Result("Ви досконало знаєте тему!", 3)
];

//Массив с вопросами
const questions = 
[

  new Question("<pre>Автомат A = {S = {0,1,2,3,4}; X = {0,1}; Y = {a,b,c}; {2}; δ; λ} \n задано таблицею переходів та виходів.\nПобудувати граф переходів та виходів. Перетворити\n вхідну послідовність символів: 11100110.\n\n| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  0  | 2/a | 0/b | 1/b | 2/c | 0/c |\n|  1  | 3/c | 4/c | 4/a | 1/b | 3/a |<\/pre>",
  [
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  0  | 2/a | 0/b | 1/b | 2/c | 0/c |\n|  1  | 3/c | 4/c | 0/b | 1/b | 3/a |<\/pre>", 0),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  0  | 4/b | 1/a | 3/c | 4/c | 1/a |\n|  1  | 3/b | 0/b | 0/a | 4/a | 2/c |<\/pre>", 0),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  0  | 3/c | 2/c | 1/a | 1/c | 0/c |\n|  1  | 2/a | 3/b | 1/a | 2/c | 1/b |<\/pre>", 1),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  0  | 1/c | 3/a | 4/b | 0/c | 2/b |\n|  1  | 0/c | 1/a | 3/c | 1/b | 4/c |<\/pre>", 0)
  ]),

  new Question("<pre>Автомат A = {S = {0,1,2,3,4}; X = {x1,x2,x3}; Y = {0,1}; δ; λ} \n задано таблицею переходів та виходів.\nПобудувати граф переходів та виходів для спрощеного автомата. Перетворити\n роботу початкового і спрощеного автоматів \nна вхідній послідовності символів: x2x1x2x3x2x1x2.\n\n| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  x1 | 3/1 | 4/1 | 0/1 | 2/0 | 3/1 |\n|  x2 | 1/1 | 3/1 | 3/1 | 4/0 | 1/1 |\n|  x3 | 2/1 | 1/0 | 2/0 | 3/1 | 2/1 |<\/pre>", 
  [
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  x1 | 2/0 | 1/0 | 2/1 | 2/4 | 3/2 |\n|  x2 | 4/1 | 3/2 | 1/2 | 3/0 | 1/3 |\n|  x3 | 1/4 | 2/2 | 2/1 | 3/1 | 2/4 |<\/pre>", 1),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  x1 | 1/3 | 2/4 | 1/1 | 3/4 | 1/0 |\n|  x2 | 2/1 | 2/3 | 4/0 | 2/1 | 2/3 |\n|  x3 | 4/4 | 2/3 | 1/1 | 0/2 | 2/2 |<\/pre>", 0),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  x1 | 4/2 | 1/4 | 1/2 | 1/0 | 1/4 |\n|  x2 | 3/2 | 1/4 | 2/1 | 0/1 | 0/3 |\n|  x3 | 2/3 | 1/0 | 3/3 | 3/2 | 2/1 |<\/pre>", 0),
    new Answer("<pre>| X\\A |  0  |  1  |  2  |  3  |  4  |\n|  x1 | 1/3 | 2/2 | 0/0 | 2/1 | 1/2 |\n|  x2 | 3/1 | 3/3 | 4/4 | 2/2 | 3/3 |\n|  x3 | 1/0 | 2/0 | 4/1 | 1/2 | 2/4 |<\/pre>", 0)
  ]),

  new Question("<pre>Таблиця виходів та переходів автомата А:  \n\n |  |  q1|  q2|  q3|  q4|  q5|  q6|  q7| \n|X1|  q2|  q3|  q6|  q3|  q3|  q4|  q3|\n|X2|  q1|  q5|  q3|  q7|  q4|  q6|  q2|\n |X3|  q7|  q4|  q3|  q2|  q5|  q5|  q4| \n\n |  |  q1|  q2|  q3|  q4|  q5|  q6|  q7| \n|X1|  y1|  y1|  y1|  y1|  y1|  y1|  y1|\n|X2|  y2|  y2|  y2|  y2|  y2|  y2|  y2|\n |X3|  y2|  y1|  y1|  y1|  y1|  y2|  y1| \n\n Мінімізувати автомат переходів \nта вибрати правильний варіант відповіді<\/pre>", 
  [
    new Answer("<pre> |  |  b1|  b2|  b3| \n|X1|  y1|  y2|  y3|\n|X2|  y3|  y2|  y1|\n |X3|  y2|  y3|  y1| <\/pre>", 0),
    new Answer("<pre> |  |  b1|  b2|  b3| \n|X1|  y1|  y1|  y1|\n|X2|  y2|  y2|  y2|\n |X3|  y2|  y1|  y1| <\/pre>", 1),
    new Answer("<pre> |  |  b1|  b2|  b3| \n|X1|  y1|  y3|  y2|\n|X2|  y3|  y1|  y2|\n |X3|  y2|  y3|  y2| <\/pre>", 0),
    new Answer("<pre> |  |  b1|  b2|  b3| \n|X1|  y3|  y2|  y1|\n|X2|  y1|  y2|  y2|\n |X3|  y2|  y3|  y1| <\/pre>", 0)
  ]),
 
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
  //Проверяем, есть ли ещё вопросы
  if(quiz.current < quiz.questions.length) 
  {
    //Если есть, меняем вопрос в заголовке
    headElem.innerHTML = quiz.questions[quiz.current].text;

    //Удаляем старые варианты ответов
    buttonsElem.innerHTML = "";

    //Создаём кнопки для новых вариантов ответов
    for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
    {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }
    
    //Выводим номер текущего вопроса
    pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

    //Вызываем функцию, которая прикрепит события к новым кнопкам
    Init();
  }
  else
  {
    //Если это конец, то выводим результат
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
    setTimeout(function(){
       location.reload();
      }, 3000);
  }
}

function Init()
{
  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for(let i = 0; i < btns.length; i++)
  {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
  }
}

function Click(index) 
{
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  //Делаем кнопки серыми
  for(let i = 0; i < btns.length; i++)
  {
    btns[i].className = "button button_passive";
  }

  //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
  if(quiz.type == 1)
  {
    if(correct >= 0)
    {
      btns[correct].className = "button button_correct";
    }

    if(index != correct) 
    {
      btns[index].className = "button button_wrong";
    } 
  }
  else
  {
    //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct";
  }

  //Ждём секунду и обновляем тест
  setTimeout(Update, 1000);
}