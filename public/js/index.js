$(function(){
    $('.header-box .item').click(function(){
        $(this)
        .addClass('click-it')
        .siblings()
        .removeClass('click-it')
    })   
   
   
    var sendData = $('.dropdown-toggle .username').text()  
    localStorage.setItem('username',sendData)  
})
window.onload = ()=>{
        var pos = $('.header-box').offset();// offset() 获得div1当前的位置，左上角坐标(x,y)
        $(window).scroll(function () { //滚动条滚动事件
        if ($(this).scrollTop() > pos.top) {
        $('.header-box').css('width', '100%').css('top', $(this).scrollTop() - pos.top);
        console.log('guding');
        }else if ($(this).scrollTop() <= pos.top) {
        $('.header-box').css('width', '100%').css('top', 0).css('position', 'relative');
        console.log('nonono');
    }
    })
}



   