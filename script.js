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

                          var burgerMenu = document.querySelector('.header .menu-button');
                          var userMenu = document.querySelector('#user-nav');

                          burgerMenu.addEventListener('click', function(e) {
                              e.stopPropagation();
                              toggleNavigation(this, userMenu);
                          });


                          userMenu.addEventListener('keyup', function(e) {
                              if (e.keyCode === 27) { // Escape key
                                  e.stopPropagation();
                                  closeNavigation(burgerMenu, this);
                              }
                          });

                          if (userMenu.children.length === 0) {
                              burgerMenu.style.display = 'none';
                          }

                          // Toggles expanded aria to collapsible elements
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
 
}); // end of js file function - put everything above this line

$(document).ready(function() {  // only insert after this if you need document to be ready
  
  
/***** FORMS *****/
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
var SubjectLine = document.getElementById("request_subject");
var DescriptionBox = document.getElementById("request_description");
var AttachmentsFileDrop = document.getElementById("upload-dropzone");
var title = document.getElementsByTagName("h1")[0];
var GDPROption= document.getElementsByClassName("request_custom_fields_360007572579");
  
if(window.location.href.indexOf("form_id=360000569919") > -1) {
        title.innerHTML = "GDPR REQUEST FORM" ;
  			  $(".form-field").addClass("zd_Hidden");
					$(".request_custom_fields_360007572579").removeClass("zd_Hidden");
    			SubjectLine.value = SubjectLine.value + "GDPR FORM 360000569919"; 			
        	DescriptionBox.value = DescriptionBox.value + "This is a GDPR REQUEST"; 			
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
  			$("<div class='ct-button'><div class='button'>rth</div></div>").appendTo(".ct-content-inner-block");

  
    $('<button id="option-1" class="ct-options" data="option-1-content"><span class="radiobtn"></span>Android</button>'+
      '<button class="ct-options" data="option-2-content"><span class="radiobtn"></span>iPhone</button>'+
      '<button class="ct-options" data="option-3-content"><span class="radiobtn"></span>Windows</button>').appendTo('.ct-options-list');
  

  
  
 
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
  
$('<div class="ts-article-video"></div>').prependTo(".ts-article-extra");  
$('iframe[src*="www.youtube"]').prependTo(".ts-article-video");
$('.ts-article-video-header').prependTo(".ts-article-video");
$('<div class="ts-article-extra-links"></div>').appendTo('.ts-article-video');
$('.article-links').appendTo('.ts-article-extra-links'); 
/***** End of Troubleshooting Template *****/ //Amy Ogborn    
  
/*****  How To Template *****/ 
  
$('.ht-header-content').appendTo(".ht-article-header");  
$(".ht-article-body h2").addClass("ht-contents-header");
$(".ht-article-body").find("h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-first-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-first-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-second-block' class='ht-block'></div>"); 
$(".ht-article-body").find("#ht-second-block ~ h2:first").nextUntil(".ht-contents-header").addBack().wrapAll("<div id='ht-third-block' class='ht-block'></div>"); 
$('.ht-article-body ol li').wrapInner("<div class='ht-list-text'></div>");
$('.ht-article-body ul li').wrapInner("<div class='ht-list-text'></div>");
$('.ht-article-body img').each(function(){
  $(this).insertAfter($(this).parent());
}); 
/***** End of  How To Template *****/ //Amy Ogborn  

}); // end of document ready function