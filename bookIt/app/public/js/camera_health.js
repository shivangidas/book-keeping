$(document).ready(function() {
    "use strict";
    $.ajax({
        "url": "api/v1/camera",
        "type": "GET",
        "headers": { "x-access-token": sessionStorage.getItem('token') },
        success: function(data) {
            //console.log( data);
            //TODO: find actual number of cameras online
            $('#camerasOnline').text(data.length);
            var html = "";
            for (var count = 0; count < data.length; count++) {
                if (data[count].image) {
                    html = "<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='camHealthThumbnail'>" + data[count].image + "</div><label class='cameraname'>" + data[count].CameraName + "</label><input type='hidden' class='cameraid' value='" + data[count].id + "'></li>";
                } else {
                    html = "<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='camHealthThumbnail'><img src='' alt='No snapshot available'/></div><label class='cameraname'>" + data[count].CameraName + "</label><input type='hidden' class='cameraid' value='" + data[count].id + "'></li>";
                }
                $('#main ul').html($('#main ul').html() + html);


            }

        },
        error: function(error) {

        }
    })
    /*    $(window).scroll(function() {
            $('.moreImages').hide();
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                var n = 1;
                while (n < 7) {
                    html = "<li class='col-xs-6 col-sm-4 col-md-3 col-lg-2'><div class='imageThumbnail'>test" + i++ + "</div></li>";
                    $('#main ul').html($('#main ul').html() + html);
                    //j= (j==4) ? 1 : ++j;
                    n++;
                }
            }
        });*/

    //modals
    /*click on imageThumbnail*/
    $(document).on("click", '#main ul li', function(event) {
        var name = $(this).find('label').text();
        var cameraid = $(this).find('input.cameraid').val();
        console.log(cameraid);
        //TODO: get info using camera id
        //API request
        var html = "";
        html += "<p>" + "Name: " + name + "<p>";
        html += "<p>" + "IP Address: " + "</p>";
        $('.modal-title h4').html(name);
        $('.modal-body').html(html);
        /* $('.modalFooter a').attr('href', "https://www.kickstarter.com/" + imageThumbnail.url);*/
        $('#imageThumbnailModal').css('display', 'block');
        $('#imageThumbnailModal').css('visibility', 'visible');

    });

    /*close button*/
    $('.close, .closeButton').click(function() {
        $('#imageThumbnailModal').fadeOut();
    });

    //filter

    $("#filterText").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#main ul li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});