$(function(){
    $('header').hover(
        function(){
            $(this).addClass('active');
        },
        function(){
            $(this).removeClass('active');
        }
    );

    // 헤더를 터치했을 때 active 클래스를 추가
    $('header').on('touchstart', function() {
        $(this).addClass('active');
    });

    // 문서 전체에 클릭 이벤트 추가
    $(document).on('click touchstart', function(event) {
        // 이벤트가 발생한 요소가 헤더 내부인지 확인
        if (!$(event.target).closest('header').length) {
            $('header').removeClass('active');
        }
    });

    // 터치 이동을 방지하여 의도치 않은 동작을 막음
    $('header').on('touchmove', function(event) {
        event.preventDefault();
    });

    $('.vid').hover(
        function() {
            $(this)[0].play();
        },
        function() {
            $(this)[0].pause();
            $(this)[0].currentTime = $(this)[0].currentTime;;
        }
    );
});


$(document).ready(function() {
    $(".card-container").each(function() {
        var $container = $(this);
        var $wrapper = $container.find(".space-card-wrapper, .space-card-content-wrapper");
        var containerOffset = $container.offset();
        var containerWidth = $container.outerWidth();
        var containerHeight = $container.outerHeight();
        $container.on("mousemove", function(e) {
            var mouseX = e.pageX - containerOffset.left;
            var mouseY = e.pageY - containerOffset.top;

            var x = (mouseX / containerWidth);
            var y = (mouseY / containerHeight);

            var translate = "translate3d(" + x + "vw, " + y + "vw, 0) scale3d(1.03, 1.03, 1)";
            $wrapper.css({
                "-webkit-transform": translate,
                "-moz-transform": translate,
                transform: translate,
                "transform-style": "preserve-3d",
                "will-change": "transform",
                "transition": "transform 0.1s ease"
            });
        });

        $container.on("mouseleave", function() {
            var translate = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
            var scale = "scale3d(1, 1, 1)";
            $wrapper.css({
                "-webkit-transform": translate,
                "-moz-transform": translate,
                transform: translate,
                "transform-style": "preserve-3d",
                "will-change": "transform",
                "transition": "transform 0.1s ease"
            });
        });
    });

    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        
        // 시, 분, 초가 한 자리 숫자인 경우 앞에 0을 붙여줍니다.
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var timeString = hours + ":" + minutes + ":" + seconds;
        $('.clock').text(timeString);
    }

    // 매 초마다 현재 시간을 업데이트합니다.
    setInterval(updateClock, 1000);

    // 페이지 로드 시 한 번 현재 시간을 업데이트합니다.
    updateClock();
});

document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector('.pf-project-item-wrapper');
    const bgElement = document.querySelector('.pj-bg');
    const groups = document.querySelectorAll('.group');

    // 모바일 기기 확인
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    function startAnimation() {
        element.style.top = isMobile ? '60vw' : '27vw';

        groups.forEach(group => {
            group.style.opacity = '1';
        });
    }

    element.style.animation = 'slide-in-bck-center 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';

    setTimeout(() => {
        startAnimation();
    }, 1000);

    // Listen for the end of the transition
    element.addEventListener('transitionend', function(event) {
        if (event.propertyName === 'top') {
            bgElement.classList.add('active');

            // Set the opacity of all group elements to 1
            groups.forEach(group => {
                group.style.opacity = '1';
            });
        }
    });

    groups.forEach(group => {
        group.style.opacity = '0';
    });
});