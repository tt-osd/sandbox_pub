 function insertSubTitle() {

     //for new home page 
     var subtitles = document.getElementsByClassName("home_category_sub_title");
     var home_category_sub_title_dc = document.getElementsByClassName("home_category_sub_title_dc");
     for (let item of subtitles) {
         //find all the subtitles and loop through for inserting

     }


     for (var i = 0; i < subtitles.length; i++) {
         subtitles[i].innerHTML = home_category_sub_title_dc[i].innerHTML;
     }

     //for new home page 

 }



 if (navigator.userAgent.indexOf('Windows') != -1) {
     $('.explore').addClass("explore_WINDOWS");
 }




 insertSubTitle();