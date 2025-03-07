window.onload = function () {
    const overlay = document.querySelector('.overlay');
    const endingSection = document.querySelector('.ending');
    
    const creditDuration = 16000; 
    const fadeOutTime = 1000; 
    
    setTimeout(() => {
        overlay.style.opacity = '0.3';
        console.log("🔹 Overlay opacity 조정됨");
        
        setTimeout(() => {
            endingSection.classList.add('show-credits');
            console.log("🔹 show-credits 클래스 추가됨");
        }, 500); 
    }, 500); 

    setTimeout(() => {
        console.log("🔹 크레딧 페이드 아웃 시작");
        endingSection.classList.add('hide-credits');

        setTimeout(() => {
            console.log("🔹 크레딧 완전히 사라짐, index.html로 이동!");
            window.location.href = "index.html";
        }, fadeOutTime);
    }, creditDuration - fadeOutTime);
}