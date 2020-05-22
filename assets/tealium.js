function tealium(){
    
  //load script function
     jQuery.loadScript = function (url, callback) {
      jQuery.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: true
      });
  }
  //load script function
  
   var the_url= window.location.href;
   //using Support API to get user information
   var the_domain_header=the_url.split(".com");
   var the_url_header =the_domain_header[0];
   var xhr = new XMLHttpRequest();
   var url = the_url_header+".com/api/v2/users/me.json";
   username = "ccdev@groups.tomtom.com",
        password = "@=lx4+68}g";
        xhr.withCredentials = true;
        xhr.open("GET", url, true, username, password);
   
   xhr.send();      


   xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {

    var user_tomtom_id = (JSON.parse(this.responseText)).user.user_fields.tomtom_id;
   
   //tealium
   //get utag script from MAP
   var id_map_data_source="https:"+$("#map_json").html();
   $.getJSON(id_map_data_source, function(data){
       var tealium_script="";
      // console.log(data);

      //loading the script
   if (the_url.indexOf("sandbox")!= -1) {
    tealium_script=data.tealium.sandbox;
   
   // $.loadScript('//tags.tiqcdn.com/utag/tomtom/support/qa/utag.js');
    }
    
    if (the_url.indexOf("sandbox")== -1) {
        tealium_script=data.tealium.prod;
   // $.loadScript('//tags.tiqcdn.com/utag/tomtom/support/prod/utag.js');
    }
    //loading the script
 
    $.loadScript(tealium_script);

    //console.log("tealium_script  "+tealium_script);

   });
      
 
  
   var cutter= ".tomtom.com/hc/";
   var region_string=the_url.split(cutter)[1];
   var region=region_string.split('/')[0];
   var ref= document.referrer;
   var category="";
   //var user_tomtom_id=0;
  
if(the_url.indexOf("categories")!= -1){
  var finding_category=the_url.split('/');
  category=finding_category[finding_category.length-1];
  }else{
  category="unknow";
  }
 
  var utag_data={
      site_name     : "support.tomtom.com",
      site_region  : region,
      site_language : region,
      page_referringURL  : ref,
      page_name : document.title,
          page_id:"",
          page_category:category,
          page_type_id:"",
      user_id:user_tomtom_id
  
  };
  
  
  console.log(utag_data);
  console.log("tealium independent");
   //tealium
    }});


   


};

tealium();