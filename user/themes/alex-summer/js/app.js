$(document).ready(function() {
    $('.mainmenu__burger').click(function() {
        $("ul.mainmenu").toggleClass('mainmenu--show'); //dropdown animation
        $('.mainmenu__dropdown-bg').toggleClass('mainmenu__dropdown-bg--show'); //background animation
        $(this).toggleClass('mainmenu__burger--x'); //icon animation
    });
});