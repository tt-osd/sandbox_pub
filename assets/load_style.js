function load_style(css_url) {

    var create_a_link = document.createElement('link');
    // set the attributes for link element 
    create_a_link.rel = 'stylesheet';
    create_a_link.type = 'text/css';
    //get css url
    create_a_link.href = "https:" + css_url;
    // Get HTML head element to append and then link the element to it  
    document.getElementsByTagName('HEAD')[0].appendChild(create_a_link);
}