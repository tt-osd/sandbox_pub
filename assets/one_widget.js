var chatLabel = document.getElementById("chatLabel"); // message on launcher of widget by changing the DC 'bongoforthislocale'
var bongoforthislocale = (document.getElementById("bongoforthislocale")).innerHTML; // turn bongo subfooter on and off by changing the DC 'bongoWidgetCombo'
var bongowidgetcombo = (document.getElementById("bongowidgetcombo")).innerHTML; // turn bongo widget on and off by changing the DC 'bongoWidgetCombo'
var WidgetText = (document.getElementById("open_widget")).innerHTML; // message that user click on the open ZD widget DC 'talk_to_zEWidget_from_widget'



var waitForZen = setInterval(function() {
    if (window.$zopim === undefined || window.$zopim.livechat === undefined) {
        return;
    }
    zE('webWidget:on', 'open', function() {
        zE('webWidget:on', 'userEvent', function(event) {
            if (bongowidgetcombo == 1) {
                // turn bongo widget on and off by changing the DC 'bongoWidgetCombo'
                if (event.action == "Web Widget Minimised") {
                    if (Bots.isChatOpened()) {
                    } else { 
                        //when minimise the Zendesk widget, if bongo conversation is not opened, then the launcher should shows up
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
    setTimeout(function(){     
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
var waitForBots = setInterval(function() {
    //Function for closing bongo
    if (window.Bots === undefined ) {
        return;        
    }
    Bots.on('widget:closed', function() {
    var allInOneLauncher = document.getElementById("all_in_one_widget");
    // make the fake launcher apear again
    allInOneLauncher.classList.remove("zd_Hidden");
    allInOneLauncher.classList.add("allInOneWidgetButton");    
    var option_Widget = document.getElementById("option_Widget");
    option_Widget.classList.add("zd_Hidden");    
    // hide the 'get in touch' button again 
    ga_tracking("Bongo", "clicked", "bongo closed");
    });

clearInterval(waitForBots);
}, 100);

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