# forzen
this is the back up of DDA Zendesk theme

here are the rules to be aware of when working with front end themes

    No Script functions are allowed to be written on templates, Except for the $.loadScript function which is defined in
    template, it allows other functions to be called on templates, this function is accessable from all tamplates.

    Global functions, besides the $.loadScript function, currenty google Analytics tracking function ga_tracking() is global. cookie related functions such as read_cookie() will be global in the coming DDA sprints.

    Global variable, so far there are no global variable set up in theme, but some variable will be global variable soon, such as Map and others var id_map_data_source="https:"+$("#map_json").html(); //login from widget function readMap(myURL){ var Httpreq = new XMLHttpRequest(); // a new request Httpreq.open("GET",myURL,false); Httpreq.send(null); return Httpreq.responseText;
    } var mapObject = JSON.parse(readMap(id_map_data_source));

    only and always only write functions will be executed on all pages in Script.js or load the function on header/footer templates, depends on situation.

    CSS can be loaded on templates only as well, for example home page css is being loaded on home page only through assest.

{{asset 'HomePage.css'}}
<script> var HomePage_css_link = document.createElement('link'); // set the attributes for link element HomePage_css_link.rel = 'stylesheet'; HomePage_css_link.type = 'text/css'; //get css url var homePage_Css="https:"+$("#HomePage_css").html(); HomePage_css_link.href = homePage_Css; // Get HTML head element to append // link element to it document.getElementsByTagName('HEAD')[0].appendChild(HomePage_css_link); </script>

    how to access the Dynamic content value, for example

6.1 add DC on the correct template
{{asset 'HomePage.css'}}
6.2 get value by var homePage_Css="https:"+$("#HomePage_css").html(); //sometimes is innerHTML



