function tealium(){
  

  //new function for get JSON
  function readMap(myURL){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",myURL,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
var id_map_data_source="https:"+$("#map_json").html();
var mapObject = JSON.parse(readMap(id_map_data_source));



var tealium_script="";
    

//loading the script
if (the_url.indexOf("sandbox")!= -1) {
tealium_script=mapObject.tealium.sandbox;


}

if (the_url.indexOf("sandbox")== -1) {
  tealium_script=mapObject.tealium.prod;

}

/* Below keys define the IDs for the pages we want to track */

var wifi_section_id = mapObject.wifi_section_ID[searchKey];
var tthome_section_id = mapObject.TT_home_section_ID[searchKey];
var amigo_section_id = mapObject.amigo_section_ID[searchKey];
var go_navigation_section_id = mapObject.go_navigation_section_ID[searchKey];
var go_mobile_section_id = mapObject.go_mobile_section_ID[searchKey];
var navigation_app_section_id = mapObject.navigation_app_section_ID[searchKey];
var curfer_app_section_id = mapObject.curfer_app_section_ID[searchKey];
var sports_watch_section_id = mapObject.sports_watch_section_ID[searchKey];
var golfer_section_id = mapObject.golfer_section_ID[searchKey];
var tomtom_touch_section_id = mapObject.tomtom_touch_section_ID[searchKey];
var bandit_section_id = mapObject.bandit_section_ID[searchKey];
var services_section_id = mapObject.services_section_ID[searchKey];
var legal_privacy_section_id = mapObject.legal_privacy_section_ID[searchKey];
var accounts_section_id = mapObject.accounts_section_ID[searchKey];
var orders_section_id = mapObject.orders_section_ID[searchKey];
var release_notes_section_id = mapObject.release_notes_section_ID[searchKey];
var user_manuals_section_id = mapObject.user_manuals_section_ID[searchKey];
var using_your_device_section_id = mapObject.using_your_device_section_ID[searchKey];
var tips_section_id = mapObject.tips_section_ID[searchKey];
var about_section_id = mapObject.about_section_ID[searchKey];
var announcements_section_id = mapObject.announcements_section_ID[searchKey];
var mdc_section_id = mapObject.mdc_section_ID[searchKey];
var navigation_category_ID = mapObject.naviagtion_category_ID[searchKey];
var apps_category_ID = mapObject.apps_category_ID[searchKey];
var sports_category_ID = mapObject.sports_category_ID[searchKey];
var accounts_orders_legal_category_ID = mapObject.accounts_orders_legal_category_ID[searchKey];
var user_manual_release_info_category_ID = mapObject.user_manual_release_info_category_ID[searchKey];
var learn_more_category_ID = mapObject.learn_more_category_ID[searchKey];
      
if ((the_url.indexOf("articles") != -1) || (the_url.indexOf("sections") != -1)) {
    var bread_crumbs = document.querySelector('ol[class="breadcrumbs"]');
    if (bread_crumbs) {
    var section_from_breadcrumb = bread_crumbs.getElementsByTagName('li')[bread_crumbs.getElementsByTagName("li").length - 1];
    var anchor = ((section_from_breadcrumb.getElementsByTagName('a'))[0]).href;
    }
}
  
    var cutter= ".tomtom.com/hc/"; 
    var region = ""; // var to collect the region custom dimension
    var language = document.documentElement.lang.toLowerCase(); // Get the current language of the site the customer is on
    var ref = document.referrer;
    var page_category = ""; // Var to collect the Page category Dimension 
    var page_type_id = ""; // Var to collect the page type ID (artilce type, e.g Troubleshooting or How-To)
    var page_id = "" // Var to collect to the page ID (Article ID)
    var homepage = document.getElementById('home-section'); // This ID only appears on home page, so we can identify when cust is on home page
    var user_id = ""; // Var to collect to the User ID (Zendesks logged in user ID)
    var page_category_detail = " "; // Var to collect to the User ID (Zendesks logged in user ID)

    if (the_url.indexOf("/categories/")!= -1){
        page_category = "Category";
        if (the_url.indexOf(navigation_category_ID)!= -1){
            page_category_detail = "Navigation Category";        
        } else if (the_url.indexOf(sports_category_ID)!= -1) { 
            page_category_detail = "Sports Category";        
        } else if (the_url.indexOf(apps_category_ID)!= -1) { 
            page_category_detail = "Apps Category";        
        } else if (the_url.indexOf(accounts_orders_legal_category_ID)!= -1) { 
            page_category_detail = "Accounts Orders Legal Category";        
        } else if (the_url.indexOf(user_manual_release_info_category_ID)!= -1) { 
            page_category_detail = "User Manauals Release Notes Category";        
        } else if (the_url.indexOf(learn_more_category_ID)!= -1) { 
            page_category_detail = "Learn More Category";        
        } else { page_category_detail = "Category";}
    } else if (the_url.indexOf("/sections/")!= -1) { 
        page_category = "Section";
        if ((anchor.indexOf(wifi_section_id) != -1)) {
            page_category_detail = "Wifi Section";
        } else if ((anchor.indexOf(mdc_section_id) != -1)) {
            page_category_detail = "MyDrive Connect Section";
        } else if ((anchor.indexOf(tthome_section_id) != -1)) {
            page_category_detail = "TomTom HOME Section";
        } else if ((anchor.indexOf(amigo_section_id) != -1)) {
            page_category_detail = "Amigo Section";
        } else if ((anchor.indexOf(go_navigation_section_id) != -1)) {
            page_category_detail = "Go Navigation Section";
        } else if ((anchor.indexOf(go_mobile_section_id) != -1)) {
            page_category_detail = "GO Mobile Section";
        } else if ((anchor.indexOf(navigation_app_section_id) != -1)) {
            page_category_detail = "Navigation App Section";
        } else if ((anchor.indexOf(curfer_app_section_id) != -1)) {
            page_category_detail = "Curfer Section";
        } else if ((anchor.indexOf(sports_watch_section_id) != -1)) {
            page_category_detail = "Sport Watch Section";
        } else if ((anchor.indexOf(golfer_section_id) != -1)) {
            page_category_detail = "Golfer Section";
        } else if ((anchor.indexOf(tomtom_touch_section_id) != -1)) {
            page_category_detail = "TomTom Touch Section";
        } else if ((anchor.indexOf(bandit_section_id) != -1)) {
            page_category_detail = "Bandit Section";
        } else if ((anchor.indexOf(services_section_id) != -1)) {
            page_category_detail = "Services Section";
        } else if ((anchor.indexOf(legal_privacy_section_id) != -1)) {
            page_category_detail = "Legal Privacy Section";
        } else if ((anchor.indexOf(accounts_section_id) != -1)) {
            page_category_detail = "Accounts Section";
        } else if ((anchor.indexOf(orders_section_id) != -1)) {
            page_category_detail = "Orders Section";
        } else if ((anchor.indexOf(release_notes_section_id) != -1)) {
            page_category_detail = "Release Notes Section";
        } else if ((anchor.indexOf(user_manuals_section_id) != -1)) {
            page_category_detail = "User Manual Section";
        } else if ((anchor.indexOf(using_your_device_section_id) != -1)) {
            page_category_detail = "Using Your Device Section";
        } else if ((anchor.indexOf(tips_section_id) != -1)) {
            page_category_detail = "Tips Section";
        } else if ((anchor.indexOf(about_section_id) != -1)) {
            page_category_detail = "About Section";
        } else if ((anchor.indexOf(announcements_section_id) != -1)) {
            page_category_detail = "Announcements Section";
        } else {
            page_category_detail = "Section";
        }       
    } else if (the_url.indexOf("/articles/")!= -1) { 
        if (anchor) {
        page_category = "Article";
        if ((anchor.indexOf(wifi_section_id) != -1)) {
            page_category_detail = "Wifi Article";
        } else if ((anchor.indexOf(mdc_section_id) != -1)) {
            page_category_detail = "MyDrive Connect Article";
        } else if ((anchor.indexOf(tthome_section_id) != -1)) {
            page_category_detail = "TomTom HOME Article";
        } else if ((anchor.indexOf(amigo_section_id) != -1)) {
            page_category_detail = "Amigo Article";
        } else if ((anchor.indexOf(go_navigation_section_id) != -1)) {
            page_category_detail = "Go Navigation Article";
        } else if ((anchor.indexOf(go_mobile_section_id) != -1)) {
            page_category_detail = "GO Mobile Article";
        } else if ((anchor.indexOf(navigation_app_section_id) != -1)) {
            page_category_detail = "Navigation App Article";
        } else if ((anchor.indexOf(curfer_app_section_id) != -1)) {
            page_category_detail = "Curfer Article";
        } else if ((anchor.indexOf(sports_watch_section_id) != -1)) {
            page_category_detail = "Sport Watch Article";
        } else if ((anchor.indexOf(golfer_section_id) != -1)) {
            page_category_detail = "Golfer Article";
        } else if ((anchor.indexOf(tomtom_touch_section_id) != -1)) {
            page_category_detail = "TomTom Touch Article";
        } else if ((anchor.indexOf(bandit_section_id) != -1)) {
            page_category_detail = "Bandit Article";
        } else if ((anchor.indexOf(services_section_id) != -1)) {
            page_category_detail = "Services Article";
        } else if ((anchor.indexOf(legal_privacy_section_id) != -1)) {
            page_category_detail = "Legal Privacy Article";
        } else if ((anchor.indexOf(accounts_section_id) != -1)) {
            page_category_detail = "Accounts Article";
        } else if ((anchor.indexOf(orders_section_id) != -1)) {
            page_category_detail = "Orders Article";
        } else if ((anchor.indexOf(release_notes_section_id) != -1)) {
            page_category_detail = "Release Notes Article";
        } else if ((anchor.indexOf(user_manuals_section_id) != -1)) {
            page_category_detail = "User Manual Article";
        } else if ((anchor.indexOf(using_your_device_section_id) != -1)) {
            page_category_detail = "Using Your Device Article";
        } else if ((anchor.indexOf(tips_section_id) != -1)) {
            page_category_detail = "Tips Article";
        } else if ((anchor.indexOf(about_section_id) != -1)) {
            page_category_detail = "About Article";
        } else if ((anchor.indexOf(announcements_section_id) != -1)) {
            page_category_detail = "Announcements Article";
        } else {
            page_category_detail = "Article";
        } 
    } else {
        page_category = "error";
        page_category_detail = "error";
    }
    } else if (the_url.indexOf("/contributions/")!= -1) { 
        page_category = "Contributions";
        page_category_detail = "Contributions";
     
    } else if (the_url.indexOf("/subscriptions")!= -1) { 
        page_category = "Subscriptions";
        page_category_detail = "Subscriptions";
     
    } else if (the_url.indexOf("/new?ticket_form_id=")!= -1) { 
        page_category = "Form";
        page_category_detail = "ticket_form_page_title"; 

    } else if (the_url.indexOf("/requests/")!= -1) { 
        page_category = "Request";  
        page_category_detail = "Request"; 
     
    } else if (the_url.indexOf("/requests#repairs")!= -1) { 
        page_category = "Repairs";
        page_category_detail = "Repairs";
      
    } else if (the_url.indexOf("/requests")!= -1) { 
        page_category = "Request List";
        page_category_detail = "Request List";
      
    } else if (the_url.indexOf("/search")!= -1) { 
        page_category = "Search Results";
        page_category_detail = "Search Results";

    } else if (the_url.indexOf("/community/topics/")!= -1) { 
        page_category = "Community Topics (not used)";
        page_category_detail = "Community Topics (not used)";
    
    } else if (the_url.indexOf("/community/posts/new")!= -1) { 
        page_category = "Community New Post (not used)";
        page_category_detail = "Community New Post (not used)";
    
    } else if (the_url.indexOf("/community/posts")!= -1) { 
        page_category = "Community Post (not used)";
        page_category_detail = "Community Post (not used)";
      
    } else if (the_url.indexOf("/profiles/")!= -1) { 
        page_category = "User Profile";
        page_category_detail = "User Profile";
      
    } else if (homepage) { 
        page_category = "Home";
        page_category_detail = "Home";
    }  else {
        page_category="error";
        page_category_detail = "error";
    }

if (the_url.indexOf("/articles/")!= -1){

    var troubleshooting = document.getElementById('Troubleshooting');    
    var Content = document.getElementById('Content');
    var Get_started = document.getElementById('Get_started');
    var How_to = document.getElementById('How_to');
    var Manuals = document.getElementById('Manuals');

    page_id = the_url.substring(
        the_url.lastIndexOf("articles/") + 9, 
        the_url.lastIndexOf("articles/") + 21, 
                                        );

if (troubleshooting) {
    page_type_id = "Troubleshooting";
}  
else if (Content) {
page_type_id = "Content";
}

else if (Get_started) {
page_type_id = "Get Started";
}

else if (How_to) {
    page_type_id = "How To";
}
else if (Manuals) {
    page_type_id = "Manuals";
}
else {
    page_type_id="unknown template used";
}
}
else {
    page_type_id="";
}

if (language.match(/^(en-ca|en-us|fr-ca|pt-br|es-ar|es-mx)$/)) {

    region = "AMER" 

} else if (language.match(/^(nl-nl|de-de|fr-fr|it-it|nl-be|en-ie|en-za|en-gb|fi|fr|fr-be|fr-lu|fr-ch|de|de-at|de-ch|el|hu|it|no|nb|pl|pl-pl|pt|pt-pt|es|es-es|sv)$/)) {

    region = "EMEA" 

} else if (language.match(/^(zh-cn|zh-tw|en-au|en-in|en-nz|en-sg|ja|ko|ko-kr)$/)) {

    region = "APAC"

} else {
    
    region = "unknown";

    }
if (typeof HelpCenter != "undefined") { // helpCenter only loads after document has loaded, so this IF eliminates the script breaking if the object hasn't loaded yet
        if (HelpCenter.user.role !== "anonymous") { // then IF the customer is NOT anonymous then get their user ID
            user_id = HelpCenter.user.identifier; // User ID
        } else {
            user_id = "Logged_out"; // No User ID 
        }
        } else { // Else (if the helpcenter object wasn't defined) then show undefined, this is more for reporting purposes
            user_id = "Undefined";
        }
var sitespect = "";
var sitespect_id = "";

    var utag_data={
        page_name : document.title,
        page_referringURL  : ref,
        privacy_level: "All",
        site_name     : "help.tomtom.com",
        site_language : language,
        site_region  : region,
        page_category: page_category,    
        page_type_id:page_type_id,
        page_id: page_id,
        sitespect:sitespect,
        sitespect_id:sitespect_id,
        user_id:user_id
    };
console.log("Tester, this page is a " + page_category_detail + " page!!");
window.support = {};
if( typeof SiteSpectData != "undefined") { //makes sure sitespect data is defind before calling this, it's defined in SiteSpect itself, so we have no control on what is defined first
    support.sitespect = SiteSpectData;
    support.sitespect_id = "";
    }

var tealium_object={
  tealium_script_slot: tealium_script,
  utag_data_slot:utag_data
};

return tealium_object;

};

