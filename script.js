document.addEventListener('DOMContentLoaded', function() {

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
});