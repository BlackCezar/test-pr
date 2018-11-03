var inpute_text_1 = document.querySelector("#input_text_1");
var inpute_text_2 = document.querySelector("#input_text_2");
var inpute_text_3 = document.querySelector("#input_text_3");
var inpute_text_4 = document.querySelector("#input_text_4");
var inpute_text_5 = document.querySelector("#input_text_5");
var inpute_text_6 = document.querySelector("#input_text_6");

var inpute_1 = document.querySelector("#input_1");
var inpute_2 = document.querySelector("#input_2");
var inpute_3 = document.querySelector("#input_3");
var inpute_4 = document.querySelector("#input_4");
var inpute_5 = document.querySelector("#input_5");
var inpute_6 = document.querySelector("#input_6");

var btn = document.querySelector("#form_button");
var btn_2 = document.querySelector("#form_button_2");
var btn_3 = document.querySelector("#form_button_3");
var btn_4 = document.querySelector("#form_button_4");
var btn_5 = document.querySelector("#form_button_5");

var form_title = document.querySelector(".title_test");

var all_form = document.querySelector(".form");

function off_check(){
	inpute_1.checked = false;
	inpute_2.checked = false;
	inpute_3.checked = false;
	inpute_4.checked = false;
	inpute_5.checked = false;
	inpute_6.checked = false;
}

function display_look(){
	inpute_1.style.display = "block";
	inpute_text_1.style.display = "block";

	inpute_2.style.display = "block";
	inpute_text_2.style.display = "block";

	inpute_3.style.display = "block";
	inpute_text_3.style.display = "block";

	inpute_4.style.display = "block";
	inpute_text_4.style.display = "block";

	inpute_5.style.display = "block";
	inpute_text_5.style.display = "block";

	inpute_6.style.display = "block";
	inpute_text_6.style.display = "block";
}

function check_box_checked(num){
	if (inpute_1.checked == true){
			mass[num] = 1;
	}else if (inpute_2.checked == true){
			mass[num] = 2;
	}else if (inpute_3.checked == true){
			mass[num] = 3;
	}else if (inpute_4.checked == true){
			mass[num] = 4;
	}else if (inpute_5.checked == true){
			mass[num] = 5;
	}else if (inpute_6.checked == true){
			mass[num] = 6;
	}
}

function color_default(){
	inpute_text_1.style.color = "black";
	inpute_text_2.style.color = "black";
	inpute_text_3.style.color = "black";
	inpute_text_4.style.color = "black";
	inpute_text_5.style.color = "black";
	inpute_text_6.style.color = "black";
}

function check_check(num){
	if (mass[num] == 1){
		input_1.checked = true;
		if (inpute_text_1.style.color != "green")
			inpute_text_1.style.color = "red";
	}else if (mass[num] == 2){
		input_2.checked = true;
		if (inpute_text_2.style.color != "green")
			inpute_text_2.style.color = "red";
	}else if (mass[num] == 3){
		input_3.checked = true;
		if (inpute_text_3.style.color != "green")
			inpute_text_3.style.color = "red";
	}else if (mass[num] == 4){
		input_4.checked = true;
		if (inpute_text_4.style.color != "green")
			inpute_text_4.style.color = "red";
	}else if (mass[num] == 5){
		input_5.checked = true;
		if (inpute_text_5.style.color != "green")
			inpute_text_5.style.color = "red";
	}else if (mass[num] == 6){
		input_6.checked = true;
		if (inpute_text_6.style.color != "green")
			inpute_text_6.style.color = "red";
	}
}

window.onload = function() {
	form_title.textContent = "1. Антибиотики – это";

	display_look();
	off_check();

	all_form.style.marginTop = "23vh";
	all_form.style.marginLeft = "40vh";

  	inpute_text_1.textContent = "Вещества, вызывающие гибель бактерий, либо препятствующие их росту и размножению";
  	inpute_text_2.textContent = "Продукты жизнедеятельности грибов, используемые для лечения инфекционных заболеваний";
  	inpute_text_3.textContent = "Вещества синтетического происхождения, используемые для лечения воспаления различных органов";

  	inpute_4.style.display = "none";
  	inpute_text_4.style.display = "none";

  	inpute_5.style.display = "none";
  	inpute_text_5.style.display = "none";

  	inpute_6.style.display = "none";
  	inpute_text_6.style.display = "none";
};

