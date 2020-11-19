/****************************************** PLEASE READ Documentation: https://confluence.tomtomgroup.com/x/3EGHM *****************************************************/
/****************************************** PLEASE READ Documentation: https://confluence.tomtomgroup.com/x/3EGHM *****************************************************/
// Themes are owned by DDA Team, if you have any questions about code or documentation please ask DDA (Levitt or Amy) 
// There are 2 document ready functions one is below in DOMContentLoaded and there is (document).ready at the bottom if you require the whole document to load

document.addEventListener('DOMContentLoaded', function() { // Add your new code to the relevant section
   
/******************************************* Breadcrumbs ************************************************/ 
  //chevron
    //iphone userAgent: iPhone
    if (navigator.userAgent.indexOf('Mac') != -1) {
        $(".breadcrumbs li+li").addClass("chevron_mac");
    } else if (navigator.userAgent.indexOf('Windows') != -1) {
        $(".breadcrumbs li+li").addClass("chevron_win");
        //chevron on sub footer
        $('.sub_explore').addClass("sub_explore_WINDOWS");
    } else {
        $(".breadcrumbs li+li").addClass("chevron_general");
    }
    //chevron   
/******************************************* End of Breadcrumbs ************************************************/ 
  
/******************************************* Subfooter ************************************************/
    // bongo images on different locals 
    var subfooter_bongo_image_mobile = document.getElementById("subfooter_bongo_image_mobile");
    var subfooter_bongo_image = document.getElementById("subfooter_bongo_image");
    var bong_image_placeholder = document.getElementById("bongo_open");

    function adjustBongoImage(query) {
        if (query.matches) { // If media query matches mobile 690px
            if ((bong_image_placeholder != null) && (subfooter_bongo_image_mobile != null)) {
                var imageURL = subfooter_bongo_image_mobile.innerHTML;
                bong_image_placeholder.style.backgroundImage = "url('" + imageURL + "')";
            }
        } else {
            if ((bong_image_placeholder != null) && (subfooter_bongo_image != null)) {
                var imageURL = subfooter_bongo_image.innerHTML;
                bong_image_placeholder.style.backgroundImage = "url('" + imageURL + "')";
            }
        }
    }
    var query = window.matchMedia("(max-width: 690px)");
    adjustBongoImage(query);
    query.addListener(adjustBongoImage);
/******************************************* End of Subfooter ************************************************/

/******************************************* Home page META description *****************************************/ // DDA-673 Amy
    var homePage = document.getElementById("home-section");
    if (homePage) {
        var homepage_metadescription = document.getElementById("homepage_metadescription").textContent;
        var homepage_meta = document.createElement('meta');
        homepage_meta.setAttribute('name', 'description');
        homepage_meta.content = homepage_metadescription;
        document.getElementsByTagName('head')[0].appendChild(homepage_meta);
    }
/******************************************* End Home page META description *****************************************/ // DDA-673 Amy

    //this is the URL value that can be used in all the functions
    var the_url = window.location.href;
    //this is the URL value that can be used in all the functions
  
/******************************************* Requests/CCD page ************************************************/
    if (the_url.indexOf("requests/ccd") != -1) {
        var hide_CC_page_main = document.querySelector('main[role="main"]');
        hide_CC_page_main.classList.add("zd_Hidden");
        window.location.href = the_url.split("/ccd")[0];
    }
/******************************************* End of Requests/CCD page ************************************************/
  
/*************************************** MAP *************************************/
    //get the id_map JSON access URL from asset
    var id_map_data_source = "https:" + $("#map_json").html();

    //access id_map JSON
    $.getJSON(id_map_data_source, function(data) {

        //create form id with a default value -1
        var golf_form_id = -1;
        var strap_form_id = -1;
        var gdpr_form_id = -1;
        var email_form_id = -1;
        var serial_number_eur_field_id = -1;
        var gdpr_reason_field_id = -1;
        var golfer_section_id = -1;
        var nav_cat_id = "";
        var spts_cat_id = "";
        var apps_cat_id = "";
        var userManualsReleaseInfo_cat_id = "";
        var tthome_section_id = "";
        var vanilla_sso_server = -1;
        var vanilla_redirect_url = -1;
        var talk_form_id = -1;
        var email_form_request_local_field = -1;
        var auto_renewal_refund_form_id = -1;
        var refund_form_id = -1;
        var ordernumber_field_id = -1;
        var sap_order_number_eur_field = -1;
        var sap_total_refund_amount_eur_field = -1;
        var sap_currency_eur_field = -1;
        //create form id with a default value -1     
 
      
        // declare varliables inside map json
        if (the_url.indexOf("sandbox") != -1) {

            //form id get the sandbox id value
            golf_form_id = data.golf_form_id.sandbox;
            strap_form_id = data.strap_form_id.sandbox;
            gdpr_form_id = data.gdpr_form_id.sandbox;
            email_form_id = data.email_form_id.sandbox;
            serial_number_eur_field_id = data.serial_number_eur_field_id.sandbox;
            gdpr_reason_field_id = data.gdpr_reason_field_id.sandbox;
            golfer_section_id = data.golfer_section_id.sandbox;
            nav_cat_id = data.naviagtion_category_id.sandbox;
            spts_cat_id = data.sports_category_id.sandbox;
            apps_cat_id = data.apps_category_id.sandbox;
            userManualsReleaseInfo_cat_id = data.user_manual_release_info_category_id.sandbox;
            tthome_section_id = data.tthome_section_id.sandbox;
            vanilla_redirect_url = data.vanilla_redirect_url.sandbox;
            vanilla_sso_server = data.vanilla_sso_server.sandbox;
            talk_form_id = data.talk_form_id.sandbox;
            email_form_request_local_field = data.email_form_request_local.sandbox;
            auto_renewal_refund_form_id = data.auto_renewal_refund_form_id.sandbox;
            refund_form_id = data.refund_form_id.sandbox;
            ordernumber_field_id = data.ordernumber_field_id.sandbox;
            sap_order_number_eur_field = data.sap_order_number_eur_field.sandbox;
            sap_total_refund_amount_eur_field = data.sap_total_refund_amount_eur_field.sandbox;
            sap_currency_eur_field = data.sap_currency_eur_field.sandbox;

        } else {

            //form id get the production id value
            golf_form_id = data.golf_form_id.prod;
            strap_form_id = data.strap_form_id.prod;
            gdpr_form_id = data.gdpr_form_id.prod;
            email_form_id = data.email_form_id.prod;
            serial_number_eur_field_id = data.serial_number_eur_field_id.prod;
            gdpr_reason_field_id = data.gdpr_reason_field_id.prod;
            golfer_section_id = data.golfer_section_id.prod;
            nav_cat_id = data.naviagtion_category_id.prod;
            spts_cat_id = data.sports_category_id.prod;
            apps_cat_id = data.apps_category_id.prod;
            userManualsReleaseInfo_cat_id = data.user_manual_release_info_category_id.prod;
            tthome_section_id = data.tthome_section_id.prod;
            vanilla_redirect_url = data.vanilla_redirect_url.prod;
            vanilla_sso_server = data.vanilla_sso_server.prod;
            talk_form_id = data.talk_form_id.prod;
            email_form_request_local_field = data.email_form_request_local.prod;
            auto_renewal_refund_form_id = data.auto_renewal_refund_form_id.prod;
            refund_form_id = data.refund_form_id.prod;
            ordernumber_field_id = data.ordernumber_field_id.prod;
            sap_order_number_eur_field = data.sap_order_number_eur_field.prod;
            sap_total_refund_amount_eur_field = data.sap_total_refund_amount_eur_field.prod;
            sap_currency_eur_field = data.sap_currency_eur_field.prod;
        } //end of get form/fields ID
            
/********************************************* Function for Serial Number validation ************************************/
        //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter
        function checkNums(serial_number_input, submit_button, validSerialNumber) {
        //a forloop run 10 times check the 3rd to 12th characher, besides 7th, the rest should be number
            for (var i = 2; i <= 11; i++) {
                if (i != 6) {
                    var currentNum = parseInt(serial_number_input.charAt(i));
                    if (!(isNaN(currentNum))) {
                        submit_button.disabled = false;
                        validSerialNumber = 1;
                    } else {
                        validSerialNumber = 0;
                        submit_button.disabled = true;
                        break;
                    }
                }
            }
            // when the function exected, turn the "validSerialNumber" into 1, which means the serial number is valid 
            if (validSerialNumber == 1) {
                submit_button.disabled = false;
            } else {
                submit_button.disabled = true;
            }
        };
        //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter
 /************************************ End of Function for Serial Number validation ************************************/         
      
/****************************************** Ticket Forms ********************************/ // Documentation: https://confluence.tomtomgroup.com/display/CCWEBDEV/Ticket+Forms 
        if (the_url.indexOf("ticket_form_id") != -1) { //the current page is a form page 
            
          	//form only available for logged in user
            if (HelpCenter.user.role == "anonymous") {
                $(".container").addClass("zd_Hidden");
                $(".login")[0].click();
            }
            //form only available for logged in user
          
            //create general variables of form elements, easy to manage 
            var SubjectLine = document.getElementById("request_subject");
            var DescriptionBox = document.getElementById("request_description");
            var AttachmentsFileDrop = document.getElementById("upload-dropzone");
            var title = document.getElementsByTagName("h1")[0];
            /*hard coded ID*/
            var GDPROption = document.getElementsByClassName("request_custom_fields_" + gdpr_reason_field_id);
            /*hard coded ID*/
            function isLetter(str) { return str.length === 1 && str.match(/[a-z]/i); }

            //orgainse the form IDs 
            //Golf form
            var golf_form_ID_checker = "form_id=" + golf_form_id;
            //GDPR form
            var gdpr_form_ID_checker = "form_id=" + gdpr_form_id;
            //strap form
            var strap_form_ID_checker = "form_id=" + strap_form_id;

/****************************** STRAP REQUEST FORM *************************************/
            //testing URL hc/en-gb/requests/new?ticket_form_id=360000671760 

            if (window.location.href.indexOf(strap_form_ID_checker) > -1) { // if this is the strap form
                var strap_page_title = document.getElementById("strap_page_title").innerHTML;
                document.title = strap_page_title;

                $("#new_request .form-field").addClass("required"); //add required class to attachments
                $(".datepicker").attr('required', 'true'); // make date picker required

                // This is to prefill and hide the fields on the Strap Request Form //  
                $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
                $('.request_description').addClass("zd_Hidden"); // Hide description
                $('.request_ticket_form_id').addClass("zd_Hidden"); // Hide the Form drop down
                document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 

                $('<p id="strap_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
                $("#strap_form_tips_p").html($("#strap_form_tips").html());

                SubjectLine.value = strap_page_title + " " + strap_form_id; //Insert Strap form subject line	
                DescriptionBox.value = strap_page_title; // Add value to description as it's 'required'

                //create a live validation form
                //disable the submit button 
                var button = (document.getElementsByName("commit"))[0];
                button.disabled = true;
                // after the following validation is passed, this button will be enabled.

                // serial number input max length is 12
                document.getElementById("request_custom_fields_" + serial_number_eur_field_id).maxLength = 12;
                // serial number input max length is 12

                //serial number allows letters and numbers only, no punctuation or special characters
                document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("pattern", "[A-Za-z0-9]+");
                //serial number allows letters and numbers only, no punctuation or special characters

                //serial number live validation
                //set a variable for serial number validation with 0 default which means not valid yet
                var validSerialNumber = 0;
                //set a variable for serial number validation with 0 default which means not valid yet

                $("#request_custom_fields_" + serial_number_eur_field_id).on('input', function() {
                    var serial_number_input = (document.getElementById("request_custom_fields_" + serial_number_eur_field_id).value).toString();
                    if ((serial_number_input.length) >= 2) { // check if input is greater than 2
                        var first_digit = parseInt(serial_number_input.charAt(0));
                        //var second_digit = parseInt(serial_number_input.charAt(1));
                      
                        if (isNaN(first_digit)) {
                            //when the first of serial number input is not number
                            if ((serial_number_input.length) >= 7) {
                                //when its hit the 7th character, check if its letter
                                var seventh_digit = parseInt(serial_number_input.charAt(6));
                                if ((isNaN(seventh_digit))) {
                                    //when the 7th of serial number input is not number
                                    if ((serial_number_input.length) == 12) {
                                        //here call the function to check the number part
                                        // to be implemented
                                        checkNums(serial_number_input, button, validSerialNumber);
                                        } else {
                                            button.disabled = true;
                                        }
                                	}
                            	} // end when its hit the 7th character, check if its letter
                        	} //closing if both first two serial number input is not integer number
                    	} // close check if input is greater than 2
                }); // end of serial number oninput function 
            } // the end of if-at strap form page

/******************************** END STRAP REQUEST FORM ********************************/
/********************************* GDPR FORM  **************************************/
          
            else if (window.location.href.indexOf(gdpr_form_ID_checker) > -1) {
                var GDPR_page_title = document.getElementById("GDPR_page_title").innerHTML; 
                document.title = GDPR_page_title; //page title from Dynamic Content 
                //testing URL hc/en-gb/requests/new?ticket_form_id=360000569919
                // title.innerHTML = "{{dc 'gdpr_request_form'}}" ;
                $(".form-field").addClass("zd_Hidden");
                $(".request_custom_fields_" + gdpr_reason_field_id).removeClass("zd_Hidden");
                //update
                SubjectLine.value = GDPR_page_title + " " + gdpr_form_id;
                DescriptionBox.value = GDPR_page_title;
                (AttachmentsFileDrop.parentElement).classList.add("zd_Hidden");
/**************************** End ofGDPR FORM **********************************/
/********************************* Email FORM ******************************/             
            } else if (window.location.href.indexOf(email_form_id) > -1) {

                var email_page_title = document.getElementById("email_page_title").innerHTML;
                document.title = email_page_title;
                $(".request_custom_fields_" + email_form_request_local_field).addClass("zd_Hidden");
                $("#request_custom_fields_" + email_form_request_local_field).val(HelpCenter.user.locale);
/****************************** End of Email FORM *****************************/
/********************************* Refund request FORM ******************************/ //testing URL hc/en-gb/requests/new?ticket_form_id=360000849779     
            } else if (window.location.href.indexOf(refund_form_id) > -1) {
              	var refund_request_page_title = document.getElementById("refund_request_page_title").innerHTML;
                document.title = refund_request_page_title;
                $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
                SubjectLine.value = refund_request_page_title + " " + refund_form_id;

                //disable the submit button 
                var refund_button = (document.getElementsByName("commit"))[0];
                refund_button.disabled = true;
                // after the following validation is passed, this button will be enabled.
                var order_number_feild = document.getElementById("request_custom_fields_" + ordernumber_field_id);
                var order_number_feild_full = document.getElementsByClassName("request_custom_fields_" + ordernumber_field_id)[0];
                // order number input max length is 9
                order_number_feild.maxLength = 9;
                // order number input max length is 9
                order_number_feild.setAttribute("placeholder", "40*******");
                order_number_feild_full.classList.add("required");
                //order number allows letters and numbers only, no punctuation or special characters
                order_number_feild.setAttribute("pattern", "[A-Za-z0-9]+");
                //order number allows letters and numbers only, no punctuation or special characters

                //order number live validation
                $("#request_custom_fields_" + ordernumber_field_id).on('input', function() {
                    var order_number_input = (document.getElementById("request_custom_fields_" + ordernumber_field_id).value).toString();

                    if ((order_number_input.length) == 9) {
                        refund_button.disabled = false;
                    } else {
                        refund_button.disabled = true;
                    }
                }); // end of order number on input function 
/********************************* End of Refund request FORM ******************************/
/********************************* Auto renewal Refund Request FORM *********************************/ //testing URL hc/en-gb/requests/new?ticket_form_id=360000875500
            } else if (window.location.href.indexOf(auto_renewal_refund_form_id) > -1) {
                var auto_renewal_request_page_title = document.getElementById("auto_renewal_request_page_title").innerHTML;
                var renewal_refund_amount = document.getElementById("renewal_refund_amount").innerHTML;
                document.title = auto_renewal_request_page_title; // document title (page title) 
                $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
                SubjectLine.value = auto_renewal_request_page_title + " " + auto_renewal_refund_form_id; //pre fill subject line
                var auto_order_number_feild = document.getElementById("request_custom_fields_" + sap_order_number_eur_field);
                auto_order_number_feild.maxLength = 9;
                auto_order_number_feild.setAttribute("placeholder", "40*******");
                var refund_amount_field = document.getElementById("request_custom_fields_" + sap_total_refund_amount_eur_field);
                refund_amount_field.value = renewal_refund_amount; //pre fill refund amount line
                refund_amount_field.setAttribute("readonly", true);
                (AttachmentsFileDrop.parentElement).classList.add("zd_Hidden");
                DescriptionBox.value = auto_renewal_refund_form_id;
                $('.request_description').addClass("zd_Hidden");
                $('<p id="auto_renewal_form" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
                $("#auto_renewal_form").html($("#renewal_refund_request_intro").html());

/****************** End Auto renewal Refund Request FORM ******************/
/****************** Golf feedback FORM ******************/ //testing URL hc/en-gb/requests/new?ticket_form_id=360000679879
            } else {                
                if (window.location.href.indexOf(golf_form_ID_checker) > -1) {
                    var golf_page_title = document.getElementById("golf_page_title").innerHTML;
                    document.title = golf_page_title;
                    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
                    SubjectLine.value = golf_page_title + " " + golf_form_id;
                    $('<p id="golf_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
                    $("#golf_form_tips_p").html($("#golf_form_tips").html());
                } // end of if golf form 
/****************** End of Golf feedback FORM ******************/
            } //end of if-else-if statement for all the forms}
        } // end the current page is a form page  
/*************************** End of Ticket Forms ********************************/
      
/*************************** Repair page or requests page ********************************/
        var lastPart = the_url.substr(the_url.lastIndexOf('/') + 1);
        if ((lastPart === "requests") || (lastPart === "requests#repairs")) { // if the end of the url is requests             

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
/*************************** End Repair page or requests page ********************************/
        } // end if the end of the url is requests     
      
        if ((the_url.indexOf("/requests/") > -1) && (the_url.indexOf("new?ticket_form_id") <= -1)) { //IF page is a Request Page (and exclude ticket forms)
        var request_title = document.getElementsByClassName("request-title")[0].innerText;
          
/*************************** Request (also known as Request List) page ********************************/
// GDPR Request Download page
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
/**************************  Section Pages **********************/
        if (window.location.href.indexOf(golfer_section_id) > -1) {
            document.getElementById("golf_form_block").style.display = "flex";
        }
/***************************  End Section Pages **********************/
/***************************  Vanilla SSO Start - Mrunal **********************/
        var vsso = window.location.search;
        if (vsso != '') {
            var search = vsso.includes("vanillaSSO=signin");
            if (search) {
                if (HelpCenter.user.email != null && HelpCenter.user.role != "anonymous") {
                    window.location.href = vanilla_sso_server + "zenApi/src/vanillaSSO.php?param=" + window.btoa(HelpCenter.user.email);
                } else {
                    set_cookie("vanillaSession", "true", 0);
                    window.location.href = vanilla_redirect_url;
                }
            }
        }
        iscookie = read_cookie('vanillaSession');
        if (HelpCenter.user.email != null && HelpCenter.user.role != "anonymous" && iscookie == "true") {
            removeCookie("vanillaSession");
            window.location.href = vanilla_sso_server + "zenApi/src/vanillaSSO.php?param=" + window.btoa(HelpCenter.user.email);
        }
/*************************** End Vanilla SSO - Mrunal *************************************/
      
}); // end access id_map JSON
    
/***************************  Cookies Functions ***************************/
//general cookie functions
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
        //this is a  function which can set cookie with our without time 
        //when time==0, set a function cookie without expire time
        if (time == 0) {
            document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; ';
        } else {
            var CookieDate = new Date();
            var today = new Date();
            CookieDate.setTime(today.getTime() + time);
            document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; expires=' + CookieDate.toGMTString() + ';';
        }
    };
  
    ////SSO cookie 
    //this function is creating a function cookie called "sso" to remember user current URL
    // read_cookie() and set_cookie() function is pre created. 
    function createSSOcookie() {
        if (read_cookie("sso") === "") {
            var current_url = window.location.href;
            var encode_current_url = encodeURIComponent(current_url);
            set_cookie("sso", encode_current_url, 0);
            //setCookie, 3rd parameter is 0 means no expire time, this is a function cookie
        }
    };

    //this function remove "sso" cookie by passing cookie name "sso" through parametre 
    function removeCookie(name) {
        if ((read_cookie("sso") != "")) {
            set_cookie(name, '', -1);
        }
    };

    //this function will redirect user to the URL which stored in "sso" function cookie 
    //read cookie function is pre created
    function redirectAccordingSSO_cookie() {
        var sso_encoded = read_cookie("sso");
        if ((sso_encoded != "") && (HelpCenter.user.role != "anonymous")) {
            var sso_decode = decodeURIComponent(sso_encoded);
            window.location.href = sso_decode;
            removeCookie("sso");
        } else {

        }
    };

    $(".login").click(function() {
        if (HelpCenter.user.role == "anonymous") {
            //when user started login, the user roll should be anonymous 
            //call the function createSSOcookie
            createSSOcookie();
        }
    });

    redirectAccordingSSO_cookie();
    if (HelpCenter.user.role == "anonymous") {
        removeCookie("sso");
    }
    //SSO cookie end
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
/***************************  End Cookies Functions ***************************/
/***************************  Cookie Bar ***************************/
    function post_decline_tt_settings() {
        $("#tt_cookie_bar").addClass("zd_Hidden");
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
/***************************  End Cookie Bar ***************************/

/***************************  End Exit Survey ***************************/

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
    var indexx = h * 0.70;
  
    function survey_on_mobile() {
        if (document.body.scrollTop > indexx || document.documentElement.scrollTop > indexx) {
            if (read_cookie("exit_survey") === "") {
                if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
                    $('#survey_modal').removeClass("zd_Hidden");
                }
            }
        }
    };

    window.ontouchmove = function() {
        survey_on_mobile();
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
/***************************  End Exit Survey ***************************/

/****************************  Zendesk code ************/
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

    //Toggles expanded aria to collapsible elements
    var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');


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
/****************************  Zendesk code ************/

/************* Redirecting untranslated articles to an existing language **************/

    var notDefaultLanguage = window.location.href.indexOf('/en-gb/') == -1;
  	var isArticle = window.location.href.indexOf('/articles/') > -1;
    var isErrorPage = $(".error-page").length > 0;
    if (isArticle && notDefaultLanguage && isErrorPage) {
        var newURL = window.location.href.replace(/(.*\/hc\/)([\w-]+)(\/.*)/, "$1en-gb$3");
        window.location.href = newURL;
    }
/************* End Redirecting untranslated articles to an existing language **************/
/****************** 'No results found' tracking *******************/
    var results_event_category = "";
    var results_event_action = "";
    var results_event_label = "";
    var resultslist = document.getElementsByClassName('search-results-list');
    if (window.location.href.indexOf("/search?utf8") > -1 && (resultslist.length === 0)) {
        var resultsheader = document.getElementsByClassName('search-results-subheading');
        var resultsheaderstring = resultsheader[0].innerHTML;
        var customersearch = resultsheaderstring.substring(
            resultsheaderstring.indexOf('"') + 1,
            resultsheaderstring.lastIndexOf('"')
        );
        results_event_category = "Search Results";
        results_event_action = "No Results found";
        results_event_label = customersearch;
        var waitForUtag = setInterval(function() {
            ga_tracking(results_event_category, results_event_action, results_event_label);
            clearInterval(waitForUtag);
        }, 1000);
    }
/****************** End 'No results found' tracking *******************/ //Amy DDA-512
  
/******************* Search bar placeholder ****************/ //Amy DDA-578
    var searchbar_placeholder = (document.getElementById("searchbar_placeholder").textContent);
    if (searchbar_placeholder != null) {
        document.getElementById("query").placeholder = searchbar_placeholder;
    }

/****************************** End Search bar placeholder **********************/ //Amy DDA-578
  
/****************************** Locale setting cookie *******************************/ //Amy DDA-646  
    if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
        if (read_cookie("tomtomlocale ") === "") {
            var zendesklocale = window.location.pathname.replace('/', '').replace('?', '/').split('/')[1];
            var tomtomlocale = zendesklocale.replace("-", "_");
            set_cookie("tomtomlocale", tomtomlocale, 0);
        }
        if (HelpCenter.user.role != 'anonymous') {
            function remove_cookie(name) {
                if ((read_cookie("tomtomlocale") != "")) {
                    set_cookie(name, "", -1);
                }
            };
            if (read_cookie("tomtomlocale") != "") {
                remove_cookie("tomtomlocale");
            };
        }
    }
/****************************** End Locale setting cookie *******************************/ //Amy DDA-646    

/******************************** Promoted Articles  ********************************/
    var numOfPromos = document.getElementsByClassName("mySlides");

    if (numOfPromos.length === 1) {
        $('#right-arrow').addClass("zd_Hidden");
        $('#left-arrow').addClass("zd_Hidden");
    }
    $('.close').click(function() { // This click function is to minimize the announcements box to the side   
        $('.promoted-articles-box').addClass("minimize");
        $('ul.promoted-articles').addClass("minimize-articles");
        $('.promoted_header').addClass("minimize-header");
        $('.promoted-articles-box').removeClass("articles");
        $('.close').addClass("zd_Hidden");
        $('.promoted_header h4').addClass("zd_Hidden");
        $('#right-arrow').addClass("zd_Hidden");
        $('#left-arrow').addClass("zd_Hidden");
        $('div#promoted-arrow').removeClass("zd_Hidden");
        if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
            set_cookie("announcement", "true", 0);
        }
    });

    if (read_cookie("announcement") === "true") {
        $('.close').click();
    }
    $('#promoted-arrow').click(function() { //This click function is to reopen the announcements   
        $('.promoted-articles-box').removeClass("minimize");
        $('ul.promoted-articles').removeClass("minimize-articles");
        $('.promoted_header').removeClass("minimize-header");
        $('.promoted-articles-box').addClass("articles");
        $('.close').removeClass("zd_Hidden");
        $('.promoted_header h4').removeClass("zd_Hidden");
        $('div#promoted-arrow').addClass("zd_Hidden");
        if (numOfPromos.length > 1) {
            $('#right-arrow').removeClass("zd_Hidden");
            $('#left-arrow').removeClass("zd_Hidden");
        }
        if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
            set_cookie("announcement", "false", 0);
        }
    });

    if (numOfPromos.length > 0) {
        var slideIndex = 1;
        showSlides(slideIndex);
        // Next/previous controls
        window.plusSlides = function(n) {
            showSlides(slideIndex += n);
        }
        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
        }
    }
/******************************** End of Promoted Articles ********************************/

/********************* Locale Footer Scroll ******************************/
    $(".footer_btn").click(function() {
        window.scrollTo(0, document.body.scrollHeight);
    });

/****************************** End of Locale Footer Scroll ******************************/ // Amy
  
/********************************** Updates Banner ********************************/ //Amy
    if (the_url.indexOf("/articles/") == -1) {
        var update_banner = document.getElementById('update-banner');
        update_banner.classList.remove('zd_Hidden');
    }
/********************************** End ofUpdates Banner ********************************/ //Amy
  
/************************* Retailer pop-up Banner ***********************/ //Amy  
        for (var c in HelpCenter.user.organizations) {
          if (HelpCenter.user.organizations[c].name === "TomTom Retailers"){
          var retailPopUp = document.getElementById("retail_popup");
            var TimeOutRetail = setTimeout(function() {            
                          if (read_cookie("RetailPopupClosed") === "") {                        
                                  $('#retail_popup').removeClass("zd_Hidden");   
                          }                  
              },
              5000);
          retailPopUp.onclick = function(){
            var cookieName = 'RetailPopupClosed';
            var numDaysClosed = 30;
            // set closed cookie
            if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * 24 * numDaysClosed);
            document.cookie = cookieName + "=1;expires=" + expire.toGMTString();
          }
          retailPopUp.classList.add('zd_Hidden');    
          };
          } 
      }
