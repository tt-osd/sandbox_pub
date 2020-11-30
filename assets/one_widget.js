/**/
/*
READ ME!
This script file including all the functionalities for Zendesk Widget, widget & bongo combo for selected locale and most of bongo functions
in zendesk widget, only contact form is currently enabled!
*/
/**/

/*1. zendesk widget settings and functions*/

function getLocale() {  // getting locale from url instead of helpcenter.user.locale, because user only works when logged in
    return window.location.href
           .split('/hc/')[1]
           .split('/')[0];
   }

var chatLocale = getLocale(); // get locale for chat and other functions
var chat_department = "unknown";
var country_code = "unknown";
for (key in mapObject) { //function for matching chat dept to current locale
    if (chatLocale == key) {
        chat_department = mapObject[key][1].chat_department;
        country_code = mapObject[key][0].country_code;
    }
}
// the for loop above using liner searching through every object in map JSON, 
// as in working on DDA 789, rewrite of chat departments objects is not included
// for the future imporvement, fetch chat department from map could use the following

//search key are in two scenarios: supportsandbox or help, as the key word in sandbox/ prod url
// and the new object signature looks like this:
/* "talkForm_ID": {
    "supportsandbox": 360000794359,
    "help": 360000796079
}
which allowss var pick up data from map faster without looping through whole JSON file*/
var email_form_ID_webwidget = mapObject.emailForm_ID[searchKey]; //use emailForm_ID instead
var email_form_request_local_field = mapObject.email_form_request_locale[searchKey];
var talkLocale = $('html').attr('lang').toLowerCase();
var chatLabel = document.getElementById("chatLabel").textContent;
var chatlabelonline = document.getElementById("chatlabelonline").textContent;
var chatlabeloffline = document.getElementById("chatlabeloffline").textContent;
var contactformlabel = document.getElementById("contactformlabel").textContent;
var Homepage_Login = document.getElementById("Homepage_Login").textContent;
var widget_helpcenter_placeholder = document.getElementById("widget_helpcenter_placeholder").textContent;
var talk_form_id_per_selected_local = 0;
var talk_form_id = mapObject.talkForm_ID[searchKey];
var phoneline = (document.getElementById("phoneline").textContent).split("/");
var pl;
var nav_cat_id = mapObject.naviagtion_category_ID[searchKey];
var spts_cat_id = mapObject.sports_category_ID[searchKey];
var apps_cat_id = mapObject.apps_category_ID[searchKey];
var userManualsReleaseInfo_cat_id = mapObject.user_manual_release_info_category_ID[searchKey];
var tthome_section_id = mapObject.TT_home_section_ID[searchKey];

function loginFromWidget() { // if you click login from widget

    $(".login")[0].click();
    ga_tracking("Zendesk Web Widget", "logged in", " ");

} //end of if you click login from widget

function widget_settings() {    

    for (pl in phoneline) {
        if (phoneline[pl] == talkLocale) {
            talk_form_id_per_selected_local = talk_form_id;
        }
    }

    zESettings = {
        webWidget: {
            contactOptions: {
                enabled: true,
                chatLabelOnline: { '*': chatlabelonline },
                chatLabelOffline: { '*': chatlabeloffline },
                contactFormLabel: { '*': contactformlabel } //if Talk then show Email us or phone us; else just Email us
            },
            helpCenter: {
                searchPlaceholder: {
                    '*': widget_helpcenter_placeholder
                },

            },
            contactForm: {
                fields: [
                    { id: 'name', prefill: { '*': HelpCenter.user.name } }, //prefilling username
                    { id: 'email', prefill: { '*': HelpCenter.user.email } } //prefilling email
                ],
                ticketForms: [
                        { id: talk_form_id_per_selected_local, fields: [{ id: 'subject', prefill: { '*': '360000794359' } }] },
                        { id: email_form_ID_webwidget, fields: [{ id: email_form_request_local_field, prefill: { '*': talkLocale } }] }
                    ] //displays the ticket forms: Contact, strap form and Golf. Add any IDs you want to show
            },
            color: {
                theme: '#df1b12',
                launcher: '#df1b12', // This will also update the badge
                launcherText: '#FFF',
                button: '#df1b12',
                resultLists: '#000',
                header: '#df1b12',
                articleLinks: '#DF1B12'
            },
            launcher: {
                chatLabel: { "*": chatLabel },
                label: { "*": chatLabel },
                mobile: {
                    labelVisible: true
                }
            },
            chat: {
                departments: {
                    enabled: []
                }
            }
        }
    }; // End of webwidget settings
    //this was in Script.js
 
} //end of   function widget_settings(){

