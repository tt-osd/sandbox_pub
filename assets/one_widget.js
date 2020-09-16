var bongo_loaded = 0;
var chatLabel = document.getElementById("chatLabel");

function getLocale() {
    return window.location.href
        .split('/hc/')[1]
        .split('/')[0];
}


var mobile_bongo = false;


if ((navigator.userAgent.indexOf('Android') != -1) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('Windows Phone') != -1)) {
    mobile_bongo = true;

}




var waitForZen = setInterval(function() {
    if (window.$zopim === undefined || window.$zopim.livechat === undefined) {
        return;
    }
    zE('webWidget:on', 'open', function() {
        zE('webWidget:on', 'userEvent', function(event) {
            if (the_url.indexOf("en-") != -1) {
                if (event.action == "Web Widget Minimised") {
                    var allInOneLauncher = document.getElementById("all_in_one_widget");
                    allInOneLauncher.classList.remove("zd_Hidden");
                    allInOneLauncher.classList.add("allInOneWidgetButton");
                }
            }

        });
    })
    clearInterval(waitForZen);
}, 100);


function bongo_Mobile() {
    var close_bongo = document.createElement('div');
    close_bongo.id = 'close_bongo';
    close_bongo.className = "close_bongo";
    close_bongo.addEventListener("click", closeBongoOnMobile);

    var bongo_fullSize = document.createElement('div');
    bongo_fullSize.id = 'bongo_fullSize';
    bongo_fullSize.appendChild(close_bongo);
    var BODY = document.getElementsByTagName("BODY")[0];
    BODY.appendChild(bongo_fullSize);

    Bots.render(document.getElementById('bongo_fullSize'));
    var bongo = document.getElementById("web-messenger-container");
    bongo.classList.add("bongo_fullSize");
}


function minimize_bongo_window() {

    //the var minimize_from_widget, if the minimise action is triggered from widget, need to bring back on the new launcher
    var minimize_from_widget = false;
    //find bongo
    var bongo_to_be_closed = document.getElementById("web-messenger-container");
    if (bongo_to_be_closed != null) {
        //if found, add zd_Hidden Class and set GA tracking
        bongo_to_be_closed.classList.add("zd_Hidden");
        ga_tracking("Bongo", "clicked", "bongo closed");
    }

    var bongo_minimizer = document.getElementById("bongo_minimizer");
    var bongo_minimizer_icon = document.getElementById("bongo_minimizer_icon");

    if (bongo_minimizer != null) {
        bongo_minimizer.classList.add("zd_Hidden");
    }
    if (bongo_minimizer_icon != null) {
        bongo_minimizer_icon.classList.add("zd_Hidden");
    }

    var bongo_minimizer_on_widget = document.getElementById("bongo_minimizer_on_widget");
    var bongo_minimizer_icon_on_widget = document.getElementById("bongo_minimizer_icon_on_widget");

    //if this minimizer has widget style and not have a zd_Hidden class, 
    //means the closing action is happening on widget bongo, which means, bring back the launcher
    if ((bongo_minimizer_on_widget != null) && (bongo_minimizer_icon_on_widget != null)) {
        if ((bongo_minimizer_on_widget.classList.contains("bongo_minimizer_on_widget")) &&
            (bongo_minimizer_icon_on_widget.classList.contains("bongo_minimizer_icon_on_widget")) &&
            (!(bongo_minimizer_on_widget.classList.contains("zd_Hidden"))) &&
            (!(bongo_minimizer_icon_on_widget.classList.contains("zd_Hidden")))
        ) {
            minimize_from_widget = true;

        }

    }

    if (bongo_minimizer_on_widget != null) {
        bongo_minimizer_on_widget.classList.add("zd_Hidden");
    }
    if (bongo_minimizer_icon_on_widget != null) {
        bongo_minimizer_icon_on_widget.classList.add("zd_Hidden");
    }

    if (minimize_from_widget == true) {
        var allInOneLauncher = document.getElementById("all_in_one_widget");
        allInOneLauncher.classList.remove("zd_Hidden");
        allInOneLauncher.classList.add("allInOneWidgetButton");
    }



}