var int_for_button = 1;

var q_1 = 0;
var mass = [];

btn.onclick = function(){
	if (int_for_button == 1){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(0);

		form_title.textContent = "2. Антибиотики являются сильными лекарственными средствами, которые убивают";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "Вирусы";
	  	inpute_text_2.textContent = "Бактерии";
	  	inpute_text_3.textContent = "Все микробы";

	  	inpute_4.style.display = "none";
	  	inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 2){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(1);

		form_title.textContent = "3. Какой препарат является антибиотиком";

		display_look();
		off_check();

		all_form.style.marginTop = "15vh";
		all_form.style.marginLeft = "68vh";

		inpute_text_1.textContent = "Амоксициллин";
	  	inpute_text_2.textContent = "Абактал";
	  	inpute_text_3.textContent = "Арбидол";
	  	inpute_text_4.textContent = "Аспирин";
	  	inpute_text_5.textContent = "Амброксол";
	  	inpute_text_6.textContent = "Амиксин";

	  	int_for_button++;
	}else if (int_for_button == 3){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(2);

		form_title.textContent = "4. Должны ли присутствовать антибиотики в домашней аптечке";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "48vh";

		inpute_text_1.textContent = "Да";
	  	inpute_text_2.textContent = "Нет";
	  	inpute_text_3.textContent = "Только по рекомендации врача";

	  	inpute_4.style.display = "none";
	  	inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 4){
		if (inpute_3.checked == true){
			q_1++;
		}

		check_box_checked(3);

		form_title.textContent = "5. В каком случае используют антибиотики";

		display_look();
		off_check();

		all_form.style.marginTop = "18vh";
		all_form.style.marginLeft = "68vh";

		inpute_text_1.textContent = "При простуде (ОРЗ)";
	  	inpute_text_2.textContent = "При бактериальных инфекциях";
	  	inpute_text_3.textContent = "При любом воспалительном процессе";
	  	inpute_text_4.textContent = "При аллергии";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 5){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(4);

		form_title.textContent = "6. Антибиотики назначаются с целью установления точного бактериологического (паразитологического) диагноза";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "После клинического и лабораторного исследования больного";
	  	inpute_text_2.textContent = "Только после лабораторного исследования больного";
	  	inpute_text_3.textContent = "Только после клинического исследования больного";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 6){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(5);

		form_title.textContent = "7. Эффективность антибиотикотерапии зависит от";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "62vh";

		inpute_text_1.textContent = "Состояния функции печени и почек";
	  	inpute_text_2.textContent = "Оптимальных доз и кратности введения";
	  	inpute_text_3.textContent = "Выбора антибиотика";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 7){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(6);

		form_title.textContent = "8. Когда, по вашему мнению, стоит прекращать прием антибиотиков";

		display_look();
		off_check();

		all_form.style.marginTop = "28vh";
		all_form.style.marginLeft = "48vh";

		inpute_text_1.textContent = "После улучшения самочувствия";
	  	inpute_text_2.textContent = "По окончанию курса лечения";

		inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 8){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(7);

		form_title.textContent = "9. Антибиотики отпускаются из аптеки";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "68vh";

		inpute_text_1.textContent = "По рецепту врача";
	  	inpute_text_2.textContent = "Без рецепта врача";
	  	inpute_text_3.textContent = "Зависит от аптеки";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 9){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(8);

		form_title.textContent = "10. Необходимо ли изучение инструкции перед применением антибиотиков";

		display_look();
		off_check();

		all_form.style.marginTop = "28vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "Да";
	  	inpute_text_2.textContent = "Нет";

	  	inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 10){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(9);

		form_title.innerHTML = "11. Всегда ли Вы соблюдаете требования инструкции по применению антибиотиков <br> (связь с приёмом пищи, количество приёмов в сутки, продолжительность курса)";

		display_look();
		off_check();

		all_form.style.marginTop = "28vh";
		all_form.style.marginLeft = "36vh";

		inpute_text_1.textContent = "Да";
	  	inpute_text_2.textContent = "Нет";

	  	inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 11){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(10);

		form_title.textContent = "12. Антибиотикорезистентность";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "50vh";

		inpute_text_1.textContent = "Устойчивость организма к действию антибиотиков";
	  	inpute_text_2.textContent = "Устойчивость штамма возбудителя к действию антибактериальных препаратов";
	  	inpute_text_3.textContent = "Способность бактерий продуцировать токсины";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 12){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(11);

		form_title.textContent = "13. Антибиотикоустойчивые бактерии";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "55vh";

		inpute_text_1.textContent = "Бактерии устойчивые к действию антибактериальных препаратов";
	  	inpute_text_2.textContent = "Бактерии, продуцирующие антибиотики";
	  	inpute_text_3.textContent = "Бактерии, питающиеся антибиотиками";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 13){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(12);

		form_title.textContent = "14. Супербактерии";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "55vh";

		inpute_text_1.textContent = "Бактерии носители гена, кодирующего синтез бета-лактамаз";
	  	inpute_text_2.textContent = "Бактерии возбудители особо опасных инфекций";
	  	inpute_text_3.textContent = "Бактерии широко распространенные в мире";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 14){
		if (inpute_1.checked == true){
			q_1++;
		}

		check_box_checked(13);

		form_title.textContent = "15. Устойчивые к антибиотикам бактерии могут распространяться среди людей в результате ";

		display_look();
		off_check();

		all_form.style.marginTop = "18vh";
		all_form.style.marginLeft = "13vh";

		inpute_text_1.textContent = "Контакта с человеком, имеющим устойчивую к антибиотикам инфекцию";
	  	inpute_text_2.textContent = "Контакта с чем-то, что касалось человека, имеющего устойчивую к антибиотикам инфекцию (например, с руками медработника или инструментами в медицинском учреждении с плохими санитарно-гигиеническими условиями)";
	  	inpute_text_3.textContent = "Контакта с живым животным, пищевыми продуктами или водой, которые переносят бактерии, устойчивые к антибиотикам ";
	  	inpute_text_4.textContent = "Во всех этих случаях";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 15){
		if (inpute_4.checked == true){
			q_1++;
		}

		check_box_checked(14);

		form_title.textContent = "16. Что может случиться, если я заражусь устойчивой к антибиотикам инфекцией ";

		display_look();
		off_check();

		all_form.style.marginTop = "18vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "Я могу болеть дольше";
	  	inpute_text_2.textContent = "Мне необходимо будет чаще посещать врача или даже лечиться в больнице";
	  	inpute_text_3.textContent = "Мне могут потребоваться более дорогие лекарства, которые могут вызывать побочные эффекты ";
	  	inpute_text_4.textContent = "Все вышеизложенное ";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 16){
		if (inpute_4.checked == true){
			q_1++;
		}

		check_box_checked(15);

		form_title.innerHTML = "17. Устойчивость к антибиотикам уже вышла из-под контроля и только усиливается. <br> Я не могу ничего с этим поделать ";

		display_look();
		off_check();

		all_form.style.marginTop = "28vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "Верно";
	  	inpute_text_2.textContent = "Неверно";

	  	inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 17){
		if (inpute_2.checked == true){
			q_1++;
		}

		check_box_checked(16);

		form_title.textContent = "18. Я могу помочь преодолеть устойчивость к антибиотикам, если я";

		display_look();
		off_check();

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "40vh";

		inpute_text_1.textContent = "Не буду прекращать принимать антибиотики, когда стану чувствовать себя лучше";
	  	inpute_text_2.textContent = "Не буду принимать антибиотики, как только заболею, либо купив их в аптеке, либо по совету друзей ";
	  	inpute_text_3.textContent = "Буду соблюдать сроки вакцинации";

	  	inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

	  	int_for_button++;
	}else if (int_for_button == 18){
		if (inpute_3.checked == true){
			q_1++;
		}

		check_box_checked(17);

		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "74vh";

		form_title.textContent = "Результаты:";

		inpute_1.style.display = "none";

	  	inpute_2.style.display = "none";

  		inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

		inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

  		inpute_text_1.style.marginTop = "6vh";
		inpute_text_1.style.marginLeft = "-5.1vh";
  		inpute_text_1.textContent = "Количество правльных ответов: " + q_1;

  		inpute_text_2.style.marginTop = "7vh";
		inpute_text_2.style.marginLeft = "-5.1vh";

		var for_o = 0;

		if(q_1<=8){
  			inpute_text_2.textContent = "Ваша оценка: 2";
  			for_o = 2;
		}
  		else if ((q_1<=11) && (q_1>8)){
  			inpute_text_2.textContent = "Ваша оценка: 3";
  			for_o = 3;
  		}
  		else if ((q_1<=15) && (q_1>11)){
  			inpute_text_2.textContent = "Ваша оценка: 4";
  			for_o = 4;
  		}
  		else if ((q_1<=18) && (q_1>15)){
  			inpute_text_2.textContent = "Ваша оценка: 5";
  			for_o = 5;
  		}

  		btn.innerText = "Завершить";
		  btn.style.width = "13vh";
		  btn.dataset.end = 'end';

  		btn_2.style.display = "block";
  		btn_2.innerText = "Мои ответы";
		  btn_2.style.width = "13vh";

	}
	if (document.getElementById('form_button').dataset.end == 'end') {
		let clicker = true;
		this.onclick = () => {
			if(clicker) {
				json = {};
				json.goodAnswers = q_1;
				json.ball = for_o;
				json.answers = mass;
				clicker = false;
				let xhr = new XMLHttpRequest();

				xhr.open('POST', '/save_test', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(json));
				xhr.onload = () => {
					console.log(xhr.responseText);
					if (xhr.responseText == 'OK') {
						window.location.href = '/cabinet';
					}
				}
			}
		}

	}


}



