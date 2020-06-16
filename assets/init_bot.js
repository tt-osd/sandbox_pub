function initialize_bot() {

    var bot_id = document.getElementById("bongo_id").innerHTML;
    //Send a hidden hi message upon opening the chat widget without conversation history:
    const initMessage = {
        text: 'hi',
        type: 'text',
        metadata: {
            isHidden: true
        }
    };
    Bots.on('widget:opened', function () {
        if (Bots.getConversation().messages.length == 0) {
            Bots.sendMessage(initMessage);
        }
    });

    Bots.init({
        appId: bot_id,
        businessName: "TomTom",
        displayStyle: 'button',
        //embedded: true,
        menuItems: {
            imageUpload: false,
            fileUpload: false,
            shareLocation: false
        },
        delegate: {
            beforeDisplay: function (message) {
                if (message.metadata && message.metadata.isHidden) {
                    return null; //Don't show hidden messages
                }
                if (message.role == 'appMaker') {
                    // if (message.text) {
                    //     message.text = message.text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");  //Unescape HTML from Bot
                    // }
                    message.avatarUrl = "https://download.tomtom.com/support/cc/help/assets/Bongo/tiny_bongo.png";  //Bot avatar
                }
                return message;
            }
        },
        buttonIconUrl: 'https://download.tomtom.com/support/cc/help/assets/Bongo/small_bongo.png',
        buttonWidth: '100px',
        buttonHeight: '100',
        embedded: true,
        businessIconUrl: "https://webassets.tomtom.com/m/5d37027773b964a0/original/tomtom-brand-header-logo.svg",
        customColors: {
            brandColor: "8DC3EB",
            actionColor: "DF1B12",
            conversationColor: "FDC530"
        },
        soundNotificationEnabled: false, //disable sound notification for new messages
        customText: {
            headerText: "Chat with Bongo",
            inputPlaceholder: 'Ask a question',
            sendButtonText: 'Send',
            headerText: 'Hello! How can we help you today?',
            introductionText: 'Bongo; the TomTom Digital Assistant',
            actionPostbackError: 'An error occurred while processing your action. Please try again.',
            clickToRetry: 'Message not delivered. Click to retry.',
            conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
            fetchHistory: 'Load more',
            fetchingHistory: 'Retrieving history...',
            inputPlaceholder: 'Type a message...',
            invalidFileError: 'Only images are supported. Choose a file with a supported extension (jpg, jpeg, png, gif, or bmp).',
            locationNotSupported: 'Your browser does not support location services or it’s been disabled. Please type your location instead.',
            locationSecurityRestriction: 'This website cannot access your location. Please type your location instead.',
            locationSendingFailed: 'Could not send location',
            locationServicesDenied: 'This website cannot access your location. Allow access in your settings or type your location instead.',
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

