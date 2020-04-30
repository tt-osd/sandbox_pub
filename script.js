/* PLESAE READ - There are 2 document ready functions one is below in DOMContentLoaded and there is (document).ready at the bottom if you require the whole document to load */

document.addEventListener('DOMContentLoaded', function() { // **** Include all JS in this function

    //general cookie functions
    //levitt 

    function read_cookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };


    function set_cookie(name, value, time) {
        var CookieDate = new Date();
        var today = new Date();

        CookieDate.setTime(today.getTime() + time);
        document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; expires=' + CookieDate.toGMTString() + ';';
    };


       //DDA386 SSO login redirect 
  
  //call this function when user trigger the login function
  // read_cookie() and set_cookie() function is pre created. 
  function createSSOcookie(){
    if (read_cookie("sso") === ""){  
   var current_url= window.location.href;
   var encode_current_url=encodeURIComponent(current_url);
   set_cookie("sso",encode_current_url,60000);
  }
}

//call this function after user login and being automatically redirected to homepage by zendesk 
//read cookie function is pre created
function redirectAfterLogin(){
  var sso_encoded=read_cookie("sso");
  if (sso_encoded != ""){
   var sso_decode=decodeURIComponent(sso_encoded);
    window.location.href = sso_decode;
   } 
}
 

//two dummy buttons to test the functions
/* $("#sso_cookie").click(function(){
createSSOcookie();
});

 $("#sso_redirect").click(function(){
redirectAfterLogin();
});*/

//DDA386 SSO login redirect 






    function ga_tracking(event_category, event_action, event_label) {
        utag.link({
            'event_category': event_category,
            'event_action': event_action,
            'event_label': event_label
        });
    };


    var cookie_name = " ";
    var cookie_value = " ";
    var cookie_time = 0;
    //general cookie functions

    function post_decline_tt_settings() {
        $("#cookie_bar_buttons_post_close").removeClass("zd_Hidden");
        $("#cookie_bar_buttons_decline").addClass("zd_Hidden");
        $("#cookie_bar_buttons_accept").addClass("zd_Hidden");

        $("#cookie_bar_content").addClass("zd_Hidden");
        $("#cookie_bar_post_decline_text").removeClass("zd_Hidden");
    }


    //the functions returns an array with two elements only
    //the first element declares the accepted:true
    // the second element declares the all:true or all:false
    function read_tt_setting_value(val_array) {

        var tt_value = [];

        for (i = 0; i < val_array.length; i++) {
            if ((val_array[i]) == '"accepted":true') {
                tt_value.push('"accepted":true');
            }
            if ((val_array[i]) == '"all":true') {
                tt_value.push('"all":true');
            }
            if ((val_array[i]) == '"all":false') {
                tt_value.push('"all":false');
            }

        }

        return tt_value;

    }




    //check TT setting cookie 
    var isTTSettingscookieSet = read_cookie('tt_settings');
    var decode_isTTSettingscookieSet = decodeURIComponent(isTTSettingscookieSet);
    var array_tt_settings = decode_isTTSettingscookieSet.split(",");



    if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":false')) {
        $("#tt_cookie_bar").removeClass("zd_Hidden");
        post_decline_tt_settings();

    } else if ((read_cookie("tt_settings")) === "") {
        $("#tt_cookie_bar").removeClass("zd_Hidden");
    } else { //has accepted tt_settings cookie with value all true
    }


    //cookie bar
    $(".cookie_bar_buttons").click(function() {

        var tt_setting_bol_value = "";
        var initial_tt_setting_array = '';
        var encode_tt_setting = '';
        var tt_setting_url = document.location;

        if ((this.id) == 'cookie_bar_buttons_accept') {

            $(".cookie_bar").hide();
            tt_setting_bol_value = "true";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);




        } else if ((this.id) == 'cookie_bar_buttons_decline') {

            post_decline_tt_settings();
						$(".cookie_bar").hide();
            tt_setting_bol_value = "false";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);


        } else {
            $(".cookie_bar").hide();
        }

    });

    //cookie bar


    // exit survey 
    // initialize variables
    var survey_trigger = 5; //5px in the top of document
    var altitude = 0;
    //define default variable for google analytics event label
    var ga_tracking_label = " ";
    //define default variable for google analytics event action
    var ga_tracking_action = " ";
    //define default variable for google analytics event action
    var ga_tracking_category = " ";


    //initial exit survey 
    var TimeOutId = setTimeout(function() {
            $("body").on('mousemove', function(event) {
                altitude = event.clientY;
                if (altitude <= survey_trigger) {
                    if (read_cookie("exit_survey") === "") {
                        if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
                            $('#survey_modal').removeClass("zd_Hidden");
                        }
                    }
                }
            });
        },
        20000);

    //mobile version

    var h = window.screen.height;
    var indexx = h * 0.65;
    //alert(indexx);
    window.ontouchmove = function() {
        survey_on_mobile();
    };

    function survey_on_mobile() {

        if (document.body.scrollTop > indexx || document.documentElement.scrollTop > indexx) {

            if (read_cookie("exit_survey") === "") {

                if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
                    $('#survey_modal').addClass("zd_Hidden");
                }

            }
        }
    };

    //mobile version

    //initial exit survey

    //click on the check box of exit survey 
    $("#agree").click(function() {
        document.getElementById("checkboxMSG").click();
        var x = document.getElementById("checkboxMSG").checked;
        if (x) {
            document.getElementById("checkboxMSG").checked = false;
        } else {
            document.getElementById("checkboxMSG").checked = true;
        }
        $("#agree_inner").toggleClass("zd_Hidden");

    });
    //click on the check box of exit survey 

    //click on the exit survey blank area to close the survey.
    $("#survey_modal").click(function(e) {
        if (e.target != this) {

            return false;
        } else {
            if ((this.id) == 'survey_modal') {
                $('#survey_modal').addClass("zd_Hidden");
                ga_tracking_label = "close";
                ga_tracking_category = "happy customer"
                cookie_name = "exit_survey";
                cookie_value = "close";
                if ($('#checkboxMSG').is(':checked')) {
                    cookie_time = 3600000 * 24 * 30;
                    ga_tracking_action = "dnr";
                } else {
                    cookie_time = 45000;

                }

                ga_tracking(ga_tracking_category, ga_tracking_action, ga_tracking_label);
                set_cookie(cookie_name, cookie_value, cookie_time);
            }
        }
    });
    //click on the exit survey blank area to close the survey.

    //give feedback to exit survey 
    $(".op").click(function() {
        var option_id = this.id;
        cookie_name = "exit_survey";
       ga_tracking_category = "happy customer"


        if (option_id == 'option_yes') {
            ga_tracking_label = "yes";
            cookie_value = "helpful";
        } else {
            ga_tracking_label = "no";
            cookie_value = "unhelpful";
        }


        if ($('#checkboxMSG').is(':checked')) {
            cookie_time = 3600000 * 24 * 14;
            ga_tracking_action = "dnr";
        } else {
            cookie_time = 3600000 * 24 * 7;
        }

        $('#greetings').text($('#es_thx').text());
        $(".option_container,.check_box_area").hide();

        $(document).mousemove(function(event) {
            $('#survey_modal').addClass("zd_Hidden");
        });
        $(document).scroll(function(event) {

            $('#survey_modal').addClass("zd_Hidden");
        });
 ga_tracking(ga_tracking_category, ga_tracking_action, ga_tracking_label);
        set_cookie(cookie_name, cookie_value, cookie_time);
    });
    //give feedback to exit survey 
    // exit survey







    //serial number
    function read_spa_Software(software){
        var software_decode_head =software.split("€");
        var software_decode=software_decode_head[0];
        
        var thisURL= window.location.href;
        var URL_decode=thisURL.split("/hc/")[0];
        var target_URL = URL_decode;
    
                    switch (software_decode) {
                        case 'TomTom HOME':
                            target_URL += "/hc/en-gb/sections/360003585479-TomTom-HOME";              
                            break;
                        case 'MyDrive Connect':
                             target_URL += "/hc/en-gb/sections/360003542620-MyDrive-Connect";
                            break;
                        case 'Bandit Studio':
                            target_URL += "/hc/en-gb/sections/360003586039-TomTom-Bandit-Action-Camera";
                            break;
                        case 'Wi-Fi®':
                            target_URL += "/hc/en-gb/sections/360003542600-Wi-Fi";
                            break;
                        case 'MySports Connect':
                            target_URL += "/hc/en-gb/sections/360003542980-Sports-Watch";
                            break;
                        case 'N/A':
                           target_URL =thisURL;
                    }
                  window.location.href = target_URL;  
        //end of function
      }




      function sunshineSearch(searchType,searchKey,searchValue){
        //to make the inside function only execute when the page is the Nav category page
        var the_domain= window.location.href;
        var the_domain_header=the_domain.split(".com");
        var the_url_header =the_domain_header[0];
        var querry = JSON.stringify({"query":{"type":searchType,"key":searchKey,"contains":searchValue }});
        
    
        var xhr = new XMLHttpRequest();
        var url = the_url_header+".com/api/sunshine/objects/search",
        username = "ccdev@groups.tomtom.com",
        password = "@=lx4+68}g";
        xhr.withCredentials = true;
        xhr.open("POST", url, true, username, password);
            xhr.send(querry);
          
          
       xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
   
     
      var i, result_array_length=((JSON.parse(this.responseText)).data).length;
     
      //debug code
      /*
      console.log("response from serial prefix search");
     console.log((JSON.parse(this.responseText)).data);
  console.log("response from serial prefix search");
      */
      //debug code
      
      if((((JSON.parse(this.responseText)).data).length)>0){
        
        document.getElementById("product_results_box").innerHTML="";
         for(i=0; i<result_array_length;i++){
             var xhr2 = new XMLHttpRequest();   
             var searchKEY=((JSON.parse(this.responseText)).data)[i].attributes.id
             var querry2 = JSON.stringify({"query":{"type":"tt_product","key":"product_id","contains":searchKEY }});
             xhr2.open("POST", url, true, username, password);
             xhr2.send(querry2); 
             xhr2.addEventListener("readystatechange",function(){
                 if(this.readyState === 4) {
                   
                   
                   //debug code
             /*      
   console.log("response from tt_product 4 digits ID search");
     console.log((JSON.parse(this.responseText)).data[0]);
 console.log("response from tt_product 4 digits ID search");
              */     
                   //debug code
                   
                     if(! (( typeof((JSON.parse(this.responseText)).data[0])) =="undefined")){
                      document.getElementById("product_results_box").innerHTML +=' <div class="single_result" id="'+((JSON.parse(this.responseText)).data)[0].attributes.software+"€"+((JSON.parse(this.responseText)).data)[0].id+'"><label class="pt_record" id="'+((JSON.parse(this.responseText)).data)[0].id+'">'+((JSON.parse(this.responseText)).data)[0].attributes.product_name+'</label></div>';
                         
                       $(".single_result").on('click',function(){
                       read_spa_Software(this.id);
                       });
                       
                     }
                 }
 
             }); 
 
         }
 
      }else{
         alert("there is no such prefix with "+searchValue);
      }
    
    } 
    });
 
 
       }



       $("#tt_serial_no_input").on('input',function(){   
        var tt_serial_number_input = (document.getElementById("tt_serial_no_input").value).toString(); 
        if((tt_serial_number_input.length)==2){
            sunshineSearch("tt_serial_number","serial_prefix",tt_serial_number_input);
        }
      });
   





    //serial number

