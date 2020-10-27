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


                        console.log("time_num " + time_num);
                        console.log("today " + today);

                        var init = new Date(time_num);
                        var rightNow = new Date(today);
                        var dif = rightNow.getTime() - init.getTime();
                        var dif_in_days = dif / (1000 * 3600 * 24)

                        console.log("DIFF in days" + dif_in_days)
                        if (dif_in_days > 30) {
                            this_attachment[x].classList.add("zd_Hidden");
                        }
                    }

                }

            }
        }
    }
}