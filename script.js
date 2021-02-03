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
/******************************************* Function for GA tracking ************************************************/ 
      function ga_tracking(event_category, event_action, event_label) {
        utag.link({
            'event_category': event_category,
            'event_action': event_action,
            'event_label': event_label
        });
    };
/******************************************* End Function for GA tracking ************************************************/  
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
    /******************************************* GA tracking for subfooter ************************************************/
  var subFooter = document.getElementById("sub_footer");  // Get the Social footer
  if (subFooter) { // If you have the social Footer then do this
            var subFooterLink = document.getElementsByClassName('sub_footer_item'); // grab each of the buttons on the social footer
            var subFooter_category = "subfooter"; // create var for the GA event category
            var subFooter_action = "click";// create var for the GA event action
            var subFooter_event = ""; // create var for the GA event label
             $(subFooterLink).click(function() { // Click function if you click on one of the social footers
                  var subfooterID = this.id; 
                    if (subfooterID  === 'subfooter_user_manual') {
                        subFooter_event = 'user manuals';
                    } else if (subfooterID  === 'bongo_open') { 
                        subFooter_event = 'bongo';
                    } else if (subfooterID  === 'subfooter_video') { 
                        subFooter_event = 'support videos'; 
                    } else if (subfooterID  === 'subfooter_community') {
                        subFooter_event = 'community'; 
                    } else {
                        subFooter_event = 'other'; 
                    }
                 ga_tracking(subFooter_category, subFooter_action, subFooter_event);                  
             });                      
      }
/******************************************* End of GA tracking for subfooter ************************************************/
    /******************************************* End of Subfooter ************************************************/
/******************************************* Social footer ************************************************/
  var socialFooter = document.getElementById("footer-social");  // Get the Social footer
     if (socialFooter) { // If you have the social Footer then do this
       				var socialFooterLink = document.getElementsByClassName('footer-social-items__item'); // grab each of the buttons on the social footer
              var socialFooter_category = "Footer"; // create var for the GA event category
              var socialFooter_action = "click";// create var for the GA event action
              var socialFooter_event = ""; // create var for the GA event label
                $(socialFooterLink).click(function() { // Click function if you click on one of the social footers
                   	socialFooter_event = this.getAttribute('title'); 
                    ga_tracking(socialFooter_category, socialFooter_action, socialFooter_event);                  
                });                      
     	}
