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


      

  
    var cutter= ".tomtom.com/hc/";
    var region = "";
    var language=document.documentElement.lang.toLowerCase();;
    var ref= document.referrer;
    var page_category="";
    var page_type_id="";
    var page_id = ""
    var homepage = document.getElementById('home-section'); 
    var user_id= "";
    if (the_url.indexOf("/categories/")!= -1){
        page_category = "Category";
    
    } else if (the_url.indexOf("/sections/")!= -1) { 
        page_category = "Section";
      
    } else if (the_url.indexOf("/articles/")!= -1) { 
        page_category = "Article";
      
    } else if (the_url.indexOf("/contributions/")!= -1) { 
        page_category = "Contributions";
     
    } else if (the_url.indexOf("/subscriptions")!= -1) { 
        page_category = "Subscriptions";
     
    } else if (the_url.indexOf("/new?ticket_form_id=")!= -1) { 
        page_category = "Form";
     
    } else if (the_url.indexOf("/requests/")!= -1) { 
        page_category = "Request";  
     
    } else if (the_url.indexOf("/requests#repairs")!= -1) { 
        page_category = "Repairs";
      
    } else if (the_url.indexOf("/requests")!= -1) { 
        page_category = "Request List";
      
    } else if (the_url.indexOf("/search")!= -1) { 
        page_category = "Search Results";
      
    } else if (the_url.indexOf("/community/topics/")!= -1) { 
        page_category = "Community Topics (not used)";
    
    } else if (the_url.indexOf("/community/posts/new")!= -1) { 
        page_category = "Community New Post (not used)";
    
    } else if (the_url.indexOf("/community/posts")!= -1) { 
        page_category = "Community Post (not used)";
      
    } else if (the_url.indexOf("/profiles/")!= -1) { 
        page_category = "User Profile";
      
    } else if (homepage) { 
        page_category = "Home";  
    }  else {
        page_category="error";
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

} else if (language.match(/^(nl-be|en-ie|en-za|en-gb|fi|fr|fr-be|fr-lu|fr-ch|de|de-at|de-ch|el|hu|it|no|nb|pl|pt|es|sv)$/)) {

    region = "EMEA" 

} else if (language.match(/^(zh-cn|zh-tw|en-au|en-in|en-nz|en-sg|ja|ko)$/)) {

    region = "APAC"

} else {
    
    region = "unknown";

    }

if (HelpCenter.user.role !== "anonymous") {
    user_id = HelpCenter.user.identifier;
} else {
    user_id = "Logged_out";
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

window.support = {};
support.sitespect = SiteSpectData;
support.sitespect_id = "";

var tealium_object={
  tealium_script_slot: tealium_script,
  utag_data_slot:utag_data
};



return tealium_object;



};