/***** STRAP REQUEST FORM *******/
/***** STRAP REQUEST FORM *******/
/***** STRAP REQUEST FORM *******/
//levitt
//STRAP FORM
//testing URL hc/en-gb/requests/new?ticket_form_id=360000671760 

if(window.location.href.indexOf("form_id=360000671760") > -1) {	// if this is the strap form

$("#new_request .form-field").addClass("required"); //add required class to attachments
$(".datepicker").attr('required', 'true');  // make date picker required
  
  // This is to prefill and hide the fields on the Strap Request Form //  
$('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
$('.request_description').addClass("zd_Hidden"); // Hide description
$('.request_ticket_form_id').addClass("zd_Hidden"); // Hide the Form drop down
document .getElementById("request_custom_fields_360008860379").setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 

  
 
$('<p id="strap_form_tips_p" style="max-width: 650px"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
 	$("#strap_form_tips_p").html($("#strap_form_tips").html());
  
document.getElementById("request_subject").value = "STRAP FORM 360000671760"; 	//Insert Strap form subject line	

document.getElementById("request_description").value = "This is a Strap Request"; // Add value to description as it's 'required'

 					
$('.request_custom_fields_360008853500').hide(); // Hide Strap Colour	
$('.request_custom_fields_360008853480').hide(); // Hide Strap Size	
  
  
  //create a live validation form
  
  //disable the submit button 
  var button = (document.getElementsByName("commit"))[0];
  button.disabled = true;
  // after the following validation is passed, this button will be enabled.
  
  // serial number input max length is 12
  document.getElementById("request_custom_fields_360008860379").maxLength = 12;
  // serial number input max length is 12
  
  //serial number allows letters and numbers only, no punctuation or special characters
   document.getElementById("request_custom_fields_360008860379").setAttribute("pattern", "[A-Za-z0-9]+");
  //serial number allows letters and numbers only, no punctuation or special characters
  
  
  //serial number live validation
  //set a variable for serial number validation with 0 default which means not valid yet
var validSerialNumber=0;
   //set a variable for serial number validation with 0 default which means not valid yet
  
  //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter
  function checkNums(serial_number_input){
    //a forloop run 10 times check the 3rd to 12th characher, besides 7th, the rest should be number
    
   
    for(var i=2; i<=11;i++){
      if(i != 6){
      var currentNum= parseInt(serial_number_input.charAt(i));
        if(!(isNaN(currentNum) )){
           button.disabled = false;
         validSerialNumber=1;
        }else{
          validSerialNumber=0;
          button.disabled = true;
          break;
        }
      }
    }
    
    
    // when the function exected, turn the "validSerialNumber" into 1, which means the serial number is valid 
   
    if(validSerialNumber==1){
      button.disabled = false;
      
    }else{
       button.disabled = true;
     
    }
     
    
  }
  //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter
  
  
  
 $("#request_custom_fields_360008860379").on('input',function() {
     var serial_number_input = (document.getElementById("request_custom_fields_360008860379").value).toString(); 
     if((serial_number_input.length)>=2){
          var first_digit= parseInt(serial_number_input.charAt(0));
       
          //var second_digit = parseInt(serial_number_input.charAt(1));
       
          if(isNaN(first_digit) ){
           //when the first of serial number input is not number
           
            if((serial_number_input.length)>=7){
               //when its hit the 7th character, check if its letter
              
               var seventh_digit= parseInt(serial_number_input.charAt(6));
              if((isNaN(seventh_digit))){
                //when the 7th of serial number input is not number
                if((serial_number_input.length)==12){
                  //here call the function to check the number part
                  // to be implemented
                  checkNums(serial_number_input);
                 // console.log("validSerialNumber value " +validSerialNumber);
                }else{
                   button.disabled = true;
                }
              }
              
            } // end when its hit the 7th character, check if its letter
            
            
           }//closing if both first two serial number input is not integer number
      
          }
 }); // end of serial number oninput function 
  

  

  
  /*** Front end date validation that back-end may use if they want, if not. Delete it :) ***/
  
//   //the function to check if the date of purchase is valid
//   function DOP(date_string){
//     //set today
//      var today = new Date(); //this is current date
//         var d = today.getDate();
//         var m = today.getMonth(); //As January is 0.
//         var y = today.getFullYear();
//         today.setFullYear(y, m, d); //this is the current date
//     //set today
    
//     //set user purchase date 
//   var year= date_string.split('-')[0];
//   var month =date_string.split('-')[1];
//   var day= date_string.split('-')[2];  
//     var dateOfPurchase = new Date(); //this is user input date 
//    dateOfPurchase.setFullYear(parseInt(year), parseInt(month) - 1, day);
//       //set user purchase date 
    
//     //two years valid
//     var twoYears = new Date();
//     twoYears.setDate(today.getDate() - 730);
//      //two years valid

//         if ((dateOfPurchase - twoYears) >= 0) {
//           console.log("in 730 days");
//          if ((dateOfPurchase-today)>0){
//            console.log("future date is not accepted ");
//          }
                   
//                 } else {
//                     console.log("out of 730 days");   
//                 }
    
    
//    // console.log("date " + dateOfPurchase);
    
    
//   }
  
//   // get the date input
//    var date_input = $("#request_custom_fields_360008860439"). val();
//   //call the function
//   //DOP(date_input);
//   //the function to check if the date of purchase is valid
  
  
}// the end of if-at strap form page
  
  /***** END STRAP REQUEST FORM *******/
  /***** END STRAP REQUEST FORM *******/
  /***** END STRAP REQUEST FORM *******/
  
  
  /***GOLF FORM***/
  /***GOLF FORM***/
  /***GOLF FORM***/
  //testing URL hc/en-gb/requests/new?ticket_form_id=360000679879
  if(window.location.href.indexOf("form_id=360000679879") > -1){
    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
    document.getElementById("request_subject").value = "GOLF FORM 360000679879"; 	//Insert Golf form subject line
    console.log("golf form");
  }
  
  /***GOLF FORM***/
  /***GOLF FORM***/
  /***GOLF FORM***/



    // above code are edited by levit

                      // Below code is zendesk
                          function closest(element, selector) {
                              if (Element.prototype.closest) {
                                  return element.closest(selector);
                              }
                              do {
                                  if (Element.prototype.matches && element.matches(selector) ||
                                      Element.prototype.msMatchesSelector && element.msMatchesSelector(selector) ||
                                      Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
                                      return element;
                                  }
                                  element = element.parentElement || element.parentNode;
                              } while (element !== null && element.nodeType === 1);
                              return null;
                          }

                          // social share popups
                          Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
                              anchor.addEventListener('click', function(e) {
                                  e.preventDefault();
                                  window.open(this.href, '', 'height = 500, width = 500');
                              });
                          });

                          // In some cases we should preserve focus after page reload
                          function saveFocus() {
                              var activeElementId = document.activeElement.getAttribute("id");
                              sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
                          }
                          var returnFocusTo = sessionStorage.getItem('returnFocusTo');
                          if (returnFocusTo) {
                              sessionStorage.removeItem('returnFocusTo');
                              var returnFocusToEl = document.querySelector(returnFocusTo);
                              returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
                          }

                          // show form controls when the textarea receives focus or backbutton is used and value exists
                          var commentContainerTextarea = document.querySelector('.comment-container textarea'),
                              commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

                          if (commentContainerTextarea) {
                              commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
                                  commentContainerFormControls.style.display = 'block';
                                  commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
                              });

                              if (commentContainerTextarea.value !== '') {
                                  commentContainerFormControls.style.display = 'block';
                              }
                          }

                          // Expand Request comment form when Add to conversation is clicked
                          var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
                              requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
                              requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

                          if (showRequestCommentContainerTrigger) {
                              showRequestCommentContainerTrigger.addEventListener('click', function() {
                                  showRequestCommentContainerTrigger.style.display = 'none';
                                  Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
                                  requestCommentSubmit.style.display = 'inline-block';

                                  if (commentContainerTextarea) {
                                      commentContainerTextarea.focus();
                                  }
                              });
                          }

                          // Mark as solved button
                          var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
                              requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
                              requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

                          if (requestMarkAsSolvedButton) {
                              requestMarkAsSolvedButton.addEventListener('click', function() {
                                  requestMarkAsSolvedCheckbox.setAttribute('checked', true);
                                  requestCommentSubmitButton.disabled = true;
                                  this.setAttribute('data-disabled', true);
                                  // Element.closest is not supported in IE11
                                  closest(this, 'form').submit();
                              });
                          }

                          // Change Mark as solved text according to whether comment is filled
                          var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

                          if (requestCommentTextarea) {
                              requestCommentTextarea.addEventListener('input', function() {
                                  if (requestCommentTextarea.value === '') {
                                      if (requestMarkAsSolvedButton) {
                                          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
                                      }
                                      requestCommentSubmitButton.disabled = true;
                                  } else {
                                      if (requestMarkAsSolvedButton) {
                                          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
                                      }
                                      requestCommentSubmitButton.disabled = false;
                                  }
                              });
                          }

                          // Disable submit button if textarea is empty
                          if (requestCommentTextarea && requestCommentTextarea.value === '') {
                              requestCommentSubmitButton.disabled = true;
                          }

                          // Submit requests filter form on status or organization change in the request list page
                          Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
                              el.addEventListener('change', function(e) {
                                  e.stopPropagation();
                                  saveFocus();
                                  closest(this, 'form').submit();
                              });
                          });

                          // Submit requests filter form on search in the request list page
                          var quickSearch = document.querySelector('#quick-search');
                          quickSearch && quickSearch.addEventListener('keyup', function(e) {
                              if (e.keyCode === 13) { // Enter key
                                  e.stopPropagation();
                                  saveFocus();
                                  closest(this, 'form').submit();
                              }
                          });

                          function toggleNavigation(toggle, menu) {
                              var isExpanded = menu.getAttribute('aria-expanded') === 'true';
                              menu.setAttribute('aria-expanded', !isExpanded);
                              toggle.setAttribute('aria-expanded', !isExpanded);
                          }

                          function closeNavigation(toggle, menu) {
                              menu.setAttribute('aria-expanded', false);
                              toggle.setAttribute('aria-expanded', false);
                              toggle.focus();
                          }

