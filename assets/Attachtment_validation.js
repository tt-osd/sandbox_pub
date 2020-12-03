var comment_list = document.getElementById("comment_list");

if (comment_list != null) {

    var each_in_list = comment_list.getElementsByClassName("comment");
    if (each_in_list != null) {

        for (var i = 0; i < each_in_list.length; ++i) {
            var this_attachment = (each_in_list[i].getElementsByClassName('attachments'));
            if (this_attachment != null) {


                for (var x = 0; x < this_attachment.length; ++x) {

                    var time = each_in_list[i].getElementsByTagName('time');
                    if (time != null) {
                        var time_num = time[0].getAttribute("datetime");


                        var today_raw = new Date();
                        var today = today_raw.toJSON()




                        var init = new Date(time_num);
                        var rightNow = new Date(today);
                        var dif = rightNow.getTime() - init.getTime();
                        var dif_in_days = dif / (1000 * 3600 * 24)


                        if (dif_in_days > 30) {
                            this_attachment[x].classList.add("zd_Hidden");
                        }
                    }

                }

            }
        }
    }
}


//the following function is written for request.hbs page

if ((the_url.indexOf("/requests/") > -1) && (the_url.indexOf("new?ticket_form_id") <= -1)) { //IF page is a Request Page (and exclude ticket forms)
    var request_title = document.getElementsByClassName("request-title")[0].innerText;

    /*************************** Request (also known as Request List) page ********************************/
    // GDPR Request Download page
    var gdpr_form_id = mapObject.gdpr_form_ID[searchKey];
    var golf_form_id = mapObject.golf_form_ID[searchKey];
    if (request_title.indexOf(gdpr_form_id) >= 0) {
        $(".comment-form").addClass("zd_Hidden");
        $(".my-activities-nav").addClass("zd_Hidden");
        $(".breadcrumbs").addClass("zd_Hidden");
        $(".request-details").addClass("zd_Hidden");
        $(".request-attachments").addClass("ts-request-attachments");
        $(".attachments").addClass("download-button");
    } else if (request_title.indexOf(golf_form_id) >= 0) {

        $('<div class="comment" id="golf_thank_you"></div>').prependTo('.request-main');
        $("#golf_thank_you").html($("#golf_thank_you_dc").html());
    }
}
/***************************  End Request (also known as Request List) page **********************/
console.log("hi request_page.hbs");