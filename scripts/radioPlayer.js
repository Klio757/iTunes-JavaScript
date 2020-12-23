export const radioPlayerInit = () => {
    //получаем элементы из html
    const radio =document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item'); //необходимо получитьвсе радиостанции
    const radioStop = document.querySelector('.radio-stop');
//конструктор аудио создает объекты
    const audio = new Audio();
    audio.type = 'audio/aac'; // тип радио

    //блокируем кномпу плаэй
    radioStop.disable = true; 
    //меняем иконку плэй стоп, добавляем анимацию радио при включении из css
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else{
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };
    
    const selectItem = elem => {
        //перебираем все элеметы и убираем у них класс select
        radioItem.forEach(item => item.classList.remove('select'));
        //добавляем кружок на эмблеме радио при нажатии на радио через класс select
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
    //то что вызвает событие(жмем на радиостанцию и получаем input с классом и id радио)
        const target = event.target; 
        const parrent = target.closest('.radio-item');
        selectItem(parrent);
//Отображаем название радио на странице привключении. обращаемся к элементу parrent и внутри него ищем элемент с классом radio-name
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
//отображаем иконку радио на на главном радио
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg

        //разблокровали кнопку
        radioStop.disable = false; 
       //путь(адрес) до радиостанцци которой прописан внутри input в html
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

};