$(document).ready(function(){
    "use strict";
    var html="";
    var i =1;
    var j=1;
    var n=1;
    while(n<13){
        html="<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='imageThumbnail'>test"+ i++ +"</div></li>";
        $('#main ul').html($('#main ul').html()+html);
        //j= (j==4) ? 1 : ++j; 
        n++;           
    }
    $('.moreImages').click(function(){
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        var n=1;
        while(n<7){
            html="<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='imageThumbnail'>test"+ i++ +"</div></li>";
            $('#main ul').html($('#main ul').html()+html);
           // j= (j==4) ? 1 : ++j; 
            n++;           
        }

    });
    $(window).scroll(function () {
        $('.moreImages').hide();
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            var n=1;
            while(n<7){
                html="<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='imageThumbnail'>test"+ i++ +"</div></li>";
                $('#main ul').html($('#main ul').html()+html);
                //j= (j==4) ? 1 : ++j;
                n++;
            }
        }
    });

    //modals
        /*click on imageThumbnail*/
    $(document).on("click", '#main ul li', function(event) {
        /*var imageThumbnailNum = $(this).find("input[type=hidden]").val();
        var imageThumbnail = $.parseJSON(sessionStorage.getItem("posts"))[imageThumbnailNum];*/
        //Populate data from session
        var test = $(this).find('div').text();
        var html = "";
        html += "<p>" + "Name: " +test+ "<p>";
        html += "<p>" + "Age: " + "</p>"
        /*html += "<span class='pledge'>Pledged: " + currencyMap[imageThumbnail.currency] + imageThumbnail["amt.pledged"] + "</span><br>";
        html += "<span class='backers'>Backers: " + imageThumbnail["num.backers"] + "</span><br>";
        html += "<span>Percentage funded: " + imageThumbnail["percentage.funded"] + "%</span><br>";
        html += "<span>Location: " + imageThumbnail.location + "," + imageThumbnail.country + "(" + imageThumbnail.type + ")" + "</span><br>";*/
        $('.modal-title h4').html("Edit "+test+ "'s details");
        $('.modal-body').html(html);
       /* $('.modalFooter a').attr('href', "https://www.kickstarter.com/" + imageThumbnail.url);*/
        $('#imageThumbnailModal').css('display', 'block');
        $('#imageThumbnailModal').css('visibility', 'visible');

    });

     /*close button*/
    $('.close, .closeButton').click(function() {
        $('#imageThumbnailModal').fadeOut();
        /*$('#imageThumbnailModal').css('display', 'none');
        $('#imageThumbnailModal').css('visibility', 'hidden');*/
    });
});