int_for_button_2 = 0;

	btn_2.onclick = function(){

		inpute_1.disabled = "true";
		inpute_2.disabled = "true";
		inpute_3.disabled = "true";
		inpute_4.disabled = "true";
		inpute_5.disabled = "true";
		inpute_6.disabled = "true";

		inpute_text_1.style.marginLeft = "1vh";
		inpute_text_1.style.marginTop = "-2.9vh";

		inpute_text_2.style.marginLeft = "1vh";
		inpute_text_2.style.marginTop = "-2.9vh";

		btn.style.display = "none";
		btn_2.style.display = "none";

		btn_3.style.display = "block";
		btn_4.style.display = "block";
		btn_5.style.display = "block";

		btn_5.style.width = "13vh";
		btn_5.style.marginTop = "-3.3vh";
		btn_5.style.marginLeft = "21vh";

		btn_4.style.marginTop = "-3.3vh";
		btn_4.style.marginLeft = "8vh";
		btn_4.innerText = "Вперед";
		btn_3.innerText = "Назад";


		if (int_for_button_2 == 0){
			form_title.textContent = "1. Антибиотики – это";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

	  		inpute_text_1.textContent = "Вещества, вызывающие гибель бактерий, либо препятствующие их росту и размножению";
	  		inpute_text_2.textContent = "Продукты жизнедеятельности грибов, используемые для лечения инфекционных заболеваний";
	  		inpute_text_3.textContent = "Вещества синтетического происхождения, используемые для лечения воспаления различных органов";

	  		inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

	  		inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(0);

	  		int_for_button = 0;
		}
	}

	btn_4.onclick = function(){

		if(int_for_button < 17){
			int_for_button++;
			color_default();
		}

		if (int_for_button == 1){
			form_title.textContent = "2. Антибиотики являются сильными лекарственными средствами, которые убивают";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Вирусы";
		  	inpute_text_2.textContent = "Бактерии";
		  	inpute_text_3.textContent = "Все микробы";

		  	inpute_4.style.display = "none";
		  	inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(1);
		}else if (int_for_button == 2){
			form_title.textContent = "3. Какой препарат является антибиотиком";

			display_look();
			off_check();

			all_form.style.marginTop = "15vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "Амоксициллин";
		  	inpute_text_2.textContent = "Абактал";
		  	inpute_text_3.textContent = "Арбидол";
		  	inpute_text_4.textContent = "Аспирин";
		  	inpute_text_5.textContent = "Амброксол";
		  	inpute_text_6.textContent = "Амиксин";

		  	inpute_text_1.style.color = "green";

		  	check_check(2);
		}else if (int_for_button == 3){
			form_title.textContent = "4. Должны ли присутствовать антибиотики в домашней аптечке";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "48vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";
		  	inpute_text_3.textContent = "Только по рекомендации врача";

		  	inpute_4.style.display = "none";
		  	inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_3.style.color = "green";

	  		check_check(3);
		}else if (int_for_button == 4){
			form_title.textContent = "5. В каком случае используют антибиотики";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "При простуде (ОРЗ)";
		  	inpute_text_2.textContent = "При бактериальных инфекциях";
		  	inpute_text_3.textContent = "При любом воспалительном процессе";
		  	inpute_text_4.textContent = "При аллергии";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(4);
		}else if (int_for_button == 5){
			form_title.textContent = "6. Антибиотики назначаются с целью установления точного бактериологического (паразитологического) диагноза";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "После клинического и лабораторного исследования больного";
		  	inpute_text_2.textContent = "Только после лабораторного исследования больного";
		  	inpute_text_3.textContent = "Только после клинического исследования больного";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(5);
		}else if (int_for_button == 6){
			form_title.textContent = "7. Эффективность антибиотикотерапии зависит от";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "62vh";

			inpute_text_1.textContent = "Состояния функции печени и почек";
		  	inpute_text_2.textContent = "Оптимальных доз и кратности введения";
		  	inpute_text_3.textContent = "Выбора антибиотика";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(6);
		}else if (int_for_button == 7){
			form_title.textContent = "8. Когда, по вашему мнению, стоит прекращать прием антибиотиков";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "48vh";

			inpute_text_1.textContent = "После улучшения самочувствия";
		  	inpute_text_2.textContent = "По окончанию курса лечения";

			inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(7);
		}else if (int_for_button == 8){
			form_title.textContent = "9. Антибиотики отпускаются из аптеки";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "По рецепту врача";
		  	inpute_text_2.textContent = "Без рецепта врача";
		  	inpute_text_3.textContent = "Зависит от аптеки";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(8);
		}else if (int_for_button == 9){
			form_title.textContent = "10. Необходимо ли изучение инструкции перед применением антибиотиков";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(9);
		}else if (int_for_button == 10){
			form_title.innerHTML = "11. Всегда ли Вы соблюдаете требования инструкции по применению антибиотиков <br> (связь с приёмом пищи, количество приёмов в сутки, продолжительность курса)";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "36vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(10);
		}else if (int_for_button == 11){
			form_title.textContent = "12. Антибиотикорезистентность";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "50vh";

			inpute_text_1.textContent = "Устойчивость организма к действию антибиотиков";
		  	inpute_text_2.textContent = "Устойчивость штамма возбудителя к действию антибактериальных препаратов";
		  	inpute_text_3.textContent = "Способность бактерий продуцировать токсины";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(11);
		}else if (int_for_button == 12){
			form_title.textContent = "13. Антибиотикоустойчивые бактерии";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "55vh";

			inpute_text_1.textContent = "Бактерии устойчивые к действию антибактериальных препаратов";
		  	inpute_text_2.textContent = "Бактерии, продуцирующие антибиотики";
		  	inpute_text_3.textContent = "Бактерии, питающиеся антибиотиками";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(12);
		}else if (int_for_button == 13){
			form_title.textContent = "14. Супербактерии";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "55vh";

			inpute_text_1.textContent = "Бактерии носители гена, кодирующего синтез бета-лактамаз";
		  	inpute_text_2.textContent = "Бактерии возбудители особо опасных инфекций";
		  	inpute_text_3.textContent = "Бактерии широко распространенные в мире";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(13);
		}else if (int_for_button == 14){
			form_title.textContent = "15. Устойчивые к антибиотикам бактерии могут распространяться среди людей в результате ";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "13vh";

			inpute_text_1.textContent = "Контакта с человеком, имеющим устойчивую к антибиотикам инфекцию";
		  	inpute_text_2.textContent = "Контакта с чем-то, что касалось человека, имеющего устойчивую к антибиотикам инфекцию (например, с руками медработника или инструментами в медицинском учреждении с плохими санитарно-гигиеническими условиями)";
		  	inpute_text_3.textContent = "Контакта с живым животным, пищевыми продуктами или водой, которые переносят бактерии, устойчивые к антибиотикам ";
		  	inpute_text_4.textContent = "Во всех этих случаях";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_4.style.color = "green";

	  		check_check(14);
		}else if (int_for_button == 15){
			form_title.textContent = "16. Что может случиться, если я заражусь устойчивой к антибиотикам инфекцией ";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Я могу болеть дольше";
		  	inpute_text_2.textContent = "Мне необходимо будет чаще посещать врача или даже лечиться в больнице";
		  	inpute_text_3.textContent = "Мне могут потребоваться более дорогие лекарства, которые могут вызывать побочные эффекты ";
		  	inpute_text_4.textContent = "Все вышеизложенное ";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_4.style.color = "green";

	  		check_check(15);
		}else if (int_for_button == 16){
			form_title.innerHTML = "17. Устойчивость к антибиотикам уже вышла из-под контроля и только усиливается. <br> Я не могу ничего с этим поделать ";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Верно";
		  	inpute_text_2.textContent = "Неверно";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(16);
		}else if (int_for_button == 17){
			form_title.textContent = "18. Я могу помочь преодолеть устойчивость к антибиотикам, если я";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Не буду прекращать принимать антибиотики, когда стану чувствовать себя лучше";
		  	inpute_text_2.textContent = "Не буду принимать антибиотики, как только заболею, либо купив их в аптеке, либо по совету друзей ";
		  	inpute_text_3.textContent = "Буду соблюдать сроки вакцинации";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_3.style.color = "green";

	  		check_check(17);
		}
}