/************************* End of Retailer pop-up Banner ***********************/ //Amy  
/***************************** Article Satisfaction *********************/
  if (the_url.indexOf("/articles/") != -1) { // If the page is an article
    var articlevotebox = document.getElementsByClassName("article-votes")[0]; // Get the whole article box
    var articleupvote = document.getElementsByClassName("article-vote-up")[0]; // Get the vote up text button
    var articledownvote = document.getElementsByClassName("article-vote-down")[0]; // Get the vote down text button
    var articleupbutton = document.getElementById("article-vote-up-select"); // Get the vote up radio button
    var articledownbutton = document.getElementById("article-vote-down-select"); // Get the vote down radio button
        $(window).scroll(function() { // The article satisfaction box is hidden, this will appear after scrolling down
            if ($(this).scrollTop() >= 600) {
                $(articlevotebox).fadeIn(200);
            } else {
                $(articlevotebox).fadeOut(200); // scroll out again if they scroll back up
            }
        });
      
        $(".article-vote").click(function() { // if they click on either vote hide the box
             setTimeout(function(){ //set a 1 second timer so they see the lil CSS animation before hiding it
               $(articlevotebox).addClass("zd_Hidden"); //hide the box
                 }, 1000);
        }); // close the click function .article-vote
    
        var article_event_category = "FAQs"; // make the event category for Article Satisfaction
        var article_event_action = "clicked"; // make the event action for Article Satisfaction
        $(articleupvote).click(function() {  // click function if customer votes 'yes'   
        ga_tracking(article_event_category, article_event_action, "Satisfied"); //send GA tracking event
           $(articleupbutton).addClass('active'); // add the active class so users know they have clicked
         	 $(articledownbutton).removeClass('active'); // remove the active class from the other button if they have clicked that previously
        });  // end click function if customer votes 'yes'  
    
        $(articledownvote).click(function() {  // click function if customer votes 'no'   
        ga_tracking(article_event_category, article_event_action, "Unsatisfied");  //send GA tracking event
            $(articledownbutton).addClass('active'); // add the active class so users know they have clicked
            $(articleupbutton).removeClass('active'); // remove the active class from the other button if they have clicked that previously
        }); // end click function if customer votes 'no'  
    
         $(articleupbutton).click(function() { //this function is purley for users who click on the radio button instead of the link, it trigers the click functions above
           articleupvote.click();
         });
        $(articledownbutton).click(function() {  //this function is purley for users who click on the radio button instead of the link, it trigers the click functions above
           articledownvote.click();
         });                  
    
       if ($(articleupvote).attr("aria-selected") === "true") { // when the page loads, if they have voted in the past we will make the button active so they know their previous vote
            $(articleupbutton).addClass('active'); // adding active to the yes button if their vote was yes
        } else if ($(articledownvote).attr("aria-selected") === "true") {
            $(articledownbutton).addClass('active'); // adding active to the yes button if their vote was no
        } 
  };  //end IF the page is an article 