/*not being used a block of code (below)*/
                          // var burgerMenu = document.querySelector('.header .menu-button');
                          // var userMenu = document.querySelector('#user-nav');

                          // burgerMenu.addEventListener('click', function(e) {
                          //     e.stopPropagation();
                          //     toggleNavigation(this, userMenu);
                          // });


                          // userMenu.addEventListener('keyup', function(e) {
                          //     if (e.keyCode === 27) { // Escape key
                          //         e.stopPropagation();
                          //         closeNavigation(burgerMenu, this);
                          //     }
                          // });

                          // if (userMenu.children.length === 0) {
                          //     burgerMenu.style.display = 'none';
                          // }
    /*not being used a block of code (above)*/

                          //Toggles expanded aria to collapsible elements
                          var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

                          Array.prototype.forEach.call(collapsible, function(el) {
                              var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

                              el.addEventListener('click', function(e) {
                                  toggleNavigation(toggle, this);
                              });

                              el.addEventListener('keyup', function(e) {
                                  if (e.keyCode === 27) { // Escape key
                                      closeNavigation(toggle, this);
                                  }
                              });
                          });

                          // Submit organization form in the request page
                          var requestOrganisationSelect = document.querySelector('#request-organization select');

                          if (requestOrganisationSelect) {
                              requestOrganisationSelect.addEventListener('change', function() {
                                  closest(this, 'form').submit();
                              });
                          }

                          // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
                          const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
                          const subsectionsList = document.querySelector(".section-list");

                          if (subsectionsList && subsectionsList.children.length > 6) {
                              seeAllTrigger.setAttribute("aria-hidden", false);

                              seeAllTrigger.addEventListener("click", function(e) {
                                  subsectionsList.classList.remove("section-list--collapsed");
                                  seeAllTrigger.parentNode.removeChild(seeAllTrigger);
                              });
                          }

                          // If multibrand search has more than 5 help centers or categories collapse the list
                          const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
                          Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
                              if (filter.children.length > 6) {
                                  // Display the show more button
                                  var trigger = filter.querySelector(".see-all-filters");
                                  trigger.setAttribute("aria-hidden", false);

                                  // Add event handler for click
                                  trigger.addEventListener("click", function(e) {
                                      e.stopPropagation();
                                      trigger.parentNode.removeChild(trigger);
                                      filter.classList.remove("multibrand-filter-list--collapsed")
                                  })
                              }
                          });
                      // Above code is zendesk 
  
                        //Code for BuRMA SSO cookie creation - Start 
  const secureKey = "N@vI5aT3";
  if (read_cookie("tt_cp_auth") === "" && HelpCenter.user.email != null){
      var encrypted = CryptoJS.AES.encrypt(HelpCenter.user.email, secureKey);
      set_cookie("tt_cp_auth",encrypted,3600000);
  }
  //Code for BuRMA SSO cookie creation - End // Mrunal
 
}); // end of js file function - put everything above this line