btn_3.onclick = function(){

		if(int_for_button > 0){
			int_for_button--;
			color_default();
		}

		if (int_for_button == 0){
			form_title.textContent = "1. Антибиотики – это";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

	  		inpute_text_1.textContent = "Вещества, вызывающие гибель бактерий, либо препятствующие их росту и размножению";
	  		inpute_text_2.textContent = "Продукты жизнедеятельности грибов, используемые для лечения инфекционных заболеваний";
	  		inpute_text_3.textContent = "Вещества синтетического происхождения, используемые для лечения воспаления различных органов";

	  		inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

	  		inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(0);
		}else if (int_for_button == 1){
			form_title.textContent = "2. Антибиотики являются сильными лекарственными средствами, которые убивают";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Вирусы";
		  	inpute_text_2.textContent = "Бактерии";
		  	inpute_text_3.textContent = "Все микробы";

		  	inpute_4.style.display = "none";
		  	inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(1);
		}else if (int_for_button == 2){
			form_title.textContent = "3. Какой препарат является антибиотиком";

			display_look();
			off_check();

			all_form.style.marginTop = "15vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "Амоксициллин";
		  	inpute_text_2.textContent = "Абактал";
		  	inpute_text_3.textContent = "Арбидол";
		  	inpute_text_4.textContent = "Аспирин";
		  	inpute_text_5.textContent = "Амброксол";
		  	inpute_text_6.textContent = "Амиксин";

		  	inpute_text_1.style.color = "green";

		  	check_check(2);
		}else if (int_for_button == 3){
			form_title.textContent = "4. Должны ли присутствовать антибиотики в домашней аптечке";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "48vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";
		  	inpute_text_3.textContent = "Только по рекомендации врача";

		  	inpute_4.style.display = "none";
		  	inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_3.style.color = "green";

	  		check_check(3);
		}else if (int_for_button == 4){
			form_title.textContent = "5. В каком случае используют антибиотики";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "При простуде (ОРЗ)";
		  	inpute_text_2.textContent = "При бактериальных инфекциях";
		  	inpute_text_3.textContent = "При любом воспалительном процессе";
		  	inpute_text_4.textContent = "При аллергии";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(4);
		}else if (int_for_button == 5){
			form_title.textContent = "6. Антибиотики назначаются с целью установления точного бактериологического (паразитологического) диагноза";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "После клинического и лабораторного исследования больного";
		  	inpute_text_2.textContent = "Только после лабораторного исследования больного";
		  	inpute_text_3.textContent = "Только после клинического исследования больного";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(5);
		}else if (int_for_button == 6){
			form_title.textContent = "7. Эффективность антибиотикотерапии зависит от";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "62vh";

			inpute_text_1.textContent = "Состояния функции печени и почек";
		  	inpute_text_2.textContent = "Оптимальных доз и кратности введения";
		  	inpute_text_3.textContent = "Выбора антибиотика";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(6);
		}else if (int_for_button == 7){
			form_title.textContent = "8. Когда, по вашему мнению, стоит прекращать прием антибиотиков";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "48vh";

			inpute_text_1.textContent = "После улучшения самочувствия";
		  	inpute_text_2.textContent = "По окончанию курса лечения";

			inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(7);
		}else if (int_for_button == 8){
			form_title.textContent = "9. Антибиотики отпускаются из аптеки";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "68vh";

			inpute_text_1.textContent = "По рецепту врача";
		  	inpute_text_2.textContent = "Без рецепта врача";
		  	inpute_text_3.textContent = "Зависит от аптеки";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(8);
		}else if (int_for_button == 9){
			form_title.textContent = "10. Необходимо ли изучение инструкции перед применением антибиотиков";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(9);
		}else if (int_for_button == 10){
			form_title.innerHTML = "11. Всегда ли Вы соблюдаете требования инструкции по применению антибиотиков <br> (связь с приёмом пищи, количество приёмов в сутки, продолжительность курса)";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "36vh";

			inpute_text_1.textContent = "Да";
		  	inpute_text_2.textContent = "Нет";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(10);
		}else if (int_for_button == 11){
			form_title.textContent = "12. Антибиотикорезистентность";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "50vh";

			inpute_text_1.textContent = "Устойчивость организма к действию антибиотиков";
		  	inpute_text_2.textContent = "Устойчивость штамма возбудителя к действию антибактериальных препаратов";
		  	inpute_text_3.textContent = "Способность бактерий продуцировать токсины";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(11);
		}else if (int_for_button == 12){
			form_title.textContent = "13. Антибиотикоустойчивые бактерии";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "55vh";

			inpute_text_1.textContent = "Бактерии устойчивые к действию антибактериальных препаратов";
		  	inpute_text_2.textContent = "Бактерии, продуцирующие антибиотики";
		  	inpute_text_3.textContent = "Бактерии, питающиеся антибиотиками";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(12);
		}else if (int_for_button == 13){
			form_title.textContent = "14. Супербактерии";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "55vh";

			inpute_text_1.textContent = "Бактерии носители гена, кодирующего синтез бета-лактамаз";
		  	inpute_text_2.textContent = "Бактерии возбудители особо опасных инфекций";
		  	inpute_text_3.textContent = "Бактерии широко распространенные в мире";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_1.style.color = "green";

	  		check_check(13);
		}else if (int_for_button == 14){
			form_title.textContent = "15. Устойчивые к антибиотикам бактерии могут распространяться среди людей в результате ";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "13vh";

			inpute_text_1.textContent = "Контакта с человеком, имеющим устойчивую к антибиотикам инфекцию";
		  	inpute_text_2.textContent = "Контакта с чем-то, что касалось человека, имеющего устойчивую к антибиотикам инфекцию (например, с руками медработника или инструментами в медицинском учреждении с плохими санитарно-гигиеническими условиями)";
		  	inpute_text_3.textContent = "Контакта с живым животным, пищевыми продуктами или водой, которые переносят бактерии, устойчивые к антибиотикам ";
		  	inpute_text_4.textContent = "Во всех этих случаях";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_4.style.color = "green";

	  		check_check(14);
		}else if (int_for_button == 15){
			form_title.textContent = "16. Что может случиться, если я заражусь устойчивой к антибиотикам инфекцией ";

			display_look();
			off_check();

			all_form.style.marginTop = "18vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Я могу болеть дольше";
		  	inpute_text_2.textContent = "Мне необходимо будет чаще посещать врача или даже лечиться в больнице";
		  	inpute_text_3.textContent = "Мне могут потребоваться более дорогие лекарства, которые могут вызывать побочные эффекты ";
		  	inpute_text_4.textContent = "Все вышеизложенное ";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_4.style.color = "green";

	  		check_check(15);
		}else if (int_for_button == 16){
			form_title.innerHTML = "17. Устойчивость к антибиотикам уже вышла из-под контроля и только усиливается. <br> Я не могу ничего с этим поделать ";

			display_look();
			off_check();

			all_form.style.marginTop = "28vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Верно";
		  	inpute_text_2.textContent = "Неверно";

		  	inpute_3.style.display = "none";
	  		inpute_text_3.style.display = "none";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_2.style.color = "green";

	  		check_check(16);
		}else if (int_for_button == 17){
			form_title.textContent = "18. Я могу помочь преодолеть устойчивость к антибиотикам, если я";

			display_look();
			off_check();

			all_form.style.marginTop = "23vh";
			all_form.style.marginLeft = "40vh";

			inpute_text_1.textContent = "Не буду прекращать принимать антибиотики, когда стану чувствовать себя лучше";
		  	inpute_text_2.textContent = "Не буду принимать антибиотики, как только заболею, либо купив их в аптеке, либо по совету друзей ";
		  	inpute_text_3.textContent = "Буду соблюдать сроки вакцинации";

		  	inpute_4.style.display = "none";
	  		inpute_text_4.style.display = "none";

		  	inpute_5.style.display = "none";
	  		inpute_text_5.style.display = "none";

	  		inpute_6.style.display = "none";
	  		inpute_text_6.style.display = "none";

	  		inpute_text_3.style.color = "green";

	  		check_check(17);
		}
}

