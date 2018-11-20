window.onload = function () {
    //背景颜色渐变
    searchOpacityChange();
    //轮播图切换
    lunBoChange();
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
            opacity = scrollHeight / jdBannerHeight * 0.85
        } else {
            opacity = 0.85
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
    var index = 1;
    //设置定时器开始自动轮播
    var timer = window.setInterval(function () {
        index++;
        //将轮播图控件用css3动画属性进行包裹
        jdBanner.style.transition = 'all 0.2s';
        //设置移动端的css3兼容性
        jdBanner.style.webkitTransition = 'all 0.2s';
        //每隔三秒进行移动
        jdBanner.style.transform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
        jdBanner.style.webkitTransform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
    }, 3000);
    jdBanner.addEventListener('transitionend', function () {
        if (index == lunBoEle.length - 1) {
            jdBanner.style.transition = 'none';
            jdBanner.style.webkitTransition = 'none';
            index = 1;
        } else if (index == 0) {
            jdBanner.style.transition = 'none';
            jdBanner.style.webkitTransition = 'none';
            index = lunBoEle.length - 2;
        }
        jdBanner.style.transform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
        jdBanner.style.webkitTransform = 'translateX(' + (-index * jdBabberWidth) + 'px)';
    })

}