/***************************** End Article Satisfaction - Amy *****************************/
}); 
/************************* End of DOM js file function - put everything above this line ***********************/  
/*************************  Only insert after this if you need document to be ready ***********************/  
$(document).ready(function() { 
  var on__this_url = window.location.href; // Var in this function for the current URL
  
/*********************************** Articles ******************************/
  
    if (on__this_url.indexOf("/articles/") != -1) {

/**************************** Scroll tracking ***********************************/
        // Default time delay before checking location
        var callBackTime = 100;
        // # px before tracking a reader
        var readerLocation = 150;

        // Set some flags for tracking & execution
        var timer = 0;
        var scroller = false;
        var endContent = false;
        var didComplete = false;

        // Set some time variables to calculate reading time
        var startTime = new Date();
        var beginning = startTime.getTime();
        var totalTime = 0;

        // Get some information about the current page
        var pageTitle = document.title;

        // Check the location and track user
        function trackLocation() {
            bottom = $(window).height() + $(window).scrollTop();
            height = $(document).height();
            heightNoFooter = height - 1000;
            // If user starts to scroll send an event
            if (bottom > readerLocation && !scroller) {
                currentTime = new Date();
                scrollStart = currentTime.getTime();
                timeToScroll = Math.round((scrollStart - beginning) / 1000);
                utag.link({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ reading' });
                //                        ga('send', 'event', 'Reading', 'StartReading', pageTitle, timeToScroll, {'metric1': timeToScroll});
            }

            scroller = true;

            // If user has hit the bottom of the content send an event
            if (bottom >= heightNoFooter && !didComplete) {
                currentTime = new Date();
                end = currentTime.getTime();
                totalTime = Math.round((end - scrollStart) / 1000);
                utag.link({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ ended' });
                // ga('send', 'event', 'Reading', 'PageBottom', pageTitle, totalTime, {'metric3': totalTime});
                didComplete = true;
            }
        }
        // Track the scrolling and track location
        $(window).scroll(function() {
            if (timer) {
                clearTimeout(timer);
            }
            // Use a buffer so we don't call trackLocation too often.
            timer = setTimeout(trackLocation, callBackTime);
        });
        //  });
/************************ End ofScroll tracking ***********************************/

/************************ Responsive Videos ***********************************/
        $('.video-container').removeClass("video-container");
        $('.video-block').removeClass("video-block");
        $('iframe[src*="youtube"]').wrap("<div class='video-container'></div>");
        $('.video-container').wrap("<div class='video-block'></div>");
        $('.video-block').prependTo(".ts-article-video");
        $('.ts-article-video-header').prependTo(".ts-article-video");
        $('.article-links').appendTo('.ts-article-video');
/************************ End Responsive Videos ***********************************/
/************************ Article Fixes ***********************************/
        $('.tts-note').addClass("article-note");
        $('.article-note').removeClass("tts-note");
        $('.note').addClass("article-note");
        $('.article-note').removeClass("note");
/************************ End Article Fixes ***********************************/
/*****************************  Content Pages *******************************/
        $("<div class='ct-header-block'></div>").prependTo(".ct-article");
        $(".ct-article-header").prependTo(".ct-header-block");
        $(".ct-article-sub-header").appendTo(".ct-header-block");
        $(".ct-header-description").appendTo(".ct-header-block");
        $('<div id="option-1" class="ct-options" data="option-1-content"><span class="radiobtn"></span>Android</div>' +
            '<div class="ct-options" data="option-2-content"><span class="radiobtn"></span>iPhone</div>' +
            '<div class="ct-options" data="option-3-content"><span class="radiobtn"></span>Windows</div>').appendTo('.ct-options-list'); //adding radio options to content template  

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
        $('.ct-options').on('click', function(evt) {
            // where is the software name????
            var software = $(this).attr("data");
            openSoftware(evt, software);
        })
        $("#option-1").click();
/*****************************  End Content Pages *******************************/
/***************************** Back to top function *****************************/
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 2000) {

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
/********************* End back to top *****************************/
/*****************************  Troubleshooting Template *********************/
        var theLabels = document.getElementsByClassName("labels");
        if (theLabels.length > 0) {
            var i;
            for (i = 0; i < theLabels.length; i++) {
                var colorthese = theLabels[i].innerText;
                if ($('.ts-article-title').html().indexOf(colorthese) != -1) {
                    $(".ts-article-title:contains(" + colorthese + ")").html(function(_, html) {
                        return html.replace(colorthese, '<span class="ts-red">' + colorthese + '</span>');
                    });
                }
            }
        }
        $('.ts-article-extra').prependTo('.ts-article-body');
/********************* End of Troubleshooting Template *********************/
/*****************************  Get Started Template *********************/
        $('.gs-article-header-block').click(function() {
            $('body,html').animate({
                scrollTop: 850
            }, 500);
        });
/***************************** End of Get Started Template *********************/
/*****************************  How To Template *****************************/

        $('.ht-header-content').appendTo(".ht-article-header");
        $('.ht-article-body strong').contents().unwrap();

/***************************** End of  How To Template *****************************/
      
    } //end of 'if this is on an article'     
 /************************************* End of  Article Templates *****************************/

/********************* FORMS *****************************/
    //This code is to ensure only Signed in users see the request form if we add class="request"
    (function(_w, _d, $) {

        $(_d).ready(function() {
            var _locale = window.location.pathname.replace('/', '')
                .replace('?', '/').split('/')[1];
            if (HelpCenter.user.role == 'end_user') {
                $('.request')
                    .html('<a class="submit-a-request" href="/hc/' +
                        _locale + '/requests/new">' +
                        'Submit a request</a>');
            } else if (HelpCenter.user.role == 'anonymous') {
                $('.request')
                    .html('<a href="/hc/' +
                        _locale + '/signin">' +
                        'Submit a request</a>');
            }
        });
    }(window, document, jQuery));
/***************************** END FORMS *****************************/
/***************************** Temporary Header *****************************/

    //toggle the hamburger menu
    var button = document.getElementById('nav-main-hamburger');
    var nav = document.getElementById("nav-wrapper");

    button.onclick = function() {
        if (!nav.style.display || nav.style.display === "none") {
            nav.style.display = "block";
        } else {
            nav.style.display = "none";
        }
    };

    //Add the profile icon to the header
    $('<svg width="16" height="16" class="profile-icon"><path d="M2 14h12v-.012c0-.056-.11-.22-.602-.544-.62-.418-1.495-.778-2.613-1.058-1.034-.251-1.963-.374-2.785-.374-.822 0-1.75.123-2.772.371-1.131.283-2.006.643-2.64 1.07-.478.316-.588.48-.588.535V14zm6-3.988c.99 0 2.076.144 3.257.431 1.342.335 2.428.783 3.258 1.341.99.655 1.485 1.39 1.485 2.204V16H0v-2.012c0-.814.495-1.549 1.485-2.204.83-.558 1.916-1.006 3.258-1.34 1.181-.288 2.267-.432 3.257-.432zM8 6c.362 0 .672-.084.969-.26.318-.188.56-.43.747-.747a1.83 1.83 0 00.26-.969 1.96 1.96 0 00-.271-1.013 2.01 2.01 0 00-.736-.751A1.833 1.833 0 008 2a1.83 1.83 0 00-.969.26 2.01 2.01 0 00-.736.751 1.96 1.96 0 00-.271 1.013c0 .362.084.672.26.969.188.318.43.56.747.747.297.176.607.26.969.26zm0 2c-.719 0-1.381-.18-1.988-.539a4.065 4.065 0 01-1.45-1.449 3.832 3.832 0 01-.538-1.988c0-.719.18-1.39.539-2.012A4.008 4.008 0 016.012.539 3.832 3.832 0 018 0c.719 0 1.381.18 1.988.539.607.36 1.09.85 1.45 1.473a3.97 3.97 0 01.538 2.012c0 .719-.18 1.381-.539 1.988a4.065 4.065 0 01-1.449 1.45A3.845 3.845 0 018 8z" fill-rule="evenodd"></path></svg>').prependTo('.user-info > [role="button"]');

/***************************** End Temporary Header *****************************/

/********************  New request pages - product pre-select ********************/
    function getQueryParams(queryString) {
        queryString = queryString.split('+').join(' ');

        var params = {};
        var tokens;
        var regex = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = regex.exec(queryString)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }
    var params = getQueryParams(document.location.search);
    if (params.product) {
        $("#request_custom_fields_360005150940").val(params.product);
    }
    //hide org & form option
    $('.form-field.request_ticket_form_id').hide();
    $('.form-field.request_organization_id').hide();
/******************** End of New request pages - product pre-select ********************/ //Lorna Rickett 

}); // end of document ready function