/******************************************* End of Social footer ************************************************/
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
        var vanilla_sso_server = -1;
        var vanilla_redirect_url = -1;

        // declare varliables inside map json
        if (the_url.indexOf("sandbox") != -1) {
            vanilla_redirect_url = data.vanilla_redirect_url.sandbox;
			vanilla_sso_server = data.vanilla_sso_server.sandbox;
        } else {
            vanilla_redirect_url = data.vanilla_redirect_url.prod;
            vanilla_sso_server = data.vanilla_sso_server.prod;
        } //end of get form/fields ID
      
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
        var cookie_event_category = "consent_bar";
      	var cookie_event_action = "click";
      	var cookie_event_label = "";

  if ((this.id) == 'cookie_bar_buttons_accept') {
    				ga_tracking(cookie_event_category, cookie_event_action, cookie_event_label);
            tt_setting_bol_value = "true";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);
          	cookie_event_label = "Allow";          	
          	$(".cookie_bar").hide();

        } else if ((this.id) == 'cookie_bar_buttons_decline') {

            ga_tracking(cookie_event_category, cookie_event_action, cookie_event_label);
            post_decline_tt_settings();
            tt_setting_bol_value = "false";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);
          	cookie_event_label = "Decline";
           	$(".cookie_bar").hide();
        } else {
            $(".cookie_bar").hide();
        }
      
    });
    /***************************  End Cookie Bar ***************************/

        /***************************  Exit Survey ***************************/

    // initialize variables
    var survey_trigger = 5; //5px in the top of document
    var altitude = 0;
    //define default variable for google analytics event label
    var ga_tracking_label = " ";
    //define default variable for google analytics event action
    var ga_tracking_action = " ";
    //define default variable for google analytics event action
    var ga_tracking_category = " ";
   // var active_user = false;
  

      // Exit Survey condition. We want our exit survey to only b answered by customers who have already have some sorted of service. Effectively excluding the 'bounced' customers. 
  		// Below the is a function called 'active user which will give you a cookie called 'activeUser', once you have this cookie you are then enigible for the exit survey. This will be removed at the end of the session
  		// you will be an active user if you: Click on an anchor link or button, read an article or use Bongo and/or the web widget
      function activeUser() { 																				// function to set users cookie as an active User
          set_cookie("active_user", "true", 0); 											// Set cookie to active_user
      }  
      var a_clicks = document.getElementsByTagName('a'); 								// Get the anhor links on page
      for (var i = 0; i < a_clicks.length; i++) { 											// for every anchor link on page
          a_clicks[i].addEventListener("click", function() { 						// add a click event
              if (read_cookie("active_user") === "") {  								// if the user doesn't already have the cookie
        					activeUser(); 																				// call function
          		}       
      });
      }
      var button_clicks = document.getElementsByTagName('button');			// get the buttons on page
      for (var i = 0; i < button_clicks.length; i++) {									// for every button on the page
          button_clicks[i].addEventListener("click", function() {				// add a click event
              if (read_cookie("active_user") === "") {  								// if the user doesn't already have the cookie
        					activeUser(); 																				// call the function
          		}       
      });
      }

      var checkWidgetExists = setInterval(function() {											// as the widget is loaded in seperate js, first add a setInterval to wait until widget exists on page
       if ($('#all_in_one_widget').length) {																// if the widget exists
        var widget_clicks = document.getElementById('all_in_one_widget');		// get the web widget
         widget_clicks.addEventListener("click", function() {								// add a click event to the widget
          if (read_cookie("active_user") === "") {  												// if the user doesn't already have the cookie
            activeUser(); 																									// call the function
          }
         });
          clearInterval(checkWidgetExists);																	// Clear interval if widget doesn't exist yet
       }	
    	}, 100); 																															// check every 100ms
  
  		var bongo_clicks = document.getElementById('bongo_open');							// Bongo in subfooter isn't a button or anchor, so have to find him seperately
          bongo_clicks.addEventListener("click", function() {								// add click event 
              if (read_cookie("active_user") === "") {  										// if the user doesn't already have the cookie 
        					activeUser(); 																						// call the function
          		}       
      });  
      if (the_url.indexOf("/articles/") != -1) { 														// If the page is an article, don't want to call this on every page for load time
      document.onscroll = function () { 																		// on scroll of the page
          if ((read_cookie("active_user") === "") && (read_cookie("faq_engage") === "FAQ_reading")) { // if the user doesn't already have the cookie AND has the cookie for reading article
        			activeUser(); 																								//call the function
          } 	
      };
      }
  
    //initial exit survey 
    var TimeOutId = setTimeout(function() {																	// wait until user has been on site for 20 seconds
            $("body").on('mousemove', function(event) {											// read if user is moving mouse
                altitude = event.clientY;																		// check the height of mouse comapred to the top of the screen
                if (altitude <= survey_trigger) {														// if they are in the top 5px
                  if (read_cookie("active_user") === "true") {							// if the user is an active user
                    if (read_cookie("exit_survey") === "") {								// if they haven't already got an exit survey cookie
                        if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) { // if the user has accepted cookies
                            $('#survey_modal').removeClass("zd_Hidden");		// show the survey
                        }
                    }
                  }
                }
            });
        },
        20000);

    //mobile version
    var h = window.screen.height;
    var indexx = h * 0.70;

    function survey_on_mobile() { // function to trigger exit survey
        if (document.body.scrollTop > indexx || document.documentElement.scrollTop > indexx) { 
          if (read_cookie("active_user") === "true") { 							// if user is an active user
            if (read_cookie("exit_survey") === "") {								// if user hasn't already got an exit survey cookie
                if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) { // if user has accepted all cookies
                    $('#survey_modal').removeClass("zd_Hidden");		// show the exit survey
                }
            }
          }
        }
    };

    window.ontouchmove = function() { // on mobile check for touch move
        survey_on_mobile(); 					// trigger above function
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
    $("#newchkbox").click(function() { 
         document.getElementById("agree").click();
    });
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

       // $('#greetings').text($('#es_thx').text());
       // $(".option_container,.check_box_area").hide();
        $('#survey_modal').addClass("zd_Hidden");

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
           var customersearch =  document.getElementById('customer_query');
        results_event_category = "Search Results";
        results_event_action = "No Results found";
        results_event_label = customersearch.innerHTML;
        var waitForUtag = setInterval(function() {
            ga_tracking(results_event_category, results_event_action, results_event_label);
            clearInterval(waitForUtag);
        }, 1000);
    }
    /****************** End 'No results found' tracking *******************/ //Amy DDA-512

  /******************* Search bar placeholder ****************/ //Amy DDA-578
    var searchbar_placeholder = (document.getElementById("searchbar_placeholder").textContent);
    var searchbar_input = (document.getElementById("searchbar_input").textContent);
    if (searchbar_input != null) {
        document.getElementById("query").placeholder = searchbar_input;
    }
 $('<svg class="search_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.75 10.33l3.96 3.96a1 1 0 01-1.42 1.42l-3.96-3.96a6.5 6.5 0 111.41-1.41zM6.5 11a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill-rule="evenodd"></path></svg>').prependTo('.header_search form');
    $('<svg class="search_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.75 10.33l3.96 3.96a1 1 0 01-1.42 1.42l-3.96-3.96a6.5 6.5 0 111.41-1.41zM6.5 11a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill-rule="evenodd"></path></svg>').prependTo('.homepage_search_header form');
  $("<div class='title'>"+searchbar_placeholder+"</div>").prependTo('.homepage_search_header form');