// call the widget setting function as script is loading from HTML header
widget_settings();


//one wairForZen function for all zendesk widget configuration on frontend
var waitForZen = setInterval(function() {
        if (window.$zopim === undefined || window.$zopim.livechat === undefined) {
            return;
        }
        zE('webWidget', 'setLocale', country_code);
        zE('webWidget:on', 'open', function() {

            if (HelpCenter.user.role == "anonymous") {
                zE('webWidget', 'updateSettings', {
                    chat: {
                        'suppress': true
                    },
                    talk: {
                        'suppress': true
                    },
                    contactForm: {
                        'suppress': true
                    }
                });

                var a = document.getElementById('webWidget');
                var frameBody = a.contentWindow.document.getElementsByTagName("body")[0];
                var login_reminder_box = document.createElement('div');
                login_reminder_box.id = 'login_reminder_box';
                login_reminder_box.setAttribute("style", "position:absolute; width:341px; bottom:21px; left: 18px; margin: 0 1px; text-align:center; padding: 1.07143rem 1.42857rem;color: #df1b12;cursor:pointer;user-select: none;font-weight: bold;");
                var full_size_widget = a.style.width;
                if (full_size_widget == "100%") {
                    login_reminder_box.setAttribute("style", "position:absolute; width:100%; bottom:0; margin: 0; text-align:center; box-shadow: rgba(0, 0, 0, 0.08) 0px -0.0714286rem 0.857143rem;padding: 1.07143rem 1.42857rem;border-top: 0.0785714rem solid rgb(233, 235, 237);background: #fff;color: #df1b12;cursor:pointer;user-select: none;");
                }
                var loginMSG = document.createElement('p');
                var textnode = document.createTextNode(Homepage_Login);
                loginMSG.appendChild(textnode);
                zE('webWidget:on', 'userEvent', function(event) {
                    if (event.action == "Help Center Search") {
                        login_reminder_box.appendChild(loginMSG);
                        login_reminder_box.addEventListener("click", loginFromWidget); // add event listeners function to trigger logging in
                        frameBody.appendChild(login_reminder_box);
                        // this does not apply to if dutch FAQ is suppressed
                        //because it will not enter "Help Center Search" if-statement
                    }
                });
            } //closing  if (HelpCenter.user.role == "anonymous") {            

            zE('webWidget:on', 'userEvent', function(event) {
                if (bongowidgetcombo == 1) {
                    // turn bongo widget on and off by changing the DC 'bongoWidgetCombo'
                    if (event.action == "Web Widget Minimised") {
                        if (Bots.isChatOpened()) {} else {
                            //when minimise the Zendesk widget, if bongo conversation is not opened, then the launcher should shows up
                            var allInOneLauncher = document.getElementById("all_in_one_widget");
                            allInOneLauncher.classList.remove("zd_Hidden");
                            allInOneLauncher.classList.add("allInOneWidgetButton");
                        }

                    }
                }

            });
            /*closing chat department*/

        }); //closing zE('webWidget:on', 'open', function() {


        // this function cannot be triggered in "zE('webWidget:on', 'open', function() {
        //when chat is ongoining but user goes to new pages, chat will pop up by itself, so we hide launcher
        zE('webWidget:on', 'userEvent', function(event) {
            if (event.action == "Web Widget Opened") {
                var allInOneLauncher = document.getElementById("all_in_one_widget");
                if (allInOneLauncher != null) {
                    if (allInOneLauncher.classList.contains("allInOneWidgetButton")) {
                        //if it has class to show it on page
                        //remove the class
                        allInOneLauncher.classList.remove("allInOneWidgetButton");
                    }
                    if (!(allInOneLauncher.classList.contains("zd_Hidden"))) {
                        //if it not having a Hidden Class to hide it
                        //hide it
                        allInOneLauncher.classList.add("zd_Hidden");
                    }
                }

            }

        });


        zE('webWidget:on', 'chat:departmentStatus', function(dept) {
            if (dept.name === chat_department && dept.status === 'online' && chatLocale === country_code) {
                zE('webWidget', 'updateSettings', {
                    webWidget: {
                        chat: {
                            departments: {
                                enabled: [''],
                                select: chat_department
                            },
                            suppress: false
                        }
                    }
                });
            } else {
                if (dept.name === chat_department && dept.status !== 'online' && chatLocale === country_code) {
                    zE('webWidget', 'updateSettings', {
                        webWidget: {
                            chat: {
                                suppress: true
                            }
                        }
                    });

                    function scf() {
                        var a = document.getElementById('webWidget');
                        var frameBody = a.contentWindow.document.getElementsByTagName("body")[0];
                        var frame_embed = frameBody.querySelector("#Embed");
                        var form = frame_embed.querySelector("form");
                        var layer = form.querySelector('div[id="conver_layer"]');
                        layer.remove();
                    }

                    var phone_line = (document.getElementById("phoneline").textContent);

                    if ((phone_line.indexOf(chatLocale)) == -1) {
                        //for no phone line country, show chat off line message when chat is off line
                        zE('webWidget:on', 'userEvent', function(event) {
                            if (event.action == "Contact Form Shown") {
                                var a = document.getElementById('webWidget');
                                var frameBody = a.contentWindow.document.getElementsByTagName("body")[0];
                                var frame_embed = frameBody.querySelector("#Embed");
                                var form = frame_embed.querySelector("form");
                                if (form != null) {

                                    var cover_layer = document.createElement('div');
                                    cover_layer.id = 'conver_layer';
                                    cover_layer.setAttribute("style", "position:absolute; height:100%; width:100%; text-align:center; background-color:#fff;padding:0 5%;");

                                    var container_a = document.createElement('div');
                                    container_a.id = 'chat_offline';
                                    container_a.setAttribute("style", " width:100%; box-shadow:0 0.07143rem 0.57143rem 0 rgba(0, 0, 0, 0.2); border-radius:0.28571rem; text-align:center; padding:35px 0; user-select: none; margin-top:5%;");
                                    var chatOffline = document.createElement('span');

                                    var chatOffline_node = document.createTextNode(chatlabeloffline);
                                    chatOffline.appendChild(chatOffline_node);
                                    container_a.appendChild(chatOffline);


                                    var container_b = document.createElement('div');
                                    container_b.id = 'open_contactForm';
                                    container_b.setAttribute("style", " width:100%; box-shadow:0 0.07143rem 0.57143rem 0 rgba(0, 0, 0, 0.2); border-radius:0.28571rem; text-align:center; padding:35px 0; cursor:pointer;margin-top:5%;");
                                    var show_contactForm = document.createElement('span');


                                    var show_contactForm_node = document.createTextNode(contactformlabel);
                                    show_contactForm.appendChild(show_contactForm_node);
                                    container_b.appendChild(show_contactForm);
                                    cover_layer.appendChild(container_b);
                                    cover_layer.appendChild(container_a);
                                    container_b.addEventListener("click", scf);

                                    form.appendChild(cover_layer);
                                } // closing if (form != null) {
                            } //closing  if (event.action == "Contact Form Shown") {
                        }); //   zE('webWidget:on', 'userEvent', function(event) {
                    } // closing  if ((phone_line.indexOf(chatLocale)) == -1) {
                } // closing  if (dept.name === chat_department && dept.status !== 'online' && chatLocale === country_code)
            } //closing else
        }); // closing   zE('webWidget:on', 'chat:departmentStatus', function(dept) {


        //prepare chat tag data
        var chat_tag = "prd_npr";
        if ((the_url.indexOf(nav_cat_id) != -1) && (the_url.indexOf("categories") != -1)) {
            chat_tag = "prd_nav";
        } else if ((the_url.indexOf("articles") != -1) || (the_url.indexOf("sections") != -1)) {
            //articles or sections page
            var bread = document.querySelector('ol[class="breadcrumbs"]');
            var category_from_breadcrumb = bread.getElementsByTagName('li')[1];
            var anchor = ((category_from_breadcrumb.getElementsByTagName('a'))[0]).href;
            if ((anchor.indexOf(nav_cat_id) != -1)) {
                chat_tag = "prd_nav";
            } else if ((anchor.indexOf(spts_cat_id) != -1)) {
                chat_tag = "prd_spts";
            } else if ((anchor.indexOf(apps_cat_id) != -1)) {
                chat_tag = "prd_apps";
            } else if ((anchor.indexOf(userManualsReleaseInfo_cat_id) != -1)) {
                chat_tag = "prd_nav";
            } else {}

            //when on the article or section page, there is a 3rd element on breadcrumb
            //if this 3rd one is TOMTOM home, then chat tag is prd_auto
            var tomtomHOME_from_breadcrumb = bread.getElementsByTagName('li')[2];
            var TT_HOME_anchor = ((tomtomHOME_from_breadcrumb.getElementsByTagName('a'))[0]).href;
            if (TT_HOME_anchor.indexOf(tthome_section_id) != -1) {
                chat_tag = "prd_auto";
            }

        } else if ((the_url.indexOf(spts_cat_id) != -1) && (the_url.indexOf("categories") != -1)) {
            //sports category page 
            chat_tag = "prd_spts";
        } else if ((the_url.indexOf(apps_cat_id) != -1) && (the_url.indexOf("categories") != -1)) {
            //Apps category page 
            chat_tag = "prd_apps";

        } else if ((the_url.indexOf(userManualsReleaseInfo_cat_id) != -1) && (the_url.indexOf("categories") != -1)) {
            //User-Manuals-Release-Info category page 
            chat_tag = "prd_nav";

        }
        //ie11 hates this
        //else if((the_url.includes("/contributions"))||(the_url.includes("/following"))||(the_url.includes("/requests"))||(the_url.includes("/profiles"))){
        else if ((the_url.indexOf("/contributions") != -1) || (the_url.indexOf("/following") != -1) || (the_url.indexOf("/requests") != -1) || (the_url.indexOf("/profiles") != -1)) {
            chat_tag = "prd_npr";
        } else {
            chat_tag = "prd_nav";
        }


        //chat  tag end

        //this was in Script JS
        zE('webWidget:on', 'userEvent', function(event) {
            
            //user property in if statement!!!!
            //alert(event.action);
            if ((event.action) == "Contact Form Shown") {
                var a = document.getElementById('webWidget');
                var frameBody = a.contentWindow.document.getElementsByTagName("body")[0];
                var frame_embed = frameBody.querySelector("#Embed");
                var form = frame_embed.querySelector("form");

                //hide name and email field 
                var email_label = form.querySelector('label[data-fieldid="email"]');
                var email_input = form.querySelector('input[name="email"]');

                var name_label = form.querySelector('label[data-fieldid="name"]');
                var name_input = form.querySelector('input[name="name"]');

                var subject_label = form.querySelector('label[data-fieldid="subject"]');
                var subject_input = form.querySelector('input[name="subject"]');

                var description_label = form.querySelector('label[data-fieldid="description"]');
                var description_input = form.querySelector('textarea[name="description"]');
                //  var description_hint= form.querySelector('div[data-garden-id="forms.text_hint"]');


                var request_locale_label = form.querySelector('label[data-fieldid="key:' + email_form_request_local_field + '"]');
                var request_locale_input = form.querySelector('div[name="key:' + email_form_request_local_field + '"]');


                if ((email_input != null) && (email_label != null)) {
                    email_input.style.display = "none";
                    email_label.style.display = "none";
                }

                if ((name_input != null) && (name_label != null)) {
                    name_label.style.display = "none";
                    name_input.style.display = "none";
                }
                // end of hiding

                if ((event.properties).id == email_form_ID_webwidget) {
                    if ((request_locale_input != null) && (request_locale_label != null)) {
                        request_locale_label.style.display = "none";
                        request_locale_input.style.display = "none";
                    }
                }
                if ((event.properties).id == talk_form_id) { // this is to hide the other feild on the phone us (talk) webwdiget
                    //dda 784
                    var attatchments_button = form.querySelector('button');
                    var attatchments_label = form.querySelector('label[for="dropzone-input"]');

                    if ((attatchments_button != null) && (attatchments_label != null)) {
                        attatchments_button.style.display = "none";
                        attatchments_label.style.display = "none";
                    }

                    var dropdown_button = form.querySelector('div[type="button"]');
                    if (dropdown_button != null) {
                        dropdown_button.style.display = "none";
                    }

                    //becasue above type="button" has changed in zendesk HTMl, so select it again with role="button"
                    var dropdown_button___ = form.querySelector('div[role="button"]');
                    if (dropdown_button___ != null) {
                        dropdown_button___.style.display = "none";
                    }

                    if ((description_input != null) && (description_label != null)) {
                        description_label.style.display = "none";
                        description_input.style.display = "none";
                    }

                    if ((subject_input != null) && (subject_label != null)) {
                        subject_label.style.display = "none";
                        subject_input.style.display = "none";
                    }

                    // becasue i couldn't use querry selector to find the submit button and footer on the page, so i covered it,
                    var cover_layer = document.createElement('div');
                    cover_layer.id = 'phoneLine_cover_layer';
                    cover_layer.setAttribute("style", "position:absolute; height:100px; width:100%; background-color:#fff;bottom:0;");
                    form.appendChild(cover_layer);
                    //dda 784
                }

                /*
                                if ((event.properties).id == strap_form_id) {
                                   
                                    // when releasing the strap form, check != null before hide anything!
                                    



                                    var serial = form.querySelector('input[name="key:' + serial_number_eur_field_id + '"]');



                                    //find button 
                                    serial.maxLength = 12;
                                    serial.setAttribute("placeholder", "AB1234C56789");
                                    serial.addEventListener("input", liveValidation);

                                    function liveValidation(e) {
                                        var submit_btn = form.querySelector('button[type="submit"]');
                                        submit_btn.disabled = true;

                                        var serial_number_input = (serial.value).toString();
                                        if ((serial_number_input.length) >= 2) {
                                            var first_digit = parseInt(serial_number_input.charAt(0));
                                            if (isNaN(first_digit)) {

                                                var seventh_digit = parseInt(serial_number_input.charAt(6));
                                                if ((isNaN(seventh_digit))) {
                                                    if ((serial_number_input.length) == 12) {
                                                        //checkNums(serial_number_input);
                                                        var valid_serial_input = 0;
                                                        checkNums(serial_number_input, submit_btn, valid_serial_input);

                                                    } else {
                                                        //not 12 yet
                                                        submit_btn.disabled = true;
                                                    } //end of 12 length
                                                } //end of 7th character is letter

                                            } //end of first character is letter
                                        } //end of cheking first 2 characters 
                                    } //end of serial number verify function
                                } //end of strap form serial number validation
                                */

            } // end of contact form shown
        }); //end of web widget strap form validation



        //pre fill chat user name, email and tag 
        zE('webWidget', 'prefill', {
            name: {
                value: HelpCenter.user.name,
                readOnly: true // optional
            },
            email: {
                value: HelpCenter.user.email,
                readOnly: true // optional
            },
        });
        zE('webWidget', 'chat:removeTags', ['prd_npr', 'prd_nav', 'prd_apps', 'prd_spts', 'prd_auto']);
        zE('webWidget', 'chat:addTags', [chat_tag]);



        //pre fill chat user name, email and tag 
        //this was in Script js
        clearInterval(waitForZen);
    },
    100);
