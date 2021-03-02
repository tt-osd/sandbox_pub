// prepare all the form IDs and get value from map
var golf_form_id = mapObject.golf_form_ID[searchKey];
var strap_form_id = mapObject.strap_form_ID[searchKey];
var gdpr_form_id = mapObject.gdpr_form_ID[searchKey];
var email_form_id = mapObject.emailForm_ID[searchKey];
var rma_form_id = mapObject.RMA_form_ID[searchKey];
var Revlog_First_Name_EUR = mapObject.Revlog_First_Name_EUR[searchKey];
var Revlog_Last_Name_EUR = mapObject.Revlog_Last_Name_EUR[searchKey];
var Revlog_house_number_EUR = mapObject.Revlog_house_number_EUR[searchKey];
var Revlog_street_name_EUR = mapObject.Revlog_street_name_EUR[searchKey];
var Revlog_city_EUR = mapObject.Revlog_city_EUR[searchKey];
var Revlog_post_code_EUR = mapObject.Revlog_post_code_EUR[searchKey];
var email_form_product_input = mapObject.email_form_product_input[searchKey];
var serial_number_eur_field_id = mapObject.serial_number_EURO_field_ID[searchKey];
var rma_number_field_id = mapObject.rma_number_field_ID[searchKey];
var article_number_field_id = mapObject.article_number_field_ID[searchKey];
var oow_check_field_id = mapObject.oow_check_field_ID[searchKey];
var automated_strap_flag_field_id = mapObject.automated_strap_flag_field_ID[searchKey];
var gdpr_reason_field_id = mapObject.gdpr_reason_field_ID[searchKey];
var golfer_section_id = mapObject.golfer_section_ID[searchKey];
var tthome_section_id = mapObject.TT_home_section_ID[searchKey];
var talk_form_id = mapObject.talkForm_ID[searchKey];
var email_form_request_local_field = mapObject.email_form_request_locale[searchKey];
var auto_renewal_refund_form_id = mapObject.auto_renewal_refund_form_ID[searchKey];
var refund_form_id = mapObject.refund_form_ID[searchKey];
var ordernumber_field_id = mapObject.ordernumber_field_ID[searchKey];
var sap_order_number_eur_field = mapObject.sap_order_number_EURO_field[searchKey];
var sap_total_refund_amount_eur_field = mapObject.sap_total_refund_amount_EURO_field[searchKey];
var sap_currency_eur_field = mapObject.sap_currency_EURO_field[searchKey];
var strap_form_purchase_date = mapObject.date_of_purchase_EURO_field_id[searchKey];
var gold_course_input = mapObject.course_name_EURO_field_id[searchKey];
var api_server_url = mapObject.proxy_api_server[searchKey];
var accounts_form_ID = mapObject.accounts_form_ID[searchKey];
var rider_extra_warranty_form_id = mapObject.Rider_extra_warranty[searchKey];
var extra_warranty_dropDown = mapObject.extra_warranty_eur[searchKey];
var user_locale = $('html').attr('lang').toLowerCase();

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


//this is the function for front end serial number field on_input validation
function serial_nm_verify(button) {
    // document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 
    // serial number input max length is 12
    document.getElementById("request_custom_fields_" + serial_number_eur_field_id).maxLength = 12;
    // serial number input max length is 12

    //serial number allows letters and numbers only, no punctuation or special characters
    // document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("pattern", "[A-Za-z0-9]+");
    //serial number allows letters and numbers only, no punctuation or special characters

    var serial_number_input = (document.getElementById("request_custom_fields_" + serial_number_eur_field_id).value).toString();
    if ((serial_number_input.length) >= 2) { // check if input is greater than 2
        var first_digit = parseInt(serial_number_input.charAt(0));
        //var second_digit = parseInt(serial_number_input.charAt(1));
        serial_prefix = serial_number_input.substring(0, 2); //we need serial prefix to send to API
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

                        /////Get Sunshine and RMA articles
                        var current_user = HelpCenter.user.email;
                        var serialkey = serial_number_input.substring(0, 2);
                        //==========================Pending=========================//
                        //change request type - need only default straps
                        submitStrapRequest("getSunshineStrapList", serialkey);
                    } else {
                        button.disabled = true;
                    }
                }
            } // end when its hit the 7th character, check if its letter
        } //closing if both first two serial number input is not integer number
    } // close check if input is greater than 2

    console.log("function being called serial_nm_verify(button) ");
}