$("<div class='title'>"+searchbar_placeholder+"</div>").prependTo('.header_search form');
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
  var announcement_article = document.getElementsByClassName("mySlides");
      /******************************** GA tracking for Announcment Article ********************************/
		var announcement_article_link = "";  

     if (announcement_article) { //if the announcement article exists     
              var announcement_article_category = "Announcement"; 
              var announcement_article_action = "From: " + location.pathname;    				
              var announcement_article_event = "";
                $('.mySlides:visible').click(function() { //This click function clicking on the announcement (tracking)   
                  announcement_article_link = this.getElementsByTagName("a")[0];
                  announcement_article_link = announcement_article_link.pathname;
                  announcement_article_event = "To: " + announcement_article_link;
                    ga_tracking(announcement_article_category, announcement_article_action, announcement_article_event);
                });                      
     }
        /******************************** End GA tracking for Announcment Article ********************************/
    /******************************** End of Promoted Articles ********************************/

    /********************* Locale Footer Scroll ******************************/
    $(".footer_btn").click(function() {
        window.scrollTo(0, document.body.scrollHeight);
    });

    /****************************** End of Locale Footer Scroll ******************************/ // Amy
/****************************** GA Tracking for when you change country from the footer ******************************/
            var locale_change_category = "Locale Change"; 
            var locale_change_action = "click";
            $('.locale_change').click(function() {
                  var locale_change_id = this.id;
                  ga_tracking(locale_change_category, locale_change_action, locale_change_id);
            });

