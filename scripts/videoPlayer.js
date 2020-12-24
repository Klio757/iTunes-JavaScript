export const videoPlayerInit = () => {
    //поучаем элементы видео плеера
    // video-button__play
    // video-button__stop
    // video-time__passed
    // video-progress
    // video-time__total

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
     

    //изменение инконки на плэй иконку пауза, путем нажатия на видео
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }
    //запускаем останавливаем видео плеер -нажав на видео. 
    const togglePlay = () => {
        if(videoPlayer.paused) {
           videoPlayer.play();
        } else { 
            videoPlayer.pause();
        }
//запускаем функцию toggleIcon после тога как запусли или поставили на паузу плеер
        //toggleIcon();
    };
//вызываем функцию стопплэй. Ставим видео на паузу, возвращаем время начального видео в начальную позициюю
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };
//выводим минуты секунды ввиде 00:00 при помощи тернарного оператора
    //const addZero = n => n < 10 ? '0' + n : n; //условие ? (условие верно) : (условие ложное)
    //Запуск функции togglePla по клику. Реализация клика на кнопки плэй пауза
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    //др способ вызова функции toggleIcon (автоматически)(работает для виде и для ауди плееров)
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);
// реализация остановки видео путем нажатия на кномку стоп.
    videoButtonStop.addEventListener('click', stopPlay);

//реализация отображения времени
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime; //сколько времени прошло
        const duration = videoPlayer.duration; //сколовсего длиться видео
//реализация отображения бегунка на шкале времени
        videoProgress.value = (currentTime / duration) * 100;
        //округляеем  секунды до целого числа(чтобы показывало минуту)
        let minutePassed = Math.floor(currentTime / 60); //округляем
        let secondsPassed = Math.floor(currentTime % 60); //остаток от челого

        let minuteTotal = Math.floor(duration / 60); //округляем
        let secondsTotal = Math.floor(duration % 60); //остаток от челого
        //выводим минуты секунды на шкалу видео
        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    });
    //добавление возможности ппереключения бегунка на шкале времени(перемотка в ручную)
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; // получение места на которое мы кликнули
    });
};