$(document).ready(function() {  // only insert after this if you need document to be ready
  
  
/***** FORMS *****/
 
//These varibles are to capture Form feilds  
var SubjectLine = document.getElementById("request_subject");
var DescriptionBox = document.getElementById("request_description");
var AttachmentsFileDrop = document.getElementById("upload-dropzone");
var title = document.getElementsByTagName("h1")[0];
var GDPROption= document.getElementsByClassName("request_custom_fields_360007572579");
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

   
//This code is to ensure only Signed in users see the request form if we add class="request"
//end
(function(_w, _d, $){

$(_d).ready(function(){
var _locale = window.location.pathname.replace('/', '')
.replace('?','/').split('/')[1];
if (HelpCenter.user.role=='end_user') {
$('.request')
.html('<a class="submit-a-request" href="/hc/'+
_locale+'/requests/new">'+
'Submit a request</a>');
} else if (HelpCenter.user.role=='anonymous') {
$('.request')
.html('<a href="/hc/'+
_locale+'/signin">'+
'Submit a request</a>');
}
}); 

}(window, document, jQuery));
// End 

/*****  GDPR FORM *******/


  
//Amy
// This is to prefill and hide the fields on the GDPR Form //  
if(window.location.href.indexOf("form_id=360000569919") > -1) {
       // title.innerHTML = "{{dc 'gdpr_request_form'}}" ;
  			  $(".form-field").addClass("zd_Hidden");
					$(".request_custom_fields_360007572579").removeClass("zd_Hidden");
    			//SubjectLine.value = SubjectLine.value + "GDPR FORM 360000569919"; 			
        	//DescriptionBox.value = DescriptionBox.value + "This is a GDPR REQUEST"; 			
  //code review: levitt
  //update
  SubjectLine.value ="GDPR FORM 360000569919";
  DescriptionBox.value = "This is a GDPR REQUEST"; 
  		 	(AttachmentsFileDrop.parentElement).classList.add("zd_Hidden");
}
// end GDPR Form 


  
/***** END FORMS *****/ //Amy Ogborn  
/*****  Request Pages *******/  
// GDPR Request Download page
  
  if($(".request-title:contains('360000569919')").length) {
    		console.log('sijfosfdfds');
  	    $(".request-title").addClass("zd_Hidden");
    	  $(".request-main").addClass("zd_Hidden");
    	  $(".my-activities-nav").addClass("zd_Hidden");
      	$(".breadcrumbs").addClass("zd_Hidden");
        $(".request-details").addClass("zd_Hidden");
        $(".request-attachments").removeClass("zd_Hidden");   
        $(".request-attachments").addClass("ts-request-attachments");   
        $(".attachments").addClass("download-button");   
  };


/*****  End Request Pages *******/  
/*****  Content Pages *******/  
  	    $("<div class='ct-header-block'></div>").prependTo(".ct-article"); 
  	    $(".ct-article-header").prependTo(".ct-header-block"); 
  	    $(".ct-article-sub-header").appendTo(".ct-header-block"); 
    	  $(".ct-header-description").appendTo(".ct-header-block"); 

  
    $('<button id="option-1" class="ct-options" data="option-1-content"><span class="radiobtn"></span>Android</button>'+
      '<button class="ct-options" data="option-2-content"><span class="radiobtn"></span>iPhone</button>'+
      '<button class="ct-options" data="option-3-content"><span class="radiobtn"></span>Windows</button>').appendTo('.ct-options-list'); //adding radio options to content template
  
 
function openSoftware(evt, softwareName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("ct-option-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("ct-options");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(softwareName).style.display = "block";
  evt.currentTarget.className += " active";
}
  
  
    $('.ct-options').on('click',function(evt){
    // where is the software name????
    var software=$(this).attr("data");
     
    openSoftware(evt,software);
   
  })
  
  $("#option-1").click();
  
/*****  End Content Pages *******/  
/***** Back to top function *****/ 

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 600) {

            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }
    });

    $('#back-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

/***** End back to top *****/ //Amy Ogborn  
/***** Article Satisfaction *****/ 

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 600) {
            $('.article-votes').fadeIn(200);
        } else {
            $('.article-votes').fadeOut(200);
        }
    });

