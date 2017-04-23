$(window).load(function() {

    if (window.location.hash == '#_=_') {
     
      window.location.hash = '';
    }

    $.ajax({
        method:"GET",
        url:'/loggedOnUser',
        success:function(res){
          // console.log(res);
           if(res.loggedon === true){
                window.location.href='/profile';
           }
           else{

                if($("#app-container #login").hasClass('hide')){

                    $('#app-container #login').removeClass('hide');
                    $('#app-container #login').addClass('show');
                }
                else{
                    $('#app-container #login').removeClass('show');
                    $('#app-container #login').addClass('hide');
                }
            }
        },
        error:function(err){
            console.log(err);
        }
    })
})

$(document).ready(function() {

});