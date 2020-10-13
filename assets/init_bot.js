function initialize_bot() {

    var bot_id = document.getElementById("bongo_id").innerHTML;
    //Send a hidden hi message upon opening the chat widget without conversation history:
    var bongo_init_headertext = document.getElementById("bongo_init_headertext").innerHTML;
    var bongo_init_sendbuttontext = document.getElementById("bongo_init_sendbuttontext").innerHTML;
    var bongo_init_inputplaceholder = document.getElementById("bongo_init_inputplaceholder").innerHTML;
    var bongo_subheader = document.getElementById("bongo_subheader").innerHTML;
    var bongo_locale = $('html').attr('lang').toLowerCase();
    //console.log(bongo_locale);



    //Upon opening widget send a hidden hello message if there is no conversation history
    var messageBody = {
        text: 'Hi',
        type: 'text',
        metaData: {
            isHidden: true
        }
    };

    Bots.on('ready', function () {
        if (Bots.getConversation().messages.length < 1) {
            Bots.sendMessage({
                text: 'Hi', metaData: {
                    isHidden: true
                }
            });
        }
    });

    Bots.init({
        appId: bot_id,
        browserStorage: 'sessionStorage',
        businessName: "Bongo",
        displayStyle: 'button',
        menuItems: {
            imageUpload: false,
            fileUpload: false,
            shareLocation: false
        },
        delegate: {
            beforeDisplay: function (message) {
                if (message.role == 'appMaker') {
                    // if (message.text) {
                    //     message.text = message.text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");  //Unescape HTML from Bot
                    // }
                    message.avatarUrl = "https://download.tomtom.com/support/cc/help/assets/Bongo/tiny_bongo.png"; //Bot avatar

                }
                if (message.metaData && message.metaData.isHidden) {
                    return null; //Don't show hidden messages
                }
                else
                    return message;
            }
        },
        locale: bongo_locale,
        //locale: 'nl',//testing - use line above to finish ticket :)
        buttonIconUrl: 'https://download.tomtom.com/support/cc/help/assets/Bongo/small_bongo.png',
        buttonWidth: '100px',
        buttonHeight: '100',
        embedded: true,
        businessIconUrl: "https://webassets.tomtom.com/m/5d37027773b964a0/original/tomtom-brand-header-logo.svg",
        customColors: {
            brandColor: "DF1B12",
            actionColor: "DF1B12",
            conversationColor: "FDC530"
        },
        soundNotificationEnabled: false, //disable sound notification for new messages
        customText: {
            sendButtonText: bongo_init_sendbuttontext,
            headerText: bongo_init_headertext,
            introductionText: bongo_subheader,
            actionPostbackError: 'An error occurred while processing your action. Please try again.',
            clickToRetry: 'Message not delivered. Click to retry.',
            conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
            fetchHistory: 'Load more',
            fetchingHistory: 'Retrieving history...',
            inputPlaceholder: bongo_init_inputplaceholder,
            messageIndicatorTitlePlural: '({count}) New messages',
            messageIndicatorTitleSingular: '({count}) New message',
            messageRelativeTimeDay: '{value}d ago',
            messageRelativeTimeHour: '{value}h ago',
            messageRelativeTimeJustNow: 'just now',
            messageRelativeTimeMinute: '{value}m ago',
            messageTimestampFormat: 'hh:mm A',
            messageSending: 'Sending...',
            messageDelivered: 'Delivered',
            settingsHeaderText: 'Settings',
            tapToRetry: 'Message not delivered. Tap to retry.',
            unsupportedMessageType: 'Unsupported message type.',
            unsupportedActionType: 'Unsupported action type.',
        }
    });

}

initialize_bot();