//above for zendesk widget


/*2. widget and bongo combo set up*/

var bongoforthislocale = (document.getElementById("bongoforthislocale")).innerHTML; // turn bongo subfooter on and off by changing the DC 'bongoWidgetCombo'
var bongowidgetcombo = (document.getElementById("bongowidgetcombo")).innerHTML; // turn bongo widget on and off by changing the DC 'bongoWidgetCombo'
var WidgetText = (document.getElementById("open_widget")).innerHTML; // message that user click on the open ZD widget DC 'talk_to_zEWidget_from_widget'

function all_in_one_widget_open() {
    //function when the fake launcher is clicked
    Bots.openChat();
    //when user clicks on all in one launcher
    //find it
    //remove css and add zd_Hidden
    var allInOneLauncher = document.getElementById("all_in_one_widget");
    allInOneLauncher.classList.remove("allInOneWidgetButton");
    allInOneLauncher.classList.add("zd_Hidden");
    // allInOneContainer.classList.add("allInOneContainer");

    if (HelpCenter.user.role !== "anonymous") {
        //only show the 'get in touch' button if user is logged in
        setTimeout(function() {
            // show the button after 5 seconds (contact deflection)
            if (Bots.isChatOpened()) {
                var option_Widget = document.getElementById("option_Widget");
                option_Widget.classList.remove("zd_Hidden");
            }
        }, 5000);
    }
    ga_tracking("Zendesk Web Widget", "Bongo Opened", " ");
    ga_tracking("Zendesk Web Widget", "Deflection Widget Opened", " ");
    var ZendeskLauncher = document.getElementById("launcher");
    ZendeskLauncher.classList.add("zd_Hidden");
    // hide the ZD launger on click of fake one, so the widget doesn't do that weird pop up thing behind it
}



