document.addEventListener("DOMContentLoaded", function () {
  let roomsClicked = 0;
  const total3DRooms = document.querySelectorAll('.room-3d').length;

  // 1. 초대(Popup) 관련: #invite 이동, 포인터 이벤트 등
  const invite = document.getElementById("invite");
  if (invite) {
    setTimeout(() => {
      invite.classList.add("show");
    }, 1000);

    function moveInvite(e) {
      const offsetX = 20;
      const offsetY = 20;
      invite.style.left = `${e.clientX + offsetX}px`;
      invite.style.top = `${e.clientY + offsetY}px`;
    }
    document.addEventListener("mousemove", moveInvite);

    // 모든 body 자식 요소에 pointerEvents none (단, #invite 제외)
    document.querySelectorAll('body > *:not(#invite)').forEach(function (element) {
      element.style.pointerEvents = 'none';
    });
    invite.style.pointerEvents = 'auto';

    // 클릭 시, 마우스 무브 이벤트 제거
    document.addEventListener("click", function () {
      document.removeEventListener("mousemove", moveInvite);
    });
  }

  // 2. 이름 입력 및 페이지 이동 (rooms.html 또는 welcome.html)
  const nameInput = document.getElementById("nameInput");
  const enterButton = document.querySelector(".enter-button");
  const nameForm = document.getElementById("nameForm");

  if (enterButton && nameInput) {
    enterButton.addEventListener("click", function () {
      let name = nameInput.value.trim();
      if (name !== "") {
        window.location.assign("rooms.html");
      }
    });
  }

  if (nameInput) {
    nameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        let name = this.value.trim();
        if (name !== "") {
          window.location.assign("rooms.html");
        }
      }
    });
  }

  if (nameForm) {
    nameForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = nameInput.value;
      localStorage.setItem("userName", name);
      window.location.href = "welcome.html";
    });
  }

  // 3. 방(Room) 관련: 3D 요소 hover 효과
  document.querySelectorAll(".room").forEach((room) => {
    const room3d = room.querySelector(".room-3d");
    if (!room3d) return;
    room.addEventListener("mouseover", () => {
      room3d.style.opacity = "1";
    });
    room.addEventListener("mouseout", () => {
      room3d.style.opacity = "0";
    });
  });


const toggleButton = document.getElementById("toggle-button");
const container = document.querySelector(".container");
const popup = document.querySelector(".popup");
const popupMessage = document.getElementById("popupMessage");
let blinkInterval;


const lightSound = new Audio("light-sound.mp3");


function changeMessage(message, styleClass) {
  popupMessage.innerHTML = message;
  popupMessage.classList.remove("message1", "message2", "message3");
  popupMessage.classList.add(styleClass); 
}

if (toggleButton && container && popup) {
  toggleButton.addEventListener("click", function () {
  
    container.classList.toggle("dark-mode");
    

    lightSound.currentTime = 0; 
    lightSound.play();

  
    toggleButton.style.animation = "none";
    toggleButton.style.opacity = "1";
    clearInterval(blinkInterval);


    if (container.classList.contains("dark-mode")) {
      setTimeout(function () {
        changeMessage("불이 꺼지니 나비가 나타났다. 나비를 눌러보자.", "message1"); 
        popup.style.display = "block";
      }, 1000);
    }
  });
}

  // 5. 손전등 효과 (spotlight)
  const spotlight = document.createElement("div");
  spotlight.classList.add("spotlight");
  document.body.appendChild(spotlight);
  document.addEventListener("mousemove", (event) => {
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--spotlight-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--spotlight-y", `${event.clientY}px`);
    });
  });

  // 6. 뒤로가기 버튼
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

// 7. 방의 3D 요소 클릭 시 전체화면 비디오 재생 및 클릭 추적
document.querySelectorAll(".room .room-3d").forEach((room3d) => {
  room3d.addEventListener("click", function (e) {
    e.stopPropagation();

    room3d.dataset.playing = 'true';

    const videoSrc = room3d.getAttribute("data-video");
    if (!videoSrc) return;
    
    // Create video container
    const videoContainer = document.createElement("div");
    videoContainer.style.position = "fixed";
    videoContainer.style.top = "0";
    videoContainer.style.left = "0";
    videoContainer.style.width = "100vw";
    videoContainer.style.height = "100vh";
    videoContainer.style.zIndex = "12000";
    
    // Create video element
    const video = document.createElement("video");
    video.src = videoSrc;
    video.autoplay = true;
    video.controls = false;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    
    // Create stop button
    const stopButton = document.createElement("button");
    stopButton.classList.add("icon-button");
    stopButton.style.position = "absolute";
    stopButton.style.top = "20px";
    stopButton.style.left = "20px";
    stopButton.style.width = "50px";
    stopButton.style.height = "50px";
    stopButton.style.backgroundImage = "url('icon1.png')";
    stopButton.style.backgroundSize = "contain";
    stopButton.style.backgroundRepeat = "no-repeat";
    stopButton.style.backgroundColor = "transparent";
    stopButton.style.border = "none";
    stopButton.style.zIndex = "12001";
    stopButton.style.cursor = "pointer";
    
    // Add elements to the DOM
    videoContainer.appendChild(video);
    videoContainer.appendChild(stopButton);
    document.body.appendChild(videoContainer);

    // 최소 재생 시간 (예: 5초)을 확인하기 위한 변수
    let hasPlayedEnough = false;
    const minPlayTime = 1; // 초 단위
    
    // 최소 재생 시간 체크
    setTimeout(() => {
      hasPlayedEnough = true;
    }, minPlayTime * 1000);

    // Stop button click handler
    stopButton.addEventListener("click", function() {
      video.pause();
      videoContainer.remove();
      
      // 최소 시간 이상 재생되었다면 시청한 것으로 인정
      if (hasPlayedEnough && !room3d.dataset.clicked) {
        room3d.dataset.clicked = 'true';
        roomsClicked++;
        
        // 모든 영상을 시청했는지 확인
        if (roomsClicked === total3DRooms) {
          window.location.href = "credit.html";
        }
      }
      
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
      }
    });

    // Enter fullscreen
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    }

    // Back button handling
    backButton.style.display = "block";
    backButton.addEventListener("click", function () {
      window.location.href = "rooms.html";
    });

    // Video ended event
    video.addEventListener("ended", function () {
      // 영상이 끝났을 때만 클릭으로 카운트
      if (!room3d.dataset.clicked) {
        room3d.dataset.clicked = 'true';
        roomsClicked++;
        
        // 모든 영상을 시청했는지 확인
        if (roomsClicked === total3DRooms) {
          window.location.href = "credit.html";
        }
      }
      
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
      }
      
      videoContainer.remove();
    });
  });
});
  // 8. welcome.html에서 이름 표시
  const displayNameEl = document.getElementById("displayName");
  if (displayNameEl) {
    const storedName = localStorage.getItem("userName") || "Guest";
    displayNameEl.textContent = storedName;
  }

  // 9. 팝업 관련: okay-button 클릭 이벤트
  const popupOkayButton = document.querySelector(".okay-button");
  const welcomeText = document.querySelector(".popup h1");
  if (popupOkayButton) {
    popupOkayButton.addEventListener("click", function () {
     
      if (
        popupMessage.innerText === "방의 불을 꺼볼까?" ||
        popupMessage.innerText === "불이 꺼지니 나비가 나타났다. 나비를 눌러보자."
      ) {
        popup.style.display = "none";
      } else {
    
        changeMessage("방의 불을 꺼볼까?", "message2");
        if (welcomeText) welcomeText.style.display = "none";
        if (displayNameEl && displayNameEl.parentElement) {
          displayNameEl.parentElement.style.display = "none";
        }
        blinkInterval = setInterval(function () {
          toggleButton.style.opacity = toggleButton.style.opacity === "1" ? "0" : "1";
        }, 500);
      }
    });
  }

  // 10. 무활동 타이머
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      window.location.href = "index.html";
    }, 60000);
  }

  let idleTimer;
  document.addEventListener("mousemove", resetIdleTimer);
  resetIdleTimer();
});


document.addEventListener("DOMContentLoaded", function() {
  const letterContainer = document.getElementById('letterContainer');
  const letterImage = document.getElementById('letterImage');


  function showLetter() {

    letterContainer.classList.remove('hidden');
    letterImage.classList.remove('fade-out');
    
  
    const autoHideTimer = setTimeout(hideLetter, 5000);
    

    letterImage.addEventListener('mouseover', () => {
      clearTimeout(autoHideTimer);
      hideLetter();
    });
    
    letterImage.addEventListener('click', () => {
      clearTimeout(autoHideTimer);
      hideLetter();
    });
  }


  function hideLetter() {
  
    letterImage.classList.add('fade-out');
    
 
    setTimeout(() => {
      letterContainer.classList.add('hidden');
    }, 1000);
  }


  showLetter();
});
document.addEventListener("click", function () {
  const bgm = document.getElementById("bgm");
  const bgmStatus = sessionStorage.getItem("bgmStatus");

  // 음악이 재생 중이었다면 재생 시작
  if (bgmStatus === "playing") {
    bgm.play().catch(function(error) {
      console.log("오디오 자동 재생 실패", error);
    });
  }
});
// index.html과 rooms.html에서 사용할 script.js에 추가할 코드

document.addEventListener("DOMContentLoaded", function() {
  const bgm = document.getElementById("bgm");
  
  // 페이지가 로드될 때 이전 페이지에서 저장된 배경음악 시간 확인
  const savedTime = localStorage.getItem("bgmCurrentTime");
  if (savedTime) {
    bgm.currentTime = parseFloat(savedTime);
  }
  
  // 자동 재생 정책 때문에 사용자 상호작용이 필요할 수 있음
  bgm.play().then(() => {
    // 성공적으로 재생 시작
    localStorage.setItem("bgmStatus", "playing");
  }).catch(error => {
    // 자동 재생 실패 (사용자 상호작용 필요)
    console.log("자동 재생 실패:", error);
    localStorage.setItem("bgmStatus", "paused");
    
    // 페이지에 클릭 이벤트 리스너 추가
    document.addEventListener("click", function bgmPlayHandler() {
      bgm.play().then(() => {
        localStorage.setItem("bgmStatus", "playing");
        // 이벤트 리스너 제거 (한 번만 실행)
        document.removeEventListener("click", bgmPlayHandler);
      });
    }, { once: true });
  });
  
  // 페이지 이탈 시 현재 재생 시간 저장
  window.addEventListener("beforeunload", function() {
    if (!bgm.paused) {
      localStorage.setItem("bgmCurrentTime", bgm.currentTime.toString());
      localStorage.setItem("bgmStatus", "playing");
    } else {
      localStorage.setItem("bgmStatus", "paused");
    }
  });
  
  // 음악 재생/일시정지 제어 기능 추가 (선택사항)
  // 예: ESC 키로 음악 켜고 끄기
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      if (bgm.paused) {
        bgm.play();
        localStorage.setItem("bgmStatus", "playing");
      } else {
        bgm.pause();
        localStorage.setItem("bgmStatus", "paused");
      }
    }
  });
});