/***** Article Satisfaction end *****/ //Amy Ogborn  

/*****  Troubleshooting Template *****/ 
 
$('.video-block').prependTo(".ts-article-video");
$('.ts-article-video-header').prependTo(".ts-article-video");
$('.article-links').insertAfter('.ts-article-video'); 
  
/***** End of Troubleshooting Template *****/ //Amy Ogborn    
  
/*****  How To Template *****/ 
  
$('.ht-header-content').appendTo(".ht-article-header");  
$(".ht-article-body h2").addClass("ht-contents-header");
$(".ht-article-body").find("h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-first-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-first-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-second-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-second-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-third-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-third-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-fourth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-fourth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-fifth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-fifth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-sixth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-sixth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-seventh-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-seventh-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-eighth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-eighth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-ninth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-ninth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-tenth-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-tenth-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-eleventh-block' class='ht-block'></div>"); 
$('.ht-article-body ol li').wrapInner("<div class='ht-list-text'></div>");
$('.ht-article-body ul li').wrapInner("<div class='ht-list-text'></div>");
$('.ht-article-body img').each(function(){
  $(this).insertAfter($(this).parent());
}); 
/***** End of  How To Template *****/ //Amy Ogborn  
  
/*****  Email Widget *****/   
// Prefilling default info form forms and hide/showing fields
// Amy Ogborn
zESettings = {
  webWidget: {
    contactForm: {
							fields: [
                { id: 'name', prefill: { '*':HelpCenter.user.name }}, //prefilling username
                { id: 'email', prefill: { '*':HelpCenter.user.email }}//prefilling email
      								],
      				      
      				ticketForms: [
                { id: 360000358360}, 
                { id: 360000671760}, 
                { id: 360000679879}
              					] //displays the ticket forms: Contact, strap form and Golf. Add any IDs you want to show
    							}    
  }
};  