function all_in_one_widget_open() {
    //when click on all in one launcher
    //find it
    //remove css and add zd_Hidden
    var allInOneLauncher = document.getElementById("all_in_one_widget");
    allInOneLauncher.classList.remove("allInOneWidgetButton");
    allInOneLauncher.classList.add("zd_Hidden");
    // allInOneContainer.classList.add("allInOneContainer");


    var allInOneContainer = document.getElementById("allInOneContainer_open");
    allInOneContainer.classList.remove("zd_Hidden");
    allInOneContainer.classList.add("allInOneContainer");


    if (bongo_loaded == 1) {
        var bongo = document.getElementById("web-messenger-container");
        if (bongo.classList.contains("widget_bongo")) {
            bongo.classList.remove("widget_bongo");

        }

        if (bongo.classList.contains("zd_Bongo")) {
            bongo.classList.remove("zd_Bongo");
        }

        if (!(bongo.classList.contains("zd_Hidden"))) {
            bongo.classList.add("zd_Hidden");
        }



        var bongo_minimizer = document.getElementById("bongo_minimizer");
        var bongo_minimizer_icon = document.getElementById("bongo_minimizer_icon");

        if (bongo_minimizer != null) {
            bongo_minimizer.classList.add("zd_Hidden");
        }
        if (bongo_minimizer_icon != null) {
            bongo_minimizer_icon.classList.add("zd_Hidden");
        }
    }
}




function openBongo_fromWIdget() {
    if (bongo_loaded == 1) {

        if (mobile_bongo == true) {
            $("#bongo_open").click();

        } else {
            //when bongo is loaded, open chat by showing the chat window
            var bongo = document.getElementById("web-messenger-container");
            if (bongo.classList.contains("zd_Bongo")) {
                bongo.classList.remove("zd_Bongo");
            }
            if (bongo.classList.contains("zd_Hidden")) {
                bongo.classList.remove("zd_Hidden");
            }

            if (!(bongo.classList.contains("widget_bongo"))) {
                bongo.classList.add("widget_bongo");
            }



            var bongo_minimizer_on_widget = document.getElementById("bongo_minimizer_on_widget");
            var bongo_minimizer_icon_on_widget = document.getElementById("bongo_minimizer_icon_on_widget");

            if ((bongo_minimizer_on_widget != null) && (bongo_minimizer_icon_on_widget != null)) {
                bongo_minimizer_on_widget.classList.remove("zd_Hidden");
                bongo_minimizer_icon_on_widget.classList.remove("zd_Hidden");
            } else {
                var bongo_minimizer = document.createElement('div');

                var bongo_minimizer_icon = document.createElement('label');
                var textNode_for_bongo_minimizer_icon = document.createTextNode("_");
                bongo_minimizer_icon.appendChild(textNode_for_bongo_minimizer_icon);
                bongo_minimizer.appendChild(bongo_minimizer_icon);
                bongo_minimizer.id = "bongo_minimizer_on_widget";

                bongo_minimizer_icon.id = "bongo_minimizer_icon_on_widget";

                //   bongo_minimizer_icon.addEventListener("click", function); 
                (document.getElementById('bongo_place')).appendChild(bongo_minimizer);
                bongo_minimizer_icon.addEventListener("click", minimize_bongo_window);
                (document.getElementById("bongo_minimizer_on_widget")).classList.add("bongo_minimizer_on_widget");
                (document.getElementById("bongo_minimizer_icon_on_widget")).classList.add("bongo_minimizer_icon_on_widget");
            }
        }




    } else {


        if (mobile_bongo == true) {
            $("#bongo_open").click();

        } else {


            Bots.render(document.getElementById('bongo_place'));
            var bongo = document.getElementById("web-messenger-container");
            //add the css changes to make bongo fit in sub footer 
            bongo.classList.add("widget_bongo");
            bongo_loaded = 1;


            //give a minimize button for bongo
            var bongo_minimizer = document.createElement('div');

            var bongo_minimizer_icon = document.createElement('label');
            var textNode_for_bongo_minimizer_icon = document.createTextNode("_");
            bongo_minimizer_icon.appendChild(textNode_for_bongo_minimizer_icon);
            bongo_minimizer.appendChild(bongo_minimizer_icon);
            bongo_minimizer.id = "bongo_minimizer_on_widget";

            bongo_minimizer_icon.id = "bongo_minimizer_icon_on_widget";

            //   bongo_minimizer_icon.addEventListener("click", function); 
            (document.getElementById('bongo_place')).appendChild(bongo_minimizer);
            bongo_minimizer_icon.addEventListener("click", minimize_bongo_window);
            (document.getElementById("bongo_minimizer_on_widget")).classList.add("bongo_minimizer_on_widget");
            (document.getElementById("bongo_minimizer_icon_on_widget")).classList.add("bongo_minimizer_icon_on_widget");
            //give a minimize button for bongo

        }


    }

    var allInOneLauncher = document.getElementById("all_in_one_widget");
    allInOneLauncher.classList.remove("allInOneWidgetButton");
    allInOneLauncher.classList.add("zd_Hidden");

    var allInOneContainer = document.getElementById("allInOneContainer_open");
    allInOneContainer.classList.remove("allInOneContainer");
    allInOneContainer.classList.add("zd_Hidden");



    ga_tracking("Bongo", "clicked", "bongo opened");
}



