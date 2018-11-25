window.onload = function () {
    //背景颜色渐变
    searchOpacityChange();
    //轮播图切换
    lunBoChange();
    //倒计时模块
    countDown();
};

function searchOpacityChange() {
    var jdSearch = document.querySelector(".jd_search");
    var jdBanner = document.querySelector(".jd_banner");
    //获取轮播图控件高度
    var jdBannerHeight = jdBanner.offsetHeight;
    var opacity = 0;
    //监听滚动事件
    window.onscroll = function () {
        //获取滚动的高度
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollHeight < jdBannerHeight) {
            opacity = scrollHeight / jdBannerHeight * 0.85;
        } else {
            opacity = 0.85;
        }
        jdSearch.style.background = 'rgba(201, 21, 35, ' + opacity + ')';
    }
}

function lunBoChange() {
    //获取轮播图外层控件
    var jdBannerBox = document.querySelector('.jd_banner');
    //获取轮播图控件
    var jdBanner = jdBannerBox.querySelector('ul:first-child');
    //获取每个轮播图
    var lunBoEle = jdBanner.querySelectorAll('li');
    //获取轮播图控件的宽度
    var jdBabberWidth = lunBoEle[0].offsetWidth;
    //设置轮播图索引用来控制界面的显示图片，默认为第二张图片，即index = 1
    var jdBannerPoints = jdBannerBox.querySelector('ul:last-child').querySelectorAll('li');
    var index = 1;
    //设置定时器开始自动轮播
    var intervalFun = function () {
        index++;
        startTransition(-index * jdBabberWidth);
    };
    var timer = window.setInterval(intervalFun, 1000);
    jdBanner.addEventListener('transitionend', function () {
        removeTransition();
        if (index == lunBoEle.length - 1) {
            index = 1;
        } else if (index == 0) {
            index = lunBoEle.length - 2;
        }
        jdBanner.style.transform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
        jdBanner.style.webkitTransform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
        setPoint(index - 1);
    });
    var setPoint = function (checkIndex) {
        for (var i = 0; i < jdBannerPoints.length; i++) {
            var lunboPoint = jdBannerPoints[i];
            lunboPoint.classList.remove('now');
        }
        jdBannerPoints[checkIndex].classList.add('now');
    };
    var removeTransition = function () {
        jdBanner.style.transition = 'none';
        jdBanner.style.webkitTransition = 'none';
    };
    var startTransition = function (translateX) {
        //设置css3移动动画属性
        jdBanner.style.transition = 'all 0.2s';
        jdBanner.style.webkitTransition = 'all 0.2s';
        jdBanner.style.transform = 'translateX(' + translateX + 'px)';
        jdBanner.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };
    var startX = 0;
    var distance = 0;
    jdBanner.addEventListener('touchstart', function (e) {
        //获取手指按下的触摸点
        var pointer = e.touches[0];
        //获取手指按下的触摸点的横坐标
        startX = pointer.clientX;
        //关闭定时器
        clearInterval(timer);
    });
    jdBanner.addEventListener('touchmove', function (e) {
        //获取手指移动的触摸点
        var pointer = e.touches[0];
        //获取手指移动的触摸点的横坐标
        var moveX = pointer.clientX;
        //获取差值
        distance = moveX - startX;
        //获取移动偏移后的坐标
        var currentX = -index * jdBabberWidth + distance;
        jdBanner.style.transform = 'translateX(' + currentX + 'px)';
        jdBanner.style.webkitTransform = 'translateX(' + currentX + 'px)';
    });
    jdBanner.addEventListener('touchend', function (e) {
        //手指离开屏幕先判断手指移动距离的长度是否占图片的50%
        var fingerMoveDistance = Math.abs(distance);
        if (fingerMoveDistance > jdBabberWidth / 4) {
            // 移动长度大于四分之一个图片的宽度，则往前后者往后移动一个图片的距离
            // 如果移动的距离为正数，则说明是需要往前移动一个图片的距离，如果为负数，则需要往后移动一个图片的距离
            index = distance > 0 ? index - 1 : index + 1;
        }
        //如果移动长度不超过四分之一个图片，则索引不变
        //设置移动动画
        startTransition(-index * jdBabberWidth);
        //开启自动轮播
        timer = window.setInterval(intervalFun, 1000);
    });
}

function countDown() {
    //倒计时时长2小时
    var totalTime = 39600;
    var hour = 0;
    var min = 0;
    var second = 0;
    //开启倒计时定时器
    var countDownFun = function () {
        totalTime--;
        var countTime = totalTime;
        if (countTime / 3600 > 1) {
            hour = Math.floor(countTime / 3600);
            countTime = countTime - hour * 3600;
        }
        if (countTime / 60 > 1) {
            min = Math.floor(countTime / 60);
            countTime = countTime - min * 60;
        }
        second = countTime;
        var timeViews = document.querySelectorAll('.time .times');
        showTime(timeViews[0], timeViews[1], hour);
        showTime(timeViews[2], timeViews[3], min);
        showTime(timeViews[4], timeViews[5], second);
    };

    function showTime(dom1, dom2, time) {
        if (time >= 10) {
            dom1.innerHTML = Math.floor(time / 10).toString();
            dom2.innerHTML = (time - Math.floor(time / 10) * 10).toString();
        } else {
            dom1.innerHTML = '0';
            dom2.innerHTML = time.toString();
        }
    }

    var countDownTimer = window.setInterval(countDownFun, 1000);

}