/*****  End Prefill Email Widget *****/   
                  
/*****  Temp Header *****/ 

//toggle the hamburger menu
var button = document.getElementById('nav-main-hamburger');
var nav = document.getElementById("nav-wrapper");  
  
button.onclick =  function() {
      if (!nav.style.display || nav.style.display === "none") {
                nav.style.display = "block";
            } else {
                nav.style.display = "none";
            }
};

//Add the profile icon to the header
$('<svg width="16" height="16" class="profile-icon"><path d="M2 14h12v-.012c0-.056-.11-.22-.602-.544-.62-.418-1.495-.778-2.613-1.058-1.034-.251-1.963-.374-2.785-.374-.822 0-1.75.123-2.772.371-1.131.283-2.006.643-2.64 1.07-.478.316-.588.48-.588.535V14zm6-3.988c.99 0 2.076.144 3.257.431 1.342.335 2.428.783 3.258 1.341.99.655 1.485 1.39 1.485 2.204V16H0v-2.012c0-.814.495-1.549 1.485-2.204.83-.558 1.916-1.006 3.258-1.34 1.181-.288 2.267-.432 3.257-.432zM8 6c.362 0 .672-.084.969-.26.318-.188.56-.43.747-.747a1.83 1.83 0 00.26-.969 1.96 1.96 0 00-.271-1.013 2.01 2.01 0 00-.736-.751A1.833 1.833 0 008 2a1.83 1.83 0 00-.969.26 2.01 2.01 0 00-.736.751 1.96 1.96 0 00-.271 1.013c0 .362.084.672.26.969.188.318.43.56.747.747.297.176.607.26.969.26zm0 2c-.719 0-1.381-.18-1.988-.539a4.065 4.065 0 01-1.45-1.449 3.832 3.832 0 01-.538-1.988c0-.719.18-1.39.539-2.012A4.008 4.008 0 016.012.539 3.832 3.832 0 018 0c.719 0 1.381.18 1.988.539.607.36 1.09.85 1.45 1.473a3.97 3.97 0 01.538 2.012c0 .719-.18 1.381-.539 1.988a4.065 4.065 0 01-1.449 1.45A3.845 3.845 0 018 8z" fill-rule="evenodd"></path></svg>').prependTo('.user-info > [role="button"]');   

/*****  End Temp Header *****/   
  
/*****  New request pages - product pre-select *****/ 
function getQueryParams (queryString)
{
   queryString = queryString.split ('+').join (' ');

   var params = {};
   var tokens;
   var regex = /[?&]?([^=]+)=([^&]*)/g;

   while (tokens = regex.exec (queryString))
   {
      params[decodeURIComponent (tokens[1])] = decodeURIComponent (tokens[2]);
   }

   return params;
}
  var params = getQueryParams (document.location.search); 
  if (params.product)
  {
   $("#request_custom_fields_360005150940").val(params.product);
  }
  //hide org & form option
  $('.form-field.request_ticket_form_id').hide();
  $('.form-field.request_organization_id').hide();
/***** End of New request pages - product pre-select *****/ //Lorna Rickett 
}); // end of document ready function