function minimise_widget() {
    var allInOneContainer = document.getElementById("allInOneContainer_open");
    allInOneContainer.classList.remove("allInOneContainer");
    allInOneContainer.classList.add("zd_Hidden");

    var allInOneLauncher = document.getElementById("all_in_one_widget");
    allInOneLauncher.classList.remove("zd_Hidden");
    allInOneLauncher.classList.add("allInOneWidgetButton");
}


function openWidgetByTomTom() {

    zE('webWidget', 'open');
    var allInOneContainer = document.getElementById("allInOneContainer_open");
    allInOneContainer.classList.remove("allInOneContainer");
    allInOneContainer.classList.add("zd_Hidden");
}



function loadOneWidgetLauncher() {
    var bongo_and_widget = getLocale();
    if (bongo_and_widget.includes("en")) {

        //for all EN locale, 
        //create a new launcher
        var granger = document.createElement('div');
        //give id: all_in_one_widget
        granger.id = 'all_in_one_widget';
        //adding event listener click to open all in one widget
        granger.addEventListener("click", all_in_one_widget_open);


        var launcher_text_wrapper = document.createElement('div');
        launcher_text_wrapper.id = "launcher_text_wrapper";
        //button text chatLabel
        //create text for launcher, get text content fron DC chat label
        //wrapped with a div 
        var allInOneWidgetBtnText = document.createElement('label');
        allInOneWidgetBtnText.id = "allInOneWidgetBtnText";
        var textNode_for_allInOneWidgetBtnText = document.createTextNode(chatLabel.innerHTML);
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



        //after created all in one launcher
        //create the widget window

        // create opened widget windows contains bongo and zE widget two options
        var allInOneContainer_open = document.createElement('div');
        //give it id allInOneContainer_open
        allInOneContainer_open.id = "allInOneContainer_open";

        var container_open_header = document.createElement('div');
        container_open_header.id = "container_open_header";
        var container_open_header_text = document.createElement('label');
        var textNode_for_container_open_header_text = document.createTextNode(chatLabel.innerHTML);
        container_open_header_text.appendChild(textNode_for_container_open_header_text);
        container_open_header_text.id = "container_open_header_text";
        container_open_header.appendChild(container_open_header_text);


        var container_open_minimizer = document.createElement('div');
        var container_open_minimizer_icon = document.createElement('label');
        var textNode_for_container_open_minimizer_icon = document.createTextNode("_");
        container_open_minimizer_icon.appendChild(textNode_for_container_open_minimizer_icon);
        container_open_minimizer.appendChild(container_open_minimizer_icon);
        container_open_minimizer.id = "container_open_minimizer";
        container_open_minimizer_icon.id = "container_open_minimizer_icon";
        container_open_minimizer_icon.addEventListener("click", minimise_widget);

        // create wrapper to hold two options
        var support_Options = document.createElement('div');
        support_Options.id = "support_Options";

        //option bongo
        var option_bongo = document.createElement('div');
        option_bongo.id = "option_bongo";
        var subfooter__bongo_link_text__ = document.getElementById("subfooter__bongo_link_text");
        subfooter__bongo_link_text__.classList.remove("zd_Hidden");
        option_bongo.appendChild(subfooter__bongo_link_text__);
        option_bongo.addEventListener("click", openBongo_fromWIdget);
        //option zE widget
        var widget_option = document.createElement('div');
        widget_option.id = "widget_option";
        var open_widget = document.getElementById("open_widget");
        open_widget.classList.remove("zd_Hidden");
        widget_option.appendChild(open_widget);
        //option zE widget add event listener to open the zE widget
        widget_option.addEventListener("click", openWidgetByTomTom);


        support_Options.appendChild(option_bongo);
        support_Options.appendChild(widget_option);
        allInOneContainer_open.appendChild(container_open_minimizer);
        allInOneContainer_open.appendChild(container_open_header);
        allInOneContainer_open.appendChild(support_Options);
        var BODY = document.getElementsByTagName("BODY")[0];
        BODY.appendChild(allInOneContainer_open);
        (document.getElementById("allInOneContainer_open")).classList.add("allInOneContainer");
        (document.getElementById("allInOneContainer_open")).classList.add("zd_Hidden");
        (document.getElementById("option_bongo")).classList.add("customised_support_options");
        (document.getElementById("widget_option")).classList.add("customised_support_options");
        (document.getElementById("container_open_header")).classList.add("container_open_header");
        (document.getElementById("container_open_header_text")).classList.add("container_open_header_text");
        (document.getElementById("container_open_minimizer")).classList.add("container_open_minimizer");
        (document.getElementById("container_open_minimizer_icon")).classList.add("container_open_minimizer_icon");
        (document.getElementById("support_Options")).classList.add("support_Options");








        //end og creating widget window
        //closing up creating launcher
    }

}