/****************************** Ens GA Tracking for when you change country from the footer ******************************/ // Amy
    /********************************** Updates Banner ********************************/ //Amy
    if (the_url.indexOf("/articles/") == -1) {
        var update_banner = document.getElementById('update-banner');
        update_banner.classList.remove('zd_Hidden');
      	if (update_banner) { //Ga tracking if you click on the updates banner
       				var updateBannerLink = document.getElementsByClassName('update-link');
              var updateBanner_category = "UpdatingBanner"; 
              var updateBanner_action = "click";
              var updateBanner_event = "";
                $(updateBannerLink).click(function() {
                   updateBanner_event = this.id;
                  	ga_tracking(updateBanner_category, updateBanner_action, updateBanner_event);
                });                      
     }
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
            var retailPopUp_link = document.getElementsByClassName('retail_link');
            var retailPopUp_category = "Retail Portal Popup"; 
            var retailPopUp_action = "clicked";
            var retailPopUp_event = "";
            $(retailPopUp_link).click(function() {
									var getRetailId = this.id;
                   if (getRetailId === "retail_popup_button") {
                     retailPopUp_event = "Retail Portal"
                   } else {
                    retailPopUp_event = "Continue Consumer"
                   }
                    ga_tracking(retailPopUp_category, retailPopUp_action, retailPopUp_event); // Ga tracking for the retail pop up
            });
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
            setTimeout(function() { //set a 1 second timer so they see the lil CSS animation before hiding it
                $(articlevotebox).addClass("zd_Hidden"); //hide the box
            }, 1000);
        }); // close the click function .article-vote

        var article_event_category = "FAQs"; // make the event category for Article Satisfaction
        var article_event_action = "clicked"; // make the event action for Article Satisfaction
        $(articleupvote).click(function() { // click function if customer votes 'yes'   
            ga_tracking(article_event_category, article_event_action, "Satisfied"); //send GA tracking event
            $(articleupbutton).addClass('active'); // add the active class so users know they have clicked
            $(articledownbutton).removeClass('active'); // remove the active class from the other button if they have clicked that previously
        }); // end click function if customer votes 'yes'  

        $(articledownvote).click(function() { // click function if customer votes 'no'   
            ga_tracking(article_event_category, article_event_action, "Unsatisfied"); //send GA tracking event
            $(articledownbutton).addClass('active'); // add the active class so users know they have clicked
            $(articleupbutton).removeClass('active'); // remove the active class from the other button if they have clicked that previously
        }); // end click function if customer votes 'no'  

        $(articleupbutton).click(function() { //this function is purley for users who click on the radio button instead of the link, it trigers the click functions above
            articleupvote.click();
        });
        $(articledownbutton).click(function() { //this function is purley for users who click on the radio button instead of the link, it trigers the click functions above
            articledownvote.click();
        });

        if ($(articleupvote).attr("aria-selected") === "true") { // when the page loads, if they have voted in the past we will make the button active so they know their previous vote
            $(articleupbutton).addClass('active'); // adding active to the yes button if their vote was yes
        } else if ($(articledownvote).attr("aria-selected") === "true") {
            $(articledownbutton).addClass('active'); // adding active to the yes button if their vote was no
        }
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
                var scroll_category = 'faq_engage'; 
                var scroll_action = 'scroll';

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
                      // utag.link({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ reading' });
                       ga_tracking(scroll_category, scroll_action, 'FAQ reading');
                       set_cookie(scroll_category, "FAQ_reading", 0);

                    }

                    scroller = true;

                    // If user has hit the bottom of the content send an event
                    if (bottom >= heightNoFooter && !didComplete) {
                        currentTime = new Date();
                        end = currentTime.getTime();
                        totalTime = Math.round((end - scrollStart) / 1000);
                        ga_tracking(scroll_category, scroll_action, 'FAQ ended');
                       // utag.link({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ ended' });                
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
    }; //end IF the page is an article 
    /***************************** End Article Satisfaction - Amy *****************************/
});
/************************* End of DOM js file function - put everything above this line ***********************/
/*************************  Only insert after this if you need document to be ready ***********************/
$(document).ready(function() {
    var on__this_url = window.location.href; // Var in this function for the current URL
/*********************************** GA tracking function  ******************************/ 
        function ga_tracking_send(event_category, event_action, event_label) {
        utag.link({
            'event_category': event_category,
            'event_action': event_action,
            'event_label': event_label
        });
    };
  /*********************************** End GA tracking function  ******************************/ 
    /*********************************** Articles ******************************/

    if (on__this_url.indexOf("/articles/") != -1) {

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
        var getStartedTemplate = document.getElementById('Get_started'); // Check if on Get Started page
        if (getStartedTemplate) { // If on GS page do this
        $('.gs-article-header-block').click(function() { // If you click on the arrow, you scroll down
              $('body,html').animate({
                  scrollTop: 850
              }, 500);
          });  
          var getStartedIntro = document.getElementById('tt-get-started-intro'); // Check if CCWEB have inserted a intro with id tt-get-started-intro
          if (getStartedIntro) { // if they have
          $(getStartedIntro).appendTo('#gs-article-intro'); // put the intro in the header
              var getStartedTitle = document.getElementsByClassName("gs-article-title")[0];
              getStartedTitle.classList.add("gs-article-titles");    // add this class to make sure the width doesn't go over the edge  

          }
        }
        //
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
  $('.user-info > [role="button"]').attr('aria-label', 'User Profile');
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