btn_5.onclick = function(){
		all_form.style.marginTop = "23vh";
		all_form.style.marginLeft = "74vh";

		form_title.textContent = "Результаты:";

		inpute_1.style.display = "none";

	  	inpute_2.style.display = "none";

  		inpute_3.style.display = "none";
  		inpute_text_3.style.display = "none";

		inpute_4.style.display = "none";
  		inpute_text_4.style.display = "none";

	  	inpute_5.style.display = "none";
  		inpute_text_5.style.display = "none";

  		inpute_6.style.display = "none";
  		inpute_text_6.style.display = "none";

  		inpute_text_1.style.marginTop = "6vh";
		inpute_text_1.style.marginLeft = "-5.1vh";
  		inpute_text_1.textContent = "Количество правльных ответов: " + q_1;

  		inpute_text_2.style.marginTop = "7vh";
		inpute_text_2.style.marginLeft = "-5.1vh";

		var for_o = 0;

		if(q_1<=8){
  			inpute_text_2.textContent = "Ваша оценка: 2";
  			for_o = 2;
		}
  		else if ((q_1<=11) && (q_1>8)){
  			inpute_text_2.textContent = "Ваша оценка: 3";
  			for_o = 3;
  		}
  		else if ((q_1<=15) && (q_1>11)){
  			inpute_text_2.textContent = "Ваша оценка: 4";
  			for_o = 4;
  		}
  		else if ((q_1<=18) && (q_1>15)){
  			inpute_text_2.textContent = "Ваша оценка: 5";
  			for_o = 5;
  		}

  		btn_3.style.display = "none";
  		btn_4.style.display = "none";
  		btn_5.style.display = "none";

  		btn.style.display = "block";

		  btn.innerText = "Завершить";
		  btn.dataset.end = 'end';
  		btn.style.width = "13vh";

  		btn_2.style.display = "block";
  		btn_2.innerText = "Мои ответы";
		  btn_2.style.width = "13vh";

		  console.log(q_1);
		  console.log(mass);
		  console.log(for_o);
}
if (document.getElementById('form_button').dataset.end == 'end') {
	let clicker = true;
	this.onclick = () => {
		if (clicker) {
			json = {};
			json.goodAnswers = q_1;
			json.ball = for_o;
			json.answers = mass;
			clicker = false;

			let xhr = new XMLHttpRequest();

			xhr.open('POST', '/save_test', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(json));
			xhr.onload = () => {
				console.log(xhr.responseText);
				if (xhr.responseText == 'OK') {
					window.location.href = '/cabinet';
				}
			}
		}
	}

}