//bongo mobile


function closeBongoOnMobile() {
    document.getElementById('close_bongo').classList.add("zd_Hidden");
    var bongo_to_be_closed = document.getElementById("web-messenger-container");
    if (bongo_to_be_closed != null) {
        //if found, add zd_Hidden Class and set GA tracking
        bongo_to_be_closed.classList.add("zd_Hidden");
        ga_tracking("Bongo", "clicked", "bongo closed");
    }
    var allInOneWidgetButton = document.getElementById('all_in_one_widget');
    if (allInOneWidgetButton != null) {
        if (allInOneWidgetButton.classList.contains("zd_Hidden")) {
            allInOneWidgetButton.classList.remove("zd_Hidden");
        }
        if (!(allInOneWidgetButton.classList.contains("allInOneWidgetButton"))) {
            allInOneWidgetButton.classList.add("allInOneWidgetButton");
        }

    }


}

//bongo mobile

$("#bongo_open").click(function() {
    var lo = getLocale();
    if (lo.includes("en")) { // bongo only works on English locale
        // to open a conversation with bongo, click talk to bongo from subfooter
        if (bongo_loaded == 1) {
            //when bongo is loaded, open chat by showing the chat window
            var bongo = document.getElementById("web-messenger-container");
            if (bongo.classList.contains("zd_Hidden")) {
                bongo.classList.remove("zd_Hidden");
            }
            if (bongo.classList.contains("widget_bongo")) {
                bongo.classList.remove("widget_bongo");

            }
            if (!(bongo.classList.contains("zd_Bongo"))) {
                bongo.classList.add("zd_Bongo");
            }

            //if bongo being opened from sub footer, after close the bongo at corner 
            //aslo show the widget button
            var allInOneLauncher = document.getElementById("all_in_one_widget");
            allInOneLauncher.classList.remove("zd_Hidden");
            allInOneLauncher.classList.add("allInOneWidgetButton");



            var bongo_minimizer = document.getElementById("bongo_minimizer");
            var bongo_minimizer_icon = document.getElementById("bongo_minimizer_icon");

            if (bongo_minimizer != null) {
                bongo_minimizer.classList.remove("zd_Hidden");
            }
            if (bongo_minimizer_icon != null) {
                bongo_minimizer_icon.classList.remove("zd_Hidden");
            }


            var bongo_minimizer_on_widget = document.getElementById("bongo_minimizer_on_widget");
            var bongo_minimizer_icon_on_widget = document.getElementById("bongo_minimizer_icon_on_widget");

            if (bongo_minimizer_on_widget != null) {
                bongo_minimizer_on_widget.classList.add("zd_Hidden");
            }
            if (bongo_minimizer_icon_on_widget != null) {
                bongo_minimizer_icon_on_widget.classList.add("zd_Hidden");
            }

            if (mobile_bongo == true) {
                if ((bongo.classList.contains("zd_Bongo"))) {
                    bongo.classList.remove("zd_Bongo");
                }
                document.getElementById('close_bongo').classList.remove("zd_Hidden");
            }


        } else {
            if (mobile_bongo == true) {
                var close_bongo = document.createElement('div');
                close_bongo.id = 'close_bongo';
                close_bongo.className = "close_bongo";
                close_bongo.addEventListener("click", closeBongoOnMobile);

                var bongo_fullSize = document.createElement('div');
                bongo_fullSize.id = 'bongo_fullSize';
                bongo_fullSize.appendChild(close_bongo);
                var BODY = document.getElementsByTagName("BODY")[0];
                BODY.appendChild(bongo_fullSize);

                Bots.render(document.getElementById('bongo_fullSize'));
                var bongo = document.getElementById("web-messenger-container");
                bongo.classList.add("bongo_fullSize");


            } else {
                //when bongo is not loaded, open chat by render the bot
                Bots.render(document.getElementById('bongo_place'));
                var bongo = document.getElementById("web-messenger-container");
                //add the css changes to make bongo fit in sub footer 
                bongo.classList.add("zd_Bongo");




                //give a minimize button for bongo, on init
                var bongo_minimizer = document.createElement('div');
                bongo_minimizer.id = "bongo_minimizer";
                var bongo_minimizer_icon = document.createElement('label');
                var textNode_for_bongo_minimizer_icon = document.createTextNode("_");
                bongo_minimizer_icon.appendChild(textNode_for_bongo_minimizer_icon);
                bongo_minimizer.appendChild(bongo_minimizer_icon);
                //  bongo_minimizer.setAttribute("style","position: absolute;right: 0px;bottom:476.5px;z-index: 999999;cursor: pointer;");
                bongo_minimizer_icon.id = "bongo_minimizer_icon";
                //bongo_minimizer_icon.addEventListener("click", function); 
                (document.getElementById('bongo_place')).appendChild(bongo_minimizer);
                //give a minimize button for bongo 
                (document.getElementById('bongo_minimizer')).classList.add("bongo_minimizer_container");
                (document.getElementById('bongo_minimizer_icon')).classList.add("bongo_minimizer_icon");

                bongo_minimizer_icon.addEventListener("click", minimize_bongo_window);
            }
            bongo_loaded = 1;
        }

        ga_tracking("Bongo", "clicked", "bongo opened");

        zE('webWidget', 'close');


    } else {
        var bongo_alter = $("#bongo_alter").html();
        window.location.href = bongo_alter;
    }

});



loadOneWidgetLauncher();