/************************************ End of Function for Serial Number validation ************************************/


/************************************ Call API to get straps dropdown values (article no dropdown) - Asmita **********************/
// this is a callback function for ajax
function successCallBack(data) {
    if (data.requesttype == "getCUDSdata") {
        var currlocale = HelpCenter.user.locale;
        if (!currlocale.includes((data.country).toLowerCase())) {
            //add force redirect according to locale
        }
    }
    if (data.requesttype == "getSunshineStrapList") {
        var defaultoption = $('#select_article').text();
        $('#article_no').empty();
        $('#article_no').append("<option id='select_article' value='0'>" + defaultoption + "</option>");
        $.each(data.articlenumbers, function(art_no, art_name) {
            $('#article_no').append("<option value='" + art_no + "'>" + art_name + "</option>");
        });
    }
}

// Function for all strap related API calls
/** strapData - Sending serial number and getting respected article numbers (straps) OR locale to redirect user if needed
 *** requesttype - type of request so we can identify which request needs to return in PHP controller
 **/
function submitStrapRequest(requesttype, strapData = '') {
    var curruseremail = HelpCenter.user.email;
    server_url = api_server_url + 'zenApi/src/strapController.php';
    $.ajax({
        url: server_url,
        type: 'POST',
        dataType: 'JSON',
        data: { e_valid: curruseremail, r_type: requesttype, zd_qr: strapData },
        success: successCallBack,
        error: function(request, error) {
            console.log('error : ' + error);
            console.log("Request: " + JSON.stringify(request));
        }
    });
}
/************************************ End - straps dropdown (article no dropdown) **********************/

/****************************************** Ticket Forms ********************************/
//Documentation: https://confluence.tomtomgroup.com/display/CCWEBDEV/Ticket+Forms 
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


//if the serial number input and purchase date input both, found => strap form
var purchase_date = document.getElementById("request_custom_fields_" + strap_form_purchase_date)
var serial_no_user_input = document.getElementById("request_custom_fields_" + serial_number_eur_field_id);
var rma_number_input = document.getElementById("request_custom_fields_" + rma_number_field_id);
var automated_strap_input = document.getElementById("request_custom_fields_" + automated_strap_flag_field_id);
var article_number_input = document.getElementById("request_custom_fields_" + article_number_field_id);
//this element is the GPRD reason input, which dedicates that its only shows up on GDPR form
var gdpr = document.getElementById("request_custom_fields_" + gdpr_reason_field_id);
//if product field is found => email form request_custom_fields_360005150940, email_form_product_input
var email_form_pt_dropdown = document.getElementById("request_custom_fields_" + email_form_product_input);
//for refund request form
var order_number_feild = document.getElementById("request_custom_fields_" + ordernumber_field_id);
//for Auto renewal Refund Request FORM
var auto_order_number_feild = document.getElementById("request_custom_fields_" + sap_order_number_eur_field);
//for Gold feedback form
var course_name = document.getElementById("request_custom_fields_" + gold_course_input);

var form_selection_field = document.getElementById("request_issue_type_select"); // Select the field that contains the form currently selected
var userSelected = form_selection_field.value; // Get the value that is currently selected 

//Revlog_First_Name_EUR
var rma_first_name = document.getElementById("request_custom_fields_" + Revlog_First_Name_EUR);
var rma_last_name = document.getElementById("request_custom_fields_" + Revlog_Last_Name_EUR);