// this functions has been moved to bot_setting.js, in bot configuration calling bot close() function no need to "wait for bot"
// var waitForBots = setInterval(function() {
//     //Function for closing bongo
//     if (window.Bots === undefined) {
//         return;
//     }
//     Bots.on('widget:closed', function() {
//         var allInOneLauncher = document.getElementById("all_in_one_widget");
//         // make the fake launcher apear again
//         allInOneLauncher.classList.remove("zd_Hidden");
//         allInOneLauncher.classList.add("allInOneWidgetButton");
//         var option_Widget = document.getElementById("option_Widget");
//         option_Widget.classList.add("zd_Hidden");
//         // hide the 'get in touch' button again 
//         ga_tracking("Bongo", "clicked", "bongo closed");
//     });

//     clearInterval(waitForBots);
// }, 100);

function openWidgetfromBongo() {
    // function for clicking the 'get in touch' button
    Bots.closeChat();
    //close bongo
    zE('webWidget', 'updateSettings', {
        webWidget: {
            helpCenter: {
                suppress: true
            }
        }
    });
    // suppress the helpcenter, as they are already deflected by bongo
    zE('webWidget', 'open');
    //open webwidget
    var allInOneLauncher = document.getElementById("all_in_one_widget");
    var option_Widget = document.getElementById("option_Widget");
    allInOneLauncher.classList.remove("allInOneWidgetButton");
    allInOneLauncher.classList.add("zd_Hidden");
    option_Widget.classList.add("zd_Hidden");
    // hide the fake luncher and hide the get in touch button    
    ga_tracking("Zendesk Web Widget", "Contact Options Opened", " ");

}

