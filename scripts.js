document.addEventListener('DOMContentLoaded', function() {
	var containers = document.querySelectorAll('.container1');
	
	// Choosing audio from data-audio from each <div class="container1"> 
	containers.forEach(function(container){
		var audioSrc = container.getAttribute('data-audio'); // selecting audio from data-audio
		var music = new Audio(audioSrc);
		music.preload = "auto";
	// no need in "});" here cause it's all structured like that, at least for now 

	// Cursor enters <div> field and fadeInMusic(music) is called
	container.addEventListener('mouseover', function() {
		fadeInMusic(music);
		fadeInBoimage();
		
        var backgroundImage = container.getAttribute('data-background');
        document.querySelector('.background-overlay').style.backgroundImage = 'url(' + backgroundImage + ')';
		});
		
	// Cursor leaves <div> field and fadeOutMusic(music) is called
	container.addEventListener('mouseout', function(){
		fadeOutMusic(music);
		fadeOutBoimage();
        });
	
	
	// Обход политики браузера, когда пользователь должен 
	// провзаимодействовать со страницей, например кликнуть где угодно
	// чтобы при mouseover начинала играть музыка
	// в противном случае если не заставлять пользователя кликнуть
	// музыка вообще не будет воспроизводится
	container.addEventListener('click', function() {
            fadeInMusic(music);
            music.play().catch(function(error) {
                console.error("Failed to play audio:", error);
            });
        });
	});
	
	// making background-overlay to work properly with image to appear with fade-in 
	// and disappear with fade-out
	var bo_opacity = 0.0;
	var fadeInIntervalImg;
	var fadeOutIntervalImg;
	
	function fadeInBoimage() {
		clearInterval(fadeOutIntervalImg);
		fadeInIntervalImg = setInterval(function() {
			if (bo_opacity < 1) {
				bo_opacity += 0.01;
				if (bo_opacity > 1){
					bo_opacity = 1; // ensuring volume never goes higher then 1
				}
				document.querySelector('.background-overlay').style.opacity=bo_opacity;
			} else {
				clearInterval(fadeInIntervalImg);
			}
		}, 10);
	}
	
	function fadeOutBoimage() {
        clearInterval(fadeInIntervalImg);
        fadeOutIntervalImg = setInterval(function() {
            if (bo_opacity > 0) {
                bo_opacity -= 0.01;
                if (bo_opacity < 0) {
                    bo_opacity = 0; // ensuring volume never goes lower then 0
                }
                document.querySelector('.background-overlay').style.opacity = bo_opacity;
            } else {
                clearInterval(fadeOutIntervalImg);
				document.querySelector('.background-overlay').style.backgroundImage = '';
            }
        }, 10);
    }


	// Fade-in so music starts with ease-in
	function fadeInMusic(audio) {
		var volume = 0.1;
		var fadeInInterval; // globally stating fadeInInterval and fadeOutInterval 
		var fadeOutInterval; // for function to work properly
		
		clearInterval(audio.fadeOutInterval);
		fadeInInterval = setInterval(function() {
			if (volume < 1) {
				volume += 0.02;
				if (volume > 1){
					volume = 1; // ensuring volume never goes higher then 1
				}
				audio.volume=volume;
			} else {
				clearInterval(audio.fadeInInterval);
			}
		}, 10);
		audio.currentTime = 0;
		audio.play();
	}
	
	// Fade-out so music stops with ease-out
	function fadeOutMusic(audio) {
        var volume = audio.volume;
        var fadeOutInterval;
		clearInterval(audio.fadeInInterval);
        fadeOutInterval = setInterval(function() {
            if (volume > 0) {
                volume -= 0.02;
                if (volume < 0) {
                    volume = 0; // ensuring volume never goes lower then 0
                }
                audio.volume = volume;
            } else {
                clearInterval(fadeOutInterval);
                audio.pause();
                audio.currentTime = 0;
            }
        }, 10);
    }
	
	// Making clickcover to dissapear when you click anywhere or press any key
	function togglePointerEvents(value) {
			var clickCover = document.getElementById('clickCover');
			clickCover.style.pointerEvents = value;
			}
			
	function handleFirstClick() {
			var clickCover = document.getElementById('clickCover'); // Select the black cover element
			clickCover.style.opacity = '0';
			togglePointerEvents((clickCover.style.opacity === '0') ? 'none' : 'auto');
			document.removeEventListener('click', handleFirstClick); // Remove the event listener
			document.removeEventListener('keydown', handleFirstClick);
			}
	document.addEventListener('click', handleFirstClick); 
	document.addEventListener('keydown', handleFirstClick)
	/* Makes js to listen when clicks for the first time and
	calls out a function handleFirstClick which makes */
});