//extra warranty drop down for rider 
var extra_warranty_drop_down = document.getElementById("request_custom_fields_" + extra_warranty_dropDown);


/****************************** STRAP REQUEST FORM *************************************/
//update IF statement, due to the adding RMA form which contains purchase_date and serial_no_user_input field
//extend IF staement to exclude first_name and last_name field to make sure the following functions does not execute on RMA form page
if ((purchase_date != null) && (serial_no_user_input != null) && ((rma_first_name == null) && (rma_last_name == null))) {
    //Sandbox : /requests/new?ticket_form_id=360001159659 
    //Live : /requests/new?ticket_form_id=360000746440
    //// get user country to cross check wth currecnt locale, else re-direct user to respective interface/locale ////
    var current_user = HelpCenter.user.email;
    submitStrapRequest("getCUDSdata");

    var strap_page_title = document.getElementById("strap_page_title").innerHTML;
    if (strap_page_title != null) {
        document.title = strap_page_title;
        SubjectLine.value = strap_page_title + " " + strap_form_id; //Insert Strap form subject line	
        DescriptionBox.value = strap_page_title; // Add value to description as it's 'required'
    }
    $("#new_request .form-field").addClass("required"); //add required class to attachments
    $(".datepicker").attr('required', 'true'); // make date picker required

    //dda1022
    $("#manual_added").insertAfter(".request_custom_fields_" + serial_number_eur_field_id);
    $("#manual_added").removeClass("zd_Hidden");

    // This is to prefill and hide the fields on the Strap Request Form //  
    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
    $('.request_description').addClass("zd_Hidden"); // Hide description
    $('.request_ticket_form_id').addClass("zd_Hidden"); // Hide the Form drop down
    $('.request_custom_fields_' + article_number_field_id).addClass("zd_Hidden"); //Hide article number field for end-user
    $('.request_custom_fields_' + automated_strap_flag_field_id).addClass("zd_Hidden"); //Hide strap automated flag field for end-user

    //---------------------------------------------------------------------//
    if (automated_strap_input != null) { // if this is the automated strap form
        //Sandbox : 360000671760 
        //Live : 360001159679
        // This is to prefill and hide the fields on the Strap Request Form //  
        $('.request_custom_fields_' + oow_check_field_id).addClass("zd_Hidden"); // Hide OOW check
        $('.request_custom_fields_' + rma_number_field_id).addClass("zd_Hidden"); //Hide RMA created flag

        ////Set automated form flag to true (1) ////
        $('#request_custom_fields_' + automated_strap_flag_field_id).text("1");
        $('#request_custom_fields_' + automated_strap_flag_field_id).val("1");
    }
    //-------------------------------------------------------------------------//
    $('<p id="strap_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
    $("#strap_form_tips_p").html($("#strap_form_tips").html());

    SubjectLine.value = strap_page_title + " " + strap_form_id; //Insert Strap form subject line	
    DescriptionBox.value = strap_page_title; // Add value to description as it's 'required'

    //create a live validation form
    //disable the submit button 
    var button = (document.getElementsByName("commit"))[0];
    button.id = "submit_strap_request1";
    button.disabled = true;
    // after the following validation is passed, this button will be enabled.

    // serial number input max length is 12
    document.getElementById("request_custom_fields_" + serial_number_eur_field_id).maxLength = 12;
    // serial number input max length is 12
    document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 

    //serial number allows letters and numbers only, no punctuation or special characters
    // document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("pattern", "[A-Za-z0-9]+");
    //serial number allows letters and numbers only, no punctuation or special characters

    //serial number live validation
    //set a variable for serial number validation with 0 default which means not valid yet
    var validSerialNumber = 0;
    var serial_prefix = "";

    $("#request_custom_fields_" + serial_number_eur_field_id).on('input', function() {

        serial_nm_verify(button);

        console.log("function called from strap form");
        // var serial_number_input = (document.getElementById("request_custom_fields_" + serial_number_eur_field_id).value).toString();
        // if ((serial_number_input.length) >= 2) { // check if input is greater than 2
        //     var first_digit = parseInt(serial_number_input.charAt(0));
        //     //var second_digit = parseInt(serial_number_input.charAt(1));
        //     serial_prefix = serial_number_input.substring(0, 2); //we need serial prefix to send to API
        //     if (isNaN(first_digit)) {
        //         //when the first of serial number input is not number
        //         if ((serial_number_input.length) >= 7) {
        //             //when its hit the 7th character, check if its letter
        //             var seventh_digit = parseInt(serial_number_input.charAt(6));
        //             if ((isNaN(seventh_digit))) {
        //                 //when the 7th of serial number input is not number
        //                 if ((serial_number_input.length) == 12) {
        //                     //here call the function to check the number part
        //                     // to be implemented
        //                     checkNums(serial_number_input, button, validSerialNumber);

        //                     /////Get Sunshine and RMA articles
        //                     var current_user = HelpCenter.user.email;
        //                     var serialkey = serial_number_input.substring(0, 2);
        //                     //==========================Pending=========================//
        //                     //change request type - need only default straps
        //                     submitStrapRequest("getSunshineStrapList", serialkey);
        //                 } else {
        //                     button.disabled = true;
        //                 }
        //             }
        //         } // end when its hit the 7th character, check if its letter
        //     } //closing if both first two serial number input is not integer number
        // } // close check if input is greater than 2
    }); // end of serial number oninput function 

    var articleno = '';
    $('#article_no').on('change', function() {
        articleno = $('#article_no :selected').attr('value');
        $('#request_custom_fields_' + article_number_field_id).text(articleno);
        $('#request_custom_fields_' + article_number_field_id).val(articleno);
    });

    //Add validations for all feilds
    $('#submit_strap_request1').on('click', function() {
        var eol_prefixes = ["HC", "HD", "HE", "HF"];
        ////check for EOL strap prefixes - HC, HD, HE, HF
        if ($.inArray(serial_prefix, eol_prefixes) > -1) {
            $("#eol_prefix_alert").removeClass("zd_Hidden");
            $("#eol_prefix_alert").show();
            return false;
        } else {
            $("#eol_prefix_alert").hide();
        }

        articleno = $('#article_no :selected').attr('value');
        if (articleno == 0) {
            $("#article_no").css("border", "solid 1px red");
            //alert("Select strap");
            return false;
        }
    });
    // the end of if-at strap form page

    /******************************** END STRAP REQUEST FORM ********************************/
} else if (gdpr != null) {
    /********************************* GDPR FORM  **************************************/
    //testing URL hc/en-gb/requests/new?ticket_form_id=360000569919
    var GDPR_page_title = document.getElementById("GDPR_page_title").innerHTML;
    if (GDPR_page_title != null) {
        document.title = GDPR_page_title; //page title from Dynamic Content 
    }
    //request_custom_fields_360007572579
    // title.innerHTML = "{{dc 'gdpr_request_form'}}" ;
    $(".form-field").addClass("zd_Hidden");
    $(".request_custom_fields_" + gdpr_reason_field_id).removeClass("zd_Hidden");
    //update
    SubjectLine.value = GDPR_page_title + " " + gdpr_form_id;
    DescriptionBox.value = GDPR_page_title;
    (AttachmentsFileDrop.parentElement).classList.add("zd_Hidden");
    /********************************* GDPR FORM  **************************************/
} else if (email_form_pt_dropdown != null) {
    /********************************* Email FORM ******************************/
    //testing url /requests/new?ticket_form_id=360000358360
    var email_page_title = document.getElementById("email_page_title").innerHTML;
    document.title = email_page_title;
    $(".request_custom_fields_" + email_form_request_local_field).addClass("zd_Hidden");
    $("#request_custom_fields_" + email_form_request_local_field).val(user_locale);
    // this has been changed to use $('html').attr('lang').toLowerCase(); instead, because helpcenter.user is not accessable from separated JS
    /********************************* Email FORM ******************************/
} else if (order_number_feild != null) {
    /********************************* Refund request FORM ******************************/
    //testing URL hc/en-gb/requests/new?ticket_form_id=360000849779    
    var refund_request_page_title = document.getElementById("refund_request_page_title").innerHTML;
    document.title = refund_request_page_title;
    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
    SubjectLine.value = refund_request_page_title + " " + refund_form_id;

    //disable the submit button 
    var refund_btn_form = document.getElementById("new_request");
    var commit_button = (refund_btn_form.querySelector("input[name = 'commit']"));
    if (commit_button != null) {
        commit_button.disabled = true;
    }


    // after the following validation is passed, this button will be enabled.

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
            commit_button.disabled = false;
        } else {
            commit_button.disabled = true;
        }
    }); // end of order number on input function 
    /********************************* Refund request FORM ******************************/
} else if (auto_order_number_feild != null) {
    /******************  Auto renewal Refund Request FORM ******************/
    //testing url /hc/en-gb/requests/new?ticket_form_id=360000875500
    var auto_renewal_request_page_title = document.getElementById("auto_renewal_request_page_title").innerHTML;
    var renewal_refund_amount = document.getElementById("renewal_refund_amount").innerHTML;
    document.title = auto_renewal_request_page_title; // document title (page title) 
    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
    SubjectLine.value = auto_renewal_request_page_title + " " + auto_renewal_refund_form_id; //pre fill subject line

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
    /******************  Auto renewal Refund Request FORM ******************/
} else if (course_name != null) {
    /****************** Golf feedback FORM ******************/
    //testing URL hc/en-gb/requests/new?ticket_form_id=360000679879
    var golf_page_title = document.getElementById("golf_page_title").innerHTML;
    document.title = golf_page_title;
    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
    SubjectLine.value = golf_page_title + " " + golf_form_id;
    $('<p id="golf_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
    $("#golf_form_tips_p").html($("#golf_form_tips").html());
    /****************** End of Golf feedback FORM ******************/
} else if (userSelected == accounts_form_ID) { //if the form selection field selected is accounts form ID 
    /****************** Account issues FORM ******************/
    // sandbox testing URL /hc/en-gb/requests/new?ticket_form_id=360001234199
    // prod testing URL /hc/en-gb/requests/new?ticket_form_id=360001234219 
    var accounts_page_title = document.getElementById("form_title_account_issues").innerHTML; // get the dc (in new_request_page.hbs) 
    document.title = accounts_page_title; // put the content from the DC into the page title
    SubjectLine.value = accounts_page_title; // put the content into the subject line 
    SubjectLine.setAttribute("readonly", true); // make the subject line read only
    var form_anon_message = document.getElementById('form_anon_message'); // get the elements form anon messsage (this message only appear on the request page if the customer is not logged in)
    if (form_anon_message != null) { // so if this element exists, the user must not be logged in
        form_anon_message.classList.add("zd_Hidden"); // hide the message telling the customer to log in
        var form_anon_hidden = document.getElementById('form_anon_hidden'); // get the message about accounts
        form_anon_hidden.classList.remove("zd_Hidden"); // show this message
    } else { // if customer is logged in
        var submit_button_form = document.getElementById("new_request"); // get the form
        var submit_button = (submit_button_form.querySelector("input[name = 'commit']")); // get the submit button
        submit_button.disabled = true; // disable the submit button (if the are logged in they don't have account issues)
    }
    var attachments_field = document.getElementById('request-attachments').parentNode.parentNode;
    attachments_field.classList.add("zd_Hidden"); // hide attachments 
    $('<p id="account_issues_tips_p" class="form_sub_title"></p>').insertBefore('.form'); // This is to display a message to the customers that it's a the account issues form 
    $("#account_issues_tips_p").html($("#account_issues_tips").html()); // same as above
    /****************** End of Account issues FORM ******************/
} else if ((rma_first_name != null) && (rma_last_name != null)) {
    //https://supportsandbox.tomtom.com/hc/en-gb/requests/new?ticket_form_id=360001450159
    ///hc/en-gb/requests/new?ticket_form_id=360000953020 prod 

    var RMA_page_title = document.getElementById("RMA_form_title").innerHTML;
    if (RMA_page_title != null) {
        document.title = RMA_page_title;
        SubjectLine.value = RMA_page_title + " " + rma_form_id; //Insert Strap form subject line
    }

    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
    //  DescriptionBox.value = RMA_page_title; // Add value to description as it's 'required'

    $(".request_custom_fields_" + email_form_request_local_field).addClass("zd_Hidden");
    $("#request_custom_fields_" + email_form_request_local_field).val(user_locale);
    $(".request_custom_fields_" + Revlog_First_Name_EUR).addClass("tt_form_inline");
    $(".request_custom_fields_" + Revlog_Last_Name_EUR).addClass("tt_form_inline");
    $(".request_custom_fields_" + Revlog_Last_Name_EUR).addClass("margin_left");
    /*var Revlog_house_number_EUR=mapObject.Revlog_house_number_EUR[searchKey];
var Revlog_street_name_EUR=mapObject.Revlog_street_name_EUR[searchKey];
var Revlog_city_EUR=mapObject.Revlog_city_EUR[searchKey];
var Revlog_post_code_EUR=mapObject.Revlog_post_code_EUR[searchKey];*/
    $(".request_custom_fields_" + Revlog_house_number_EUR).addClass("small");
    $(".request_custom_fields_" + Revlog_post_code_EUR).addClass("small");
    $(".request_custom_fields_" + Revlog_street_name_EUR).addClass("big");
    $(".request_custom_fields_" + Revlog_city_EUR).addClass("big");


    console.log("RMA");

} else if (extra_warranty_drop_down != null) {
    //    //https://supportsandbox.tomtom.com/hc/en-gb/requests/new?ticket_form_id=360001495600

    var rider_extra_warranty_form_title = document.getElementById("rider_extra_warranty_form_title").innerHTML;
    if (rider_extra_warranty_form_title != null) {
        document.title = rider_extra_warranty_form_title;
        SubjectLine.value = rider_extra_warranty_form_title + " " + rider_extra_warranty_form_id; //Insert Strap form subject line
    }

    DescriptionBox.value = rider_extra_warranty_form_title;
    $(".request_description").addClass("zd_Hidden");
    $('.request_subject').addClass("zd_Hidden");


    var button = (document.getElementsByName("commit"))[0];
    button.disabled = true;
    document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 

    $("#request_custom_fields_" + serial_number_eur_field_id).on('input', function() {

        //call serial number validation function
        serial_nm_verify(button);
        //  console.log("hello hello ");

    });

    console.log("Rider");

} else {


} //end of validation for all forms

/****************** GA tracking if customer submits forms *********************/
var ticket_form = document.getElementById("new_request");
var submit_form_footer = ticket_form.getElementsByTagName("footer")[0];
var submit_form_button = submit_form_footer.getElementsByTagName("input")[0];
var submit_form_button_category = "Form";
var submit_form_button_action = document.title;
var submit_form_button_event = "validation success";
$(submit_form_button).click(function() {
    ga_tracking(submit_form_button_category, submit_form_button_action, submit_form_button_event);
});
/****************** End GA tracking if customer submits forms *********************/
/****************** Form Title Reflects the form you are on *********************/
var form_title = document.getElementById("form_title");
form_title = form_title.innerHTML = document.title;
/****************** Form Title Reflects the form you are on *********************/