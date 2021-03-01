const initSdk = (name) => {



    /*Attention*/
    // bot id is not in use anymore
    //open bongo conversation Bots.openChat();
    //Bots.on('widget:closed', function() {   console.log('Widget is closed!');});
    // in i18n function, en is deafult, if on a none-en locale and has no configuration, it will use en confogure as default
    /*Attention*/

    var bongo_init_headertext = document.getElementById("bongo_init_headertext").innerHTML;
    var bongo_init_inputplaceholder = document.getElementById("bongo_init_inputplaceholder").innerHTML;
    var bongo_channelid = document.getElementById("bongo_channelid").innerHTML;
    var bongo_uri = document.getElementById("bongo_uri").innerHTML;
    var bongo_chat_icon = document.getElementById("bongo_chat_icon").innerHTML;
    var bongo_locale = $('html').attr('lang').toLowerCase();
    // console.log(bongo_locale);
    var speak_to_bongo = document.getElementById("speak_to_bongo").innerHTML;
    var enable_speech = false;
    if (speak_to_bongo == "1") {
        enable_speech = true;
    }
    var bongo_update_channelid=document.getElementById("update_channel").innerHTML;
    //this is a "key word" such as article ID, to switch to update channel ID
    var update_channel_id_useage_keyword=document.getElementById("update_keyword").innerHTML;


    if (!name) {
        name = 'Bots'; // Set default reference name to 'Bots'
    }
    var user_init_message = 0;
    var bot_init_message = 0;
    let Bots;

    setTimeout(() => {
        /**
         * SDK configuration settings
         */
        let chatWidgetSettings = {
            locale: bongo_locale, // set language for bot user profile
            URI: bongo_uri, // ODA URI, only the hostname part should be passed, without the https://
          //  channelId: bongo_channelid, // Channel ID, available in channel settings in ODA UI
           initUserHiddenMessage: 'Hello',
            initMessageOptions: {
                sendAt: 'expand'
            },
            enableAutocomplete: true, // Enables autocomplete suggestions on user input
            enableClearMessage: false, // Enables display of button to clear conversation
            enableSpeech: enable_speech, // Enables voice recognition
            enableTimestamp: false, // Show timestamp with each message
            enableAttachment: false, // Allow attachment upload
            font: '16px "noway", Noway Regular, Helvetica, Arial, sans-serif !important',
            speechLocale: WebSDK.SPEECH_LOCALE.EN_US, // Sets locale used to speak to the skill, the SDK supports EN_US, FR_FR, and ES_ES locales for speech
            showConnectionStatus: true, // Displays current connection status on the header
            messagePadding: '10px', // Padding inside message bubbles
            disablePastActions: 'none', // Field to disable button clicks on messages that user has interacted with. Allowed values all, none, and postback
            botButtonIcon: '',
            botIcon: bongo_chat_icon,
            logoIcon: '', // these things can be used for putting bongo images, etc 
            typingIndicatorTimeout: 60,
            colors: {
                branding: '#df1b12',
                typingIndicator: '#8DC3EB',

            },
            i18n: { // Provide translations for the strings used in the widget
                en: { // en locale, can be configured for any locale
                    chatTitle: bongo_init_headertext, // Set title at chat header
                    //chatSubtitle: bongo_subheader, // Set subtitle in chat header
                    inputPlaceholder: bongo_init_inputplaceholder //Placeholder text that appears in user input field in keyboard mode
                } // for FR locale, if there no specific FR, it will fall into en as default
            },
            initUserProfile: {
                profile: {
                    languageTag: bongo_locale //multilingual - set the language from locale
                }
            }
        };

        // Initialize SDK
        Bots = new WebSDK(chatWidgetSettings);

        // in this staement, if the url contains the key word which identify a page needs to use update channel ID, 
        //then over write the default channel ID
        if(the_url.indexOf(update_channel_id_useage_keyword) != -1){
            bongo_channelid=bongo_update_channelid;
            console.log("update page channel id "+bongo_channelid);
            //specific on update page
            //hide article and show bongo
            $("#update_bongo").removeClass("zd_Hidden");
            $("#article-container").addClass("zd_Hidden");
        }else{
            console.log("all the other page channel id "+bongo_channelid);
        }

        // Connect to the ODA
        //padding channel ID as parameters to connect different chat channel
        //this is the article ID for update page
        //sandbox 360017209739
        Bots.connect( {channelId: bongo_channelid});

        // Create global object to refer Bots
        window[name] = Bots;


        Bots.setFont('16px "noway", Noway Regular, Helvetica, Arial, sans-serif !important');


        Bots.on('widget:closed', function() {

            $(".oda-chat-widget").removeClass("shakeBongo");
            var allInOneLauncher = document.getElementById("all_in_one_widget");
            if (allInOneLauncher != null) {

                if (allInOneLauncher.classList.contains("zd_Hidden")) {
                    //if it has class to show it on page
                    //remove the class
                    allInOneLauncher.classList.remove("zd_Hidden");
                }

                if (!(allInOneLauncher.classList.contains("allInOneWidgetButton"))) {
                    //if it not having a Hidden Class to hide it
                    //hide it
                    allInOneLauncher.classList.add("allInOneWidgetButton");
                }
            }

            var option_Widget = document.getElementById("option_Widget");
            if (option_Widget != null) {
                option_Widget.classList.add("zd_Hidden");
                // hide the 'get in touch' button again 
            }

            ga_tracking("Bongo", "clicked", "bongo closed");


        });



        //This event is triggered when the user receives a message.
        //the message that bongo initiated
        Bots.on('message:received', function(message) {
           // console.log('the user received a message', message);
          //  console.log(Bots.getConversationHistory().messagesCount +" message counting");
            bot_init_message=Bots.getConversationHistory().messagesCount
            if ((user_init_message == 0)&&(bot_init_message==2)) {
                //this condition check when the hidden message was send and bongo initiated the conversation, then user started conversation
                ga_tracking("Bongo", "Conversation", "User starts conversation");
                console.log("user send first message and GA tracked");
                user_init_message = 1;
            }
           
        });

        $("#open_bongo_update").click(function(){
            $("#bongo_open").click();
        });


    }, 0);

};




$.loadScript('https:' + document.getElementById("bongo_sdk").innerHTML, function() {
    initSdk('Bots');

});