function ga_tracking(event_category, event_action, event_label) {
    utag.link({
        'event_category': event_category,
        'event_action': event_action,
        'event_label': event_label
    });
};