function loadOneWidgetLauncher() {
    // function to load the fake widget - this is turned on and off by the DC 'bongoWidgetCombo'
    if (bongowidgetcombo == 1) {
        //for all locale with 1 in the DC, 
        //create a new launcher
        var granger = document.createElement('div');
        //give id: all_in_one_widget
        granger.id = 'all_in_one_widget';
        //add event listener click to open all in one widget
        granger.addEventListener("click", all_in_one_widget_open);
        var launcher_text_wrapper = document.createElement('div');
        launcher_text_wrapper.id = "launcher_text_wrapper";
        //button text chatLabel
        //create text for launcher, get text content fron DC chat label
        //wrapped with a div 
        var allInOneWidgetBtnText = document.createElement('label');
        allInOneWidgetBtnText.id = "allInOneWidgetBtnText";
        var textNode_for_allInOneWidgetBtnText = document.createTextNode(chatLabel);
        //text append content
        allInOneWidgetBtnText.appendChild(textNode_for_allInOneWidgetBtnText);
        //wrapper append text
        launcher_text_wrapper.appendChild(allInOneWidgetBtnText);
        //launcher append wraper 
        granger.appendChild(launcher_text_wrapper);
        //find document, add launcher and adding css
        var BODY = document.getElementsByTagName("BODY")[0];
        BODY.appendChild(granger);
        (document.getElementById("all_in_one_widget")).classList.add("allInOneWidgetButton");
        (document.getElementById("allInOneWidgetBtnText")).classList.add("allInOneWidgetBtnText");

        //option widget (get in touch button)
        var option_Widget = document.createElement('div');
        option_Widget.id = "option_Widget";
        // add id to the button for the css
        option_Widget.innerHTML = WidgetText;
        option_Widget.addEventListener("click", openWidgetfromBongo);
        BODY.appendChild(option_Widget);
        (document.getElementById("option_Widget")).classList.add("zd_Hidden");
        //closing up creating launcher
    }

}

