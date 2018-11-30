var startY = 0;
var distance = 0;
var nowPosition = 0;
var ul = document.querySelector('.jd_content .jd_content_left ul');
var ulHeight = ul.offsetHeight;
var jdContentHeight = document.querySelector('.jd_layout').offsetHeight;
var jdPaddingTop = parseInt(getComputedStyle(document.querySelector('.jd_layout'),false)['paddingTop']);
ul.addEventListener('touchstart',function (e) {
    startY = e.touches[0].clientY;
    console.log(jdPaddingTop)
});

ul.addEventListener('touchmove',function (e) {
    var moveY = e.touches[0].clientY;
    distance = moveY - startY;
    nowPosition +=  distance;
    startY = moveY;
    ul.style.transform = 'translateY('+nowPosition+'px)';
    ul.style.webkitTransform = 'translateY('+nowPosition+'px)';
});

ul.addEventListener('touchend',function (e) {
    if(nowPosition > 0){
        nowPosition = 0;
        startTrinsion(ul,nowPosition);
    }else {
        if(ulHeight <= jdContentHeight){
            nowPosition = 0;
            startTrinsion(ul,nowPosition);
        }else {
            console.log((ulHeight - Math.abs(nowPosition))+'====='+(jdContentHeight - jdPaddingTop));
            if (ulHeight - Math.abs(nowPosition) < jdContentHeight - jdPaddingTop) {
                nowPosition = jdContentHeight - ulHeight-jdPaddingTop;
                startTrinsion(ul,nowPosition);
            }
        }
        ul.style.transition = 'none';
        ul.style.webkitTransition = 'none';
    }
    startY = 0;
    distance = 0;
});