import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
//т к нет сервера то создаем плейлис 
    const playlist = ['hello', 'flow', 'speed'];
//индекс той песни которая в данный момент играет
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused; //проверям стоит пауза
        const track = playlist[trackIndex];  //проверяем трек
        //меняем картинку
        audioImg.src = `./audio/${track}.jpg`;
        //меняеем название и ставиим большие буквы
        audioHeader.textContent = track.toLocaleUpperCase();
//меняеем занчиение аудио прлее src,прописываем новый трек. Берем название hello всталем в mp3 и так с остальными ттереками
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        }else{
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        }else {
            trackIndex++;
        }
        //функция для запуска музыки
        loadTrack();
    };

    //упраление треками(запуск, переключение) при помощи делегирования
    audioNavigation.addEventListener('click', event => {
        const target = event.target;
//метод contains прокееверяет есть ли необходимый класс
        if (target.classList.contains('audio-button__play')) {
            //toggle добавляет если нет и убирает если есть. 
            audio.classList.toggle('play')
            audioButtonPlay.classList.toggle('fa-play')
            audioButtonPlay.classList.toggle('fa-pause')
            //запуск музыки
            if (audioPlayer.paused) {
                audioPlayer.play();
            }else {
                audioPlayer.pause();
            }
//при нажатии на play запускается музыка и меняется картнка и название трека
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toLocaleUpperCase();
        }
        //добавляем функцию если мы кликаем не по плэй а по кнопкам следующей и предыдущей
        //перключаемся к последнему треку
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }
        //проверяет является ли трек последним
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });
    
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });
//задаем шкалу прогресса проигрывания трека (времени)
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';
//задаем минуты секунды
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60)|| '0';

        const minutesTotal = Math.floor(duration / 60)|| '0';
        const secondsTotal = Math.floor(duration % 60)|| '0';

//вывод на страницу
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
    });

        audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });
};