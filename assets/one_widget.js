var chatLabel = document.getElementById("chatLabel");
var bongoforthislocale = (document.getElementById("bongoforthislocale")).innerHTML;
var bongowidgetcombo = (document.getElementById("bongowidgetcombo")).innerHTML;


var waitForZen = setInterval(function() {
    if (window.$zopim === undefined || window.$zopim.livechat === undefined) {
        return;
    }
    zE('webWidget:on', 'open', function() {
        zE('webWidget:on', 'userEvent', function(event) {
            if (the_url.indexOf("en-") != -1) {
                if (event.action == "Web Widget Minimised") {
                    if (Bots.isChatOpened()) {

                    } else { //when minimise the Zendesk widget, if bongo conversation is not opening, then the launcher should shows up
                        var allInOneLauncher = document.getElementById("all_in_one_widget");
                        allInOneLauncher.classList.remove("zd_Hidden");
                        allInOneLauncher.classList.add("allInOneWidgetButton");
                    }

                }
            }

        });
    })
    clearInterval(waitForZen);
}, 100);


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
}




function openBongo_fromWIdget() {

    Bots.openChat();

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

    //ga_tracking("Bongo", "clicked", "bongo opened");
    ga_tracking("Zendesk Web Widget", "bongo opened", " ");


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

    ga_tracking("Zendesk Web Widget", "widget opened", " ");
}



function loadOneWidgetLauncher() {

    if (bongowidgetcombo == 1) {

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
        //end of creating widget window
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