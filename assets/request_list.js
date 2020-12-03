   /*************************** Repair page or requests page ********************************/
   //move this function to the requests.hbs
   var lastPart = the_url.substr(the_url.lastIndexOf('/') + 1);
   if ((lastPart === "requests") || (lastPart === "requests#repairs")) { // if the end of the url is requests  
       var submit_btn_form = document.getElementById("new_request");
       if (submit_btn_form == null) {
           // in side this if statement means not a request page after form failed submission
           var requestsPage = document.getElementById("requests");
           var repairsPage = document.getElementById("repairs");
           repairsPage.classList.add("zd_Hidden");
           var current = document.getElementsByClassName("current")[0];
           var repairsHeader = document.getElementById('repairs_header');
           var requestsHeader = document.getElementById('requests_header');

           repairsHeader.onclick = function() {
               if (!repairsPage.style.display || repairsPage.style.display === "none") {
                   repairsPage.classList.remove("zd_Hidden");
                   requestsPage.classList.add("zd_Hidden");
                   repairsHeader.classList.add("current");
                   requestsHeader.classList.remove("current");
               }
           };
           if (the_url.indexOf("/requests#repairs") != -1) {
               repairsPage.classList.remove("zd_Hidden");
               requestsPage.classList.add("zd_Hidden");
               repairsHeader.classList.add("current");
               requestsHeader.classList.remove("current");
           }
       }


       /*************************** End Repair page or requests page ********************************/
   } // end if the end of the url is requests  

   console.log("hello requests_page.hbs");