$("#bongo_open").click(function() {

    if (bongoforthislocale == 1) {

        if (Bots.isChatOpened()) {

            $(".oda-chat-widget").addClass("shakeBongo");
        }
        //New SDK 
        Bots.openChat();
        //open bongo conversation
        ga_tracking("Bongo", "clicked", "bongo opened");
        //GA tracking
        var allInOneLauncher = document.getElementById("all_in_one_widget");
        //find launcher of all in one widget
        if (allInOneLauncher != null) {
            //if found it
            if (allInOneLauncher.classList.contains("allInOneWidgetButton")) {
                //if it has class to show it on page
                //remove the class
                allInOneLauncher.classList.remove("allInOneWidgetButton");
            }
            if (!(allInOneLauncher.classList.contains("zd_Hidden"))) {
                //if it not having a Hidden Class to hide it
                //hide it
                allInOneLauncher.classList.add("zd_Hidden");
            }
        }

        var allInOneContainer = document.getElementById("allInOneContainer_open");
        //find launcher of all in one widget window
        if (allInOneContainer != null) {
            //if found it
            if (allInOneContainer.classList.contains("allInOneContainer")) {
                //if it has class to show it on page
                //remove the class
                allInOneContainer.classList.remove("allInOneContainer");
            }
            if (!(allInOneContainer.classList.contains("zd_Hidden"))) {
                //if it not having a Hidden Class to hide it
                //hide it
                allInOneContainer.classList.add("zd_Hidden");
            }
        }

        zE('webWidget', 'close');
        //close the Zendesk widget

    } else {
        var bongo_alter = $("#bongo_alter").html();
        window.location.href = bongo_alter;


    }

});



loadOneWidgetLauncher();