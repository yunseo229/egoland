document.addEventListener("DOMContentLoaded", function () {

    setTimeout(() => {
      document.getElementById("invite").classList.add("show");
    }, 1000); 
  
    const invite = document.getElementById("invite");
  
    function moveInvite(e) {
      const offsetX = 20; 
      const offsetY = 20;
      invite.style.left = `${e.clientX + offsetX}px`;
      invite.style.top = `${e.clientY + offsetY}px`;
    }
    document.addEventListener("mousemove", moveInvite);
  

    document.querySelectorAll('body > *:not(#invite)').forEach(function (element) {
      element.style.pointerEvents = 'none';
    });
    invite.style.pointerEvents = 'auto';
  

    document.addEventListener("click", function () {
      document.removeEventListener("mousemove", moveInvite); 
    });
  

    const nameInput = document.getElementById("nameInput");
    const enterButton = document.querySelector(".enter-button");
  

    function submitName() {
      const name = nameInput.value.trim();
      if (name !== "") {
        localStorage.setItem("userName", name);
        window.location.href = "rooms.html"; 
      } else {
        alert("이름을 입력해 주세요!");
      }
    }
  
    if (enterButton) {
      enterButton.addEventListener("click", function () {
        submitName();
      });
    }
  

    if (nameInput) {
      nameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          submitName();
        }
      });
    }
  

    const nameForm = document.getElementById("nameForm");
    if (nameForm) {
      nameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name !== "") {
          localStorage.setItem("userName", name);
          window.location.href = "welcome.html";
        }
      });
    }
  
  
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
    if (toggleButton && container) {
      toggleButton.addEventListener("click", () => {
        container.classList.toggle("dark-mode");
      });
    }
  
    const spotlight = document.createElement("div");
    spotlight.classList.add("spotlight");
    document.body.appendChild(spotlight);
    document.addEventListener("mousemove", (event) => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--spotlight-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--spotlight-y", `${event.clientY}px`);
      });
    });
  
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
      });
    }
  
    document.querySelectorAll(".room .room-3d").forEach((room3d) => {
      room3d.addEventListener("click", function (e) {
        e.stopPropagation();
        const videoSrc = room3d.getAttribute("data-video");
        if (!videoSrc) return;
  
        const video = document.createElement("video");
        video.src = videoSrc;
        video.autoplay = true;
        video.controls = false;
        video.style.position = "fixed";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100vw";
        video.style.height = "100vh";
        video.style.objectFit = "cover";
        video.style.zIndex = "11000";
  
        document.body.appendChild(video);
  
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
  
        video.addEventListener("ended", function () {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
          } else if (document.msFullscreenElement) {
            document.msExitFullscreen();
          }
          video.remove();
        });
      });
    });
  

    const displayNameEl = document.getElementById('displayName');
    if (displayNameEl) {
      const storedName = localStorage.getItem('userName') || 'Guest';
      displayNameEl.textContent = storedName;
    }
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
  // script.js (index.html용)
document.addEventListener("DOMContentLoaded", function () {
  const bgm = document.getElementById("bgm");
  
  // 기존 코드는 유지
  
  // 페이지가 로드될 때 이전 페이지의 재생 시간 확인
  const savedTime = localStorage.getItem("bgmCurrentTime");
  if (savedTime) {
    bgm.currentTime = parseFloat(savedTime);
  }
  
  // 자동 재생 시도
  bgm.play().then(() => {
    localStorage.setItem("bgmStatus", "playing");
  }).catch(error => {
    console.log("자동 재생 실패:", error);
    localStorage.setItem("bgmStatus", "paused");
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
  
  // 아래는 기존 코드 계속...
  setTimeout(() => {
    document.getElementById("invite").classList.add("show");
  }, 1000);
  
  // ... 나머지 코드 ...
});

// scripts2.js (rooms.html용)
document.addEventListener("DOMContentLoaded", function () {
  const bgm = document.getElementById("bgm");
  
  // 배경음악 연속 재생 처리
  const savedTime = localStorage.getItem("bgmCurrentTime");
  if (savedTime) {
    bgm.currentTime = parseFloat(savedTime);
  }
  
  // 자동 재생 시도
  bgm.play().then(() => {
    localStorage.setItem("bgmStatus", "playing");
  }).catch(error => {
    console.log("자동 재생 실패:", error);
    localStorage.setItem("bgmStatus", "paused");
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
  
  // 아래는 기존 코드 계속...
  let roomsClicked = 0;
  const total3DRooms = document.querySelectorAll('.room-3d').length;
  
  // ... 나머지 코드 ...
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