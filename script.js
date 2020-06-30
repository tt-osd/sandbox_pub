/* PLESAE READ - There are 2 document ready functions one is below in DOMContentLoaded and there is (document).ready at the bottom if you require the whole document to load */

document.addEventListener('DOMContentLoaded', function() { // **** Include all JS in this function
  
  //this is the URL value that can be used in all the functions
   var the_url= window.location.href;
  //this is the URL value that can be used in all the functions

/*** MAP ***/  
     
    //get the id_map JSON access URL from asset
    var id_map_data_source="https:"+$("#map_json").html();
      
     
        //access id_map JSON
    $.getJSON(id_map_data_source, function(data) { 
      
    //create form id with a default value -1
      var golf_form_id= -1;
      var strap_form_id= -1;
      var gdpr_form_id= -1;
      var email_form_id= -1;
  		var serial_number_eur_field_id = -1;
  		var gdpr_reason_field_id = -1;
      var golfer_section_id = -1; 
      var nav_cat_id="";
      var spts_cat_id="";
      var apps_cat_id="";
      var userManualsReleaseInfo_cat_id="";
      var tthome_section_id="";
      var vanilla_sso_server = -1;
      var vanilla_redirect_url = -1;
       var talk_form_id = -1;
       var email_form_request_local_field=-1;
       //create form id with a default value -1




        //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter
 function checkNums(serial_number_input,submit_button,validSerialNumber){
    //a forloop run 10 times check the 3rd to 12th characher, besides 7th, the rest should be number


    for(var i=2; i<=11;i++){
      if(i != 6){
      var currentNum= parseInt(serial_number_input.charAt(i));
        if(!(isNaN(currentNum) )){
            submit_button.disabled = false;
         validSerialNumber=1;
        }else{
          validSerialNumber=0;
          submit_button.disabled = true;
          break;
        }
      }
    }


    // when the function exected, turn the "validSerialNumber" into 1, which means the serial number is valid 

    if(validSerialNumber==1){
        submit_button.disabled = false;

    }else{
        submit_button.disabled = true;
    }


  };
  //this is the function to be used after serial number live validation has checked 1st and 7th chrarcter must be a letter

      
      // declare varliables inside map json
      
      if (the_url.indexOf("sandbox")!= -1) {
         
         //form id get the sandbox id value

           golf_form_id=data.golf_form_id.sandbox;
           strap_form_id=data.strap_form_id.sandbox;
           gdpr_form_id=data.gdpr_form_id.sandbox;
           email_form_id=data.email_form_id.sandbox;
           serial_number_eur_field_id=data.serial_number_eur_field_id.sandbox;
           gdpr_reason_field_id=data.gdpr_reason_field_id.sandbox;   
           golfer_section_id=data.golfer_section_id.sandbox; 
           nav_cat_id=data.naviagtion_category_id.sandbox;
           spts_cat_id=data.sports_category_id.sandbox;
           apps_cat_id=data.apps_category_id.sandbox;
           userManualsReleaseInfo_cat_id=data.user_manual_release_info_category_id.sandbox;
  				 tthome_section_id=data.tthome_section_id.sandbox; 
       		 vanilla_redirect_url=data.vanilla_redirect_url.sandbox; 
        	 vanilla_sso_server=data.vanilla_sso_server.sandbox; 
          talk_form_id=data.talk_form_id.sandbox;
          email_form_request_local_field=data.email_form_request_local.sandbox;
        		  } else {
            
           //form id get the production id value
            golf_form_id=data.golf_form_id.prod;
            strap_form_id=data.strap_form_id.prod;
            gdpr_form_id=data.gdpr_form_id.prod;
            email_form_id=data.email_form_id.prod;
            serial_number_eur_field_id=data.serial_number_eur_field_id.prod;
            gdpr_reason_field_id=data.gdpr_reason_field_id.prod;   
            golfer_section_id=data.golfer_section_id.prod; 
            nav_cat_id=data.naviagtion_category_id.prod;
            spts_cat_id=data.sports_category_id.prod;
            apps_cat_id=data.apps_category_id.prod;
            userManualsReleaseInfo_cat_id=data.user_manual_release_info_category_id.prod;
            tthome_section_id=data.tthome_section_id.prod; 
            vanilla_redirect_url=data.vanilla_redirect_url.prod; 
            vanilla_sso_server=data.vanilla_sso_server.prod; 
            talk_form_id=data.talk_form_id.prod;
            email_form_request_local_field=data.email_form_request_local.prod;
          }//end of get form/fields ID
      
     if(the_url.indexOf("ticket_form_id")!= -1){     //the current page is a form page 
     
         //form only available for logged in user
      
       if(HelpCenter.user.role =="anonymous"){
        $(".container").addClass("zd_Hidden");
         $(".login")[0].click();
       }
       //form only available for logged in user
       
     
    //create general variables of form elements, easy to manage 
    var SubjectLine = document.getElementById("request_subject"); 
    var DescriptionBox = document.getElementById("request_description");
    var AttachmentsFileDrop = document.getElementById("upload-dropzone");
    var title = document.getElementsByTagName("h1")[0];
    /*hard coded ID*/
    var GDPROption = document.getElementsByClassName("request_custom_fields_" + gdpr_reason_field_id);
    /*hard coded ID*/
    function isLetter(str) {      return str.length === 1 && str.match(/[a-z]/i);    }    
       
      
            //orgainse the form IDs 
            //Golf form
            var golf_form_ID_checker="form_id="+golf_form_id;
            //GDPR form
            var gdpr_form_ID_checker="form_id="+gdpr_form_id;
            //strap form
            var strap_form_ID_checker="form_id="+strap_form_id;
      
/***** STRAP REQUEST FORM *******/
//STRAP FORM //Built by Levitt, remapped by Amy
//testing URL hc/en-gb/requests/new?ticket_form_id=360000671760 
      
if(window.location.href.indexOf(strap_form_ID_checker) > -1) {	// if this is the strap form
  							   	var strap_page_title = document.getElementById("strap_page_title").innerHTML; 
                    document.title = strap_page_title;

                    $("#new_request .form-field").addClass("required"); //add required class to attachments
                    $(".datepicker").attr('required', 'true');  // make date picker required

                      // This is to prefill and hide the fields on the Strap Request Form //  
                    $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it
                    $('.request_description').addClass("zd_Hidden"); // Hide description
                    $('.request_ticket_form_id').addClass("zd_Hidden"); // Hide the Form drop down
                    document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("placeholder", "AB1234C56789"); //Giving example of serial number for customer 

                    $('<p id="strap_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
                         $("#strap_form_tips_p").html($("#strap_form_tips").html());

  									SubjectLine.value = strap_page_title + " " + strap_form_id; //Insert Strap form subject line	
 										DescriptionBox.value = strap_page_title; // Add value to description as it's 'required'

                      //create a live validation form

                      //disable the submit button 
                      var button = (document.getElementsByName("commit"))[0];
                      button.disabled = true;
                      // after the following validation is passed, this button will be enabled.

                      // serial number input max length is 12
                      document.getElementById("request_custom_fields_" + serial_number_eur_field_id).maxLength = 12;
                      // serial number input max length is 12

                      //serial number allows letters and numbers only, no punctuation or special characters
                       document.getElementById("request_custom_fields_" + serial_number_eur_field_id).setAttribute("pattern", "[A-Za-z0-9]+");
                      //serial number allows letters and numbers only, no punctuation or special characters


                      //serial number live validation
                      //set a variable for serial number validation with 0 default which means not valid yet
                    var validSerialNumber=0;
                       //set a variable for serial number validation with 0 default which means not valid yet



                     $("#request_custom_fields_" + serial_number_eur_field_id).on('input',function() {
                         var serial_number_input = (document.getElementById("request_custom_fields_" + serial_number_eur_field_id).value).toString(); 
                         if((serial_number_input.length)>=2){
                              var first_digit= parseInt(serial_number_input.charAt(0));

                              //var second_digit = parseInt(serial_number_input.charAt(1));

                              if(isNaN(first_digit) ){
                               //when the first of serial number input is not number

                                if((serial_number_input.length)>=7){
                                   //when its hit the 7th character, check if its letter

                                   var seventh_digit= parseInt(serial_number_input.charAt(6));
                                  if((isNaN(seventh_digit))){
                                    //when the 7th of serial number input is not number
                                    if((serial_number_input.length)==12){
                                      //here call the function to check the number part
                                      // to be implemented
                                      checkNums(serial_number_input,button,validSerialNumber);
                                    
                                    }else{
                                       button.disabled = true;
                                    }
                                  }

                                } // end when its hit the 7th character, check if its letter


                               }//closing if both first two serial number input is not integer number

                              }
                     }); // end of serial number oninput function 


                    	} // the end of if-at strap form page

                      /***** END STRAP REQUEST FORM *******/
											/***GDPR FORM***/
      
                      else if (window.location.href.indexOf(gdpr_form_ID_checker) > -1) {
                        
                      var GDPR_page_title = document.getElementById("GDPR_page_title").innerHTML; 
                    	document.title = GDPR_page_title;

                       
                   
                      //testing URL hc/en-gb/requests/new?ticket_form_id=360000569919

                             // title.innerHTML = "{{dc 'gdpr_request_form'}}" ;
                                $(".form-field").addClass("zd_Hidden");
                                $(".request_custom_fields_" + gdpr_reason_field_id).removeClass("zd_Hidden");
                              
                        //code review: levitt
                     
                        //update
                        SubjectLine.value = GDPR_page_title + " " + gdpr_form_id;
                        DescriptionBox.value = GDPR_page_title; 
                        (AttachmentsFileDrop.parentElement).classList.add("zd_Hidden");
                        /*** End ofGDPR FORM***/
                      	}   else if (window.location.href.indexOf(email_form_id) > -1) { 
                            /*** Email FORM***/
                          var email_page_title = document.getElementById("email_page_title").innerHTML; 
                          document.title = email_page_title; 
                          /*** Email FORM***/
                        } else {
                        
                          /***GOLF FORM***/
													//testing URL hc/en-gb/requests/new?ticket_form_id=360000679879
  
                          if (window.location.href.indexOf(golf_form_ID_checker) > -1){
                      var golf_page_title = document.getElementById("golf_page_title").innerHTML; 
                    	document.title = golf_page_title; 
                                   $('.request_subject').addClass("zd_Hidden"); // Hide subject line so custs can't edit it                
                           					SubjectLine.value = golf_page_title + " " + golf_form_id;
                                    $('<p id="golf_form_tips_p" class="form_sub_title"></p>').insertBefore('.form'); //This is to display  a message to the customers that it's a strap form 
                                    $("#golf_form_tips_p").html($("#golf_form_tips").html());                                               
                            
                                 /*** End of GOLF FORM ***/
                             } // end of if golf form 
                        	} //end of if-else-if statement for all the forms}

  					   } // end the current page is a form page   
      
         								 if(the_url.indexOf("/requests/") > -1){  
                           	var request_title = document.getElementsByClassName("request-title")[0].innerText;
                        
                           /*****  Request Pages *******/  
                              // GDPR Request Download page
       											  if (request_title.indexOf(gdpr_form_id) >= 0) {                          
                                $(".comment-form").addClass("zd_Hidden");
                                $(".my-activities-nav").addClass("zd_Hidden");
                                $(".breadcrumbs").addClass("zd_Hidden");
                                $(".request-details").addClass("zd_Hidden");                              
                                $(".request-attachments").addClass("ts-request-attachments");   
                                $(".attachments").addClass("download-button");   
                              } else if (request_title.indexOf(golf_form_id) >= 0) {
                          
                                $('<div class="comment" id="golf_thank_you"></div>').prependTo('.request-main');
                                $("#golf_thank_you").html($("#golf_thank_you_dc").html());
                              }
                         } /*****  End Request Pages *******/  
//   if($(".request-title:contains('360000569919')").length) {

//   };
      if (window.location.href.indexOf(golfer_section_id) > -1){
         document.getElementById("golf_form_block").style.display = "flex";     
            }
            

//prepare chat tag data
  

var chat_tag="prd_npr";  
if((the_url.indexOf(nav_cat_id)!= -1) &&(the_url.indexOf("categories")!= -1)){

  chat_tag="prd_nav";

}else if((the_url.indexOf("articles")!= -1) || (the_url.indexOf("sections")!= -1)){
  //articles or sections page
    var bread=document.querySelector('ol[class="breadcrumbs"]');
    var category_from_breadcrumb=bread.getElementsByTagName('li')[1];
    var anchor=((category_from_breadcrumb.getElementsByTagName('a'))[0]).href;
   if((anchor.indexOf(nav_cat_id)!= -1)){
     chat_tag="prd_nav";
   }else if((anchor.indexOf(spts_cat_id)!= -1)){
     chat_tag="prd_spts";
   }else if((anchor.indexOf(apps_cat_id)!= -1)){
     chat_tag="prd_apps";
   }else if((anchor.indexOf(userManualsReleaseInfo_cat_id)!= -1)){
     chat_tag="prd_nav";
   }else{}
  
  
  //when on the article or section page, there is a 3rd element on breadcrumb
  //if this 3rd one is TOMTOM home, then chat tag is prd_auto
  var tomtomHOME_from_breadcrumb=bread.getElementsByTagName('li')[2];
  var TT_HOME_anchor=((tomtomHOME_from_breadcrumb.getElementsByTagName('a'))[0]).href;
  if(TT_HOME_anchor.indexOf(tthome_section_id)!= -1){
   chat_tag="prd_auto";
  }
  
  
}else if((the_url.indexOf(spts_cat_id)!= -1) &&(the_url.indexOf("categories")!= -1)){
  //sports category page 
  chat_tag="prd_spts";

}else if((the_url.indexOf(apps_cat_id)!= -1) &&(the_url.indexOf("categories")!= -1)){
  //Apps category page 
  chat_tag="prd_apps";
    
}else if((the_url.indexOf(userManualsReleaseInfo_cat_id)!= -1) &&(the_url.indexOf("categories")!= -1)){
 //User-Manuals-Release-Info category page 
  chat_tag="prd_nav";
 
}else if((the_url.includes("/contributions"))||(the_url.includes("/following"))||(the_url.includes("/requests"))||(the_url.includes("/profiles"))){
  
   chat_tag="prd_npr";
}else{
  chat_tag="prd_nav"; 
}


 //chat  tag end






  
/*****  Email Widget *****/   
 // Prefilling default info form forms and hide/showing fields

      //orgainse the form IDs 
            //Golf form
            var golf_form_ID_webwidget= golf_form_id;
            //GDPR form
            var strap_form_ID_webwidget= strap_form_id;
     				 //strap form
            var email_form_ID_webwidget= email_form_id; 

     // Amy Ogborn

 	var talkLocale = $('html').attr('lang').toLowerCase();    

      if (talkLocale === 'fr' || talkLocale === 'fr-be' || talkLocale === 'fr-ca' || talkLocale === 'fr-ch' || talkLocale === 'pl'  || talkLocale === 'pt' || talkLocale === 'pt-br' || talkLocale === 'es'  ){ // Include all the page you want the talk options to show up
  
                 zESettings = {
            webWidget: 
                      {contactOptions: {
                          enabled: true,
                          contactButton: { '*': 'Get in touch' },
                        	contactFormLabel: { '*': 'Email us or call us' }
                        },
              contactForm: {
                        fields: [
                          { id: 'name', prefill: { '*':HelpCenter.user.name }}, //prefilling username
                          { id: 'email', prefill: { '*':HelpCenter.user.email }}//prefilling email
                                ],

                                ticketForms: [
                                    // pre fill subject line 
                                      //  { id: strap_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'STRAP FORM '+strap_form_id }}]},
                                      //  { id: golf_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'GOLF FORM '+golf_form_id }}] },
                                  			{ id: talk_form_id, fields: [{id: 'subject',prefill: {'*': '360000794359' }}] },
                                      //  { id: email_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'EMAIL FORM '+email_form_id }}] } 
                                        { id: email_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'EMAIL FORM '+email_form_id }},{id: email_form_request_local_field ,prefill: {'*': talkLocale }}] }                          
                                         ] //displays the ticket forms: Contact, strap form and Golf. Add any IDs you want to show
                           
              },  
               color: {
                          theme: '#008D8D',
                          launcher: '#008D8D', // This will also update the badge
                          launcherText: '#FFF',
                          button: '#004B7F',
                          resultLists: '#000',
                          header: '#008D8D',
                          articleLinks: '#DF1B12'
                      }, 
               chat: {
                 		   departments: {
                 	     enabled: []
                  								  }
      							}
            }
          };  // End of webwidget settings
      } else {
                   zESettings = {
            webWidget: 
                      {
                        contactOptions: {
                          enabled: true,
                          contactButton: { '*': 'Get in touch' },                        	
                        },
              contactForm: {
                        fields: [
                          { id: 'name', prefill: { '*':HelpCenter.user.name }}, //prefilling username
                          { id: 'email', prefill: { '*':HelpCenter.user.email }}//prefilling email
                                ],

                                ticketForms: [
                                    // pre fill subject line 
                                      //  { id: strap_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'STRAP FORM '+strap_form_id }}]},
                                      //  { id: golf_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'GOLF FORM '+golf_form_id }}] },
                                  		//	{ id: talk_form_id, fields: [{id: 'subject',prefill: {'*': '360000794359' }}, {id: 'description', prefill: {'*': 'Hide this feild'}}] },
                                       // { id: email_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'EMAIL FORM '+email_form_id }}] }  
                                        { id: email_form_ID_webwidget, fields: [{id: 'subject',prefill: {'*': 'EMAIL FORM '+email_form_id }},{id: email_form_request_local_field ,prefill: {'*': talkLocale }}] }                      
                                         ] //displays the ticket forms: Contact, strap form and Golf. Add any IDs you want to show
                           
              },  
               color: {
                          theme: '#008D8D',
                          launcher: '#008D8D', // This will also update the badge
                          launcherText: '#FFF',
                          button: '#004B7F',
                          resultLists: '#000',
                          header: '#008D8D',
                          articleLinks: '#DF1B12'
                      }, 
               chat: {
                 		   departments: {
                 	     enabled: []
                  								  }
      							}
            }
          };  // End of webwidget settings
        
      }


          // web widget strap form validation and talk showing
      
      
      
      
var waitForZen = setInterval(function () {
    if (window.$zopim === undefined || window.$zopim.livechat === undefined) {
        return;
    }  
          
            zE('webWidget:on', 'userEvent', function(event) {
  
        //user property in if statement!!!!
          if((event.action)=="Contact Form Shown"){
            		var a = document.getElementById('webWidget');
            		var frameBody =  a.contentWindow.document.getElementsByTagName("body")[0];
             		var frame_embed=frameBody.querySelector("#Embed");
             		var form=frame_embed.querySelector("form");
            
            		//hide name and email field 
              	var email_label=form.querySelector('label[data-fieldid="email"]');
              	var email_input= form.querySelector('input[name="email"]');
              
              	var name_label=form.querySelector('label[data-fieldid="name"]');
              	var name_input= form.querySelector('input[name="name"]');
              
               	var subject_label=form.querySelector('label[data-fieldid="subject"]');
              	var subject_input= form.querySelector('input[name="subject"]');
            
                var description_label=form.querySelector('label[data-fieldid="description"]');
                var description_input= form.querySelector('textarea[name="description"]');
              //  var description_hint= form.querySelector('div[data-garden-id="forms.text_hint"]');


                var request_locale_label=form.querySelector('label[data-fieldid="key:'+email_form_request_local_field+'"]');
                var request_locale_input= form.querySelector('div[name="key:'+email_form_request_local_field+'"]');
            
            		  
                  email_input.style.display = "none";
                  email_label.style.display = "none";
                  name_label.style.display = "none";
                  name_input.style.display = "none";
                  subject_label.style.display = "none";
                  subject_input.style.display = "none";
              
                // end of hiding

                if((event.properties).id == email_form_id){
                  request_locale_label.style.display = "none";
                  request_locale_input.style.display = "none";
                }
            
						if((event.properties).id == talk_form_id) { // this is to hide the other feild on the phone us (talk) webwdiget
              	 	var attatchments_button= form.querySelector('button');
              		attatchments_button.style.display = "none";
                	var attatchments_label= form.querySelector('label[for="dropzone-input"]');
              		attatchments_label.style.display = "none";
                  var dropdown_button= form.querySelector('div[type="button"]');
              		dropdown_button.style.display = "none";                       		
                	description_label.style.display = "none";
               		description_input.style.display = "none";
              	//	description_hint.style.display = "none";
            }
            
           
            if((event.properties).id == strap_form_id) {
              
             
            var serial = form.querySelector('input[name="key:'+serial_number_eur_field_id+'"]');
              
             
              
              //find button 
            serial.maxLength = 12;
            serial.setAttribute("placeholder", "AB1234C56789"); 
           serial.addEventListener("input", liveValidation);
            function liveValidation(e) {
              var submit_btn = form.querySelector('button[type="submit"]');
              submit_btn.disabled= true;
        
         var serial_number_input = (serial.value).toString(); 
         if((serial_number_input.length)>=2){
           var first_digit= parseInt(serial_number_input.charAt(0));
            if(isNaN(first_digit) ){
              
              var seventh_digit= parseInt(serial_number_input.charAt(6));
               if((isNaN(seventh_digit))){
                 if((serial_number_input.length)==12){
                   //checkNums(serial_number_input);
                   var valid_serial_input=0;
                   checkNums(serial_number_input,submit_btn,valid_serial_input);
                    
                 }else{
                   //not 12 yet
                   submit_btn.disabled= true;
                 }//end of 12 length
               }//end of 7th character is letter
              
            }//end of first character is letter
         } //end of cheking first 2 characters 
            }//end of serial number verify function
            }//end of strap form serial number validation
    
          }// end of contact form shown
      }); //end of web widget strap form validation



      //pre fill chat user name, email and tag 
      zE('webWidget', 'prefill',
      {
        name:
        {
          value: HelpCenter.user.name,
          readOnly: true // optional
        },
        email:
        {
          value: HelpCenter.user.email,
          readOnly: true // optional
        },
      });
  zE('webWidget', 'chat:removeTags', ['prd_npr','prd_nav','prd_apps','prd_spts','prd_auto']);
  zE('webWidget', 'chat:addTags', [chat_tag]);

//pre fill chat user name, email and tag 
          
          clearInterval(waitForZen);
                    }, 100);

            //VANILLA SSO START
                  var vsso = window.location.search;
                  if(vsso != ''){
                    var search = vsso.includes("vanillaSSO=signin");
                    if(search){
                      if(HelpCenter.user.email != null && HelpCenter.user.role !="anonymous"){
                        set_cookie("vanillaSession",true,0);
                        window.location.href = vanilla_sso_server+"zenApi/src/vanillaSSO.php?param="+window.btoa(HelpCenter.user.email);
                       }else{
                        window.location.href = vanilla_redirect_url ;
                      }
                    } else {
                      iscookie = document.cookie.indexOf('vanillaSession=');
                      if(HelpCenter.user.email != null && HelpCenter.user.role !="anonymous" && iscookie > -1){
                        removeCookie("vanillaSession");
                        window.location.href = vanilla_sso_server+"zenApi/src/vanillaSSO.php?param="+window.btoa(HelpCenter.user.email);
                      }
                    }
                  }
            //VANILLA SSO END  //Mrunal
      
            //Code for BuRMA SSO cookie creation - Start 
      var server_url = vanilla_sso_server+'zenApi/src/repairController.php';
      if (read_cookie("tt_cp_auth") === "" && HelpCenter.user.email != null){
        $.ajax({
          url : server_url+'?userCookieEmail='+HelpCenter.user.email,
          type : 'GET',
          dataType:'JSON',
          success : function(response) {
            set_cookie("tt_cp_auth",response.encryptemail,3600000);
          },
          error : function(request,error)
          {
           // console.log('error : '+error);
            //console.log("Request: "+JSON.stringify(request));
          }
        });
      }
  //Code for BuRMA SSO cookie creation - End // Asmita

});  // end access id_map JSON
/*****  End Prefill Email Widget *****/   


    //general cookie functions
    //levitt 

    function read_cookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };


    function set_cookie(name, value, time) {
        //this is a  function which can set cookie with our without time 
      //when time==0, set a function cookie without expire time
        if(time==0){
        document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; ';
      }else{
         var CookieDate = new Date();
          var today = new Date();
  
          CookieDate.setTime(today.getTime() + time);
          document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; expires=' + CookieDate.toGMTString() + ';';
      }
      };


       ////SSO cookie 
  
  //this function is creating a function cookie called "sso" to remember user current URL
  // read_cookie() and set_cookie() function is pre created. 
  function createSSOcookie(){
    if (read_cookie("sso") === ""){  
    var current_url= window.location.href;
    var encode_current_url=encodeURIComponent(current_url);
    set_cookie("sso",encode_current_url,0);
    //setCookie, 3rd parameter is 0 means no expire time, this is a function cookie
   }
 };
    
   //this function remove "sso" cookie by passing cookie name "sso" through parametre 
   function removeCookie(name){
     if((read_cookie("sso") != "")){
        set_cookie(name, '', -1);
        }
   };
   
 
 
 //this function will redirect user to the URL which stored in "sso" function cookie 
 //read cookie function is pre created
 function redirectAccordingSSO_cookie(){
   var sso_encoded=read_cookie("sso");
   if ((sso_encoded != "")&&(HelpCenter.user.role !="anonymous")){
    var sso_decode=decodeURIComponent(sso_encoded);
     window.location.href = sso_decode;
     removeCookie("sso");
    }else{

    }
 };
  
 
   $(".login").click(function(){
     if (HelpCenter.user.role=="anonymous"){
       //when user started login, the user roll should be anonymous 
       //call the function createSSOcookie
       createSSOcookie();
     }   
   });
   
 redirectAccordingSSO_cookie();  
 if(HelpCenter.user.role=="anonymous"){
   removeCookie("sso");
 }
   
 
   
 
  //SSO cookie end

//DDA386 SSO login redirect 



    function ga_tracking(event_category, event_action, event_label) {
        utag.link({
            'event_category': event_category,
            'event_action': event_action,
            'event_label': event_label
        });
    };


    var cookie_name = " ";
    var cookie_value = " ";
    var cookie_time = 0;
    //general cookie functions

    function post_decline_tt_settings() {
        $("#tt_cookie_bar").addClass("zd_Hidden");
    }


    //the functions returns an array with two elements only
    //the first element declares the accepted:true
    // the second element declares the all:true or all:false
    function read_tt_setting_value(val_array) {

        var tt_value = [];

        for (i = 0; i < val_array.length; i++) {
            if ((val_array[i]) == '"accepted":true') {
                tt_value.push('"accepted":true');
            }
            if ((val_array[i]) == '"all":true') {
                tt_value.push('"all":true');
            }
            if ((val_array[i]) == '"all":false') {
                tt_value.push('"all":false');
            }

        }

        return tt_value;

    }




    //check TT setting cookie 
    var isTTSettingscookieSet = read_cookie('tt_settings');
    var decode_isTTSettingscookieSet = decodeURIComponent(isTTSettingscookieSet);
    var array_tt_settings = decode_isTTSettingscookieSet.split(",");



    if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":false')) {
        $("#tt_cookie_bar").removeClass("zd_Hidden");
        post_decline_tt_settings();

    } else if ((read_cookie("tt_settings")) === "") {
        $("#tt_cookie_bar").removeClass("zd_Hidden");
    } else { //has accepted tt_settings cookie with value all true
    }


    //cookie bar
    $(".cookie_bar_buttons").click(function() {

        var tt_setting_bol_value = "";
        var initial_tt_setting_array = '';
        var encode_tt_setting = '';
        var tt_setting_url = document.location;

        if ((this.id) == 'cookie_bar_buttons_accept') {

            $(".cookie_bar").hide();
            tt_setting_bol_value = "true";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);




        } else if ((this.id) == 'cookie_bar_buttons_decline') {

            post_decline_tt_settings();
						$(".cookie_bar").hide();
            tt_setting_bol_value = "false";
            cookie_name = "tt_settings";
            initial_tt_setting_array = '{"url":"' + tt_setting_url + '","accepted":true,"version":"2.0","all":' + tt_setting_bol_value + ',"options":{}}';
            cookie_value = encodeURIComponent(initial_tt_setting_array);
            cookie_time = 3600000 * 24 * 365;
            set_cookie(cookie_name, cookie_value, cookie_time);


        } else {
            $(".cookie_bar").hide();
        }

    });

    //cookie bar


    // exit survey 
    // initialize variables
    var survey_trigger = 5; //5px in the top of document
    var altitude = 0;
    //define default variable for google analytics event label
    var ga_tracking_label = " ";
    //define default variable for google analytics event action
    var ga_tracking_action = " ";
    //define default variable for google analytics event action
    var ga_tracking_category = " ";


    //initial exit survey 
    var TimeOutId = setTimeout(function() {
            $("body").on('mousemove', function(event) {
                altitude = event.clientY;
                if (altitude <= survey_trigger) {
                    if (read_cookie("exit_survey") === "") {
                        if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
                            $('#survey_modal').removeClass("zd_Hidden");
                        }
                    }
                }
            });
        },
        20000);

    //mobile version

    var h = window.screen.height;
    var indexx = h * 0.70;

   

    function survey_on_mobile() {

        if (document.body.scrollTop > indexx || document.documentElement.scrollTop > indexx) {

            if (read_cookie("exit_survey") === "") {

                if (((read_tt_setting_value(array_tt_settings)[0]) == '"accepted":true') && ((read_tt_setting_value(array_tt_settings)[1]) == '"all":true')) {
                    $('#survey_modal').removeClass("zd_Hidden");
                }

            }
        }
    };

    window.ontouchmove = function() {
      survey_on_mobile();
  };

    //mobile version

    //initial exit survey

    //click on the check box of exit survey 
    $("#agree").click(function() {
        document.getElementById("checkboxMSG").click();
        var x = document.getElementById("checkboxMSG").checked;
        if (x) {
            document.getElementById("checkboxMSG").checked = false;
        } else {
            document.getElementById("checkboxMSG").checked = true;
        }
        $("#agree_inner").toggleClass("zd_Hidden");

    });
    //click on the check box of exit survey 

    //click on the exit survey blank area to close the survey.
    $("#survey_modal").click(function(e) {
        if (e.target != this) {

            return false;
        } else {
            if ((this.id) == 'survey_modal') {
                $('#survey_modal').addClass("zd_Hidden");
                ga_tracking_label = "close";
                ga_tracking_category = "happy customer"
                cookie_name = "exit_survey";
                cookie_value = "close";
                if ($('#checkboxMSG').is(':checked')) {
                    cookie_time = 3600000 * 24 * 30;
                    ga_tracking_action = "dnr";
                } else {
                    cookie_time = 45000;

                }

                ga_tracking(ga_tracking_category, ga_tracking_action, ga_tracking_label);
                set_cookie(cookie_name, cookie_value, cookie_time);
            }
        }
    });
    //click on the exit survey blank area to close the survey.

    //give feedback to exit survey 
    $(".op").click(function() {
        var option_id = this.id;
        cookie_name = "exit_survey";
       ga_tracking_category = "happy customer"


        if (option_id == 'option_yes') {
            ga_tracking_label = "yes";
            cookie_value = "helpful";
        } else {
            ga_tracking_label = "no";
            cookie_value = "unhelpful";
        }


        if ($('#checkboxMSG').is(':checked')) {
            cookie_time = 3600000 * 24 * 14;
            ga_tracking_action = "dnr";
        } else {
            cookie_time = 3600000 * 24 * 7;
        }

        $('#greetings').text($('#es_thx').text());
        $(".option_container,.check_box_area").hide();

        $(document).mousemove(function(event) {
            $('#survey_modal').addClass("zd_Hidden");
        });
        $(document).scroll(function(event) {

            $('#survey_modal').addClass("zd_Hidden");
        });
 ga_tracking(ga_tracking_category, ga_tracking_action, ga_tracking_label);
        set_cookie(cookie_name, cookie_value, cookie_time);
    });
    //give feedback to exit survey 
    // exit survey


  //start of bongo render, open and close
  // create a var to check if the bongo is already loaded, 0 by default means not loaded
  
  
  var bongo_loaded=0;

  function getLocale() {
    return window.location.href
           .split('/hc/')[1]
           .split('/')[0];
   }

    $("#bongo_open").click(function(){
      var lo = getLocale();
      if(lo.includes("en")){// bongo only works on English locale
          // to open a conversation with bongo, click talk to bongo from subfooter
      if( bongo_loaded==1){
         //when bongo is loaded, open chat by showing the chat window
          var bongo=document.getElementById("web-messenger-container"); 
   				bongo.classList.remove("zd_Hidden");    
      }else{
        //when bongo is not loaded, open chat by render the bot
          Bots.render(document.getElementById('bongo_place'));
          var bongo=document.getElementById("web-messenger-container"); 
          //add the css changes to make bongo fit in sub footer 
          bongo.classList.add("zd_Bongo");
      } 
      
       ga_tracking("Bongo", "clicked", "bongo opened");
       
      }else{
        var bongo_alter=$("#bongo_alter").html();
        window.location.href = bongo_alter; 
      }
    
  });

  
  //to close a bongo chat window, click anywhere eles on the page but bongo to hide the window
  $('body').click(function(evt){    
    if(evt.target.id == "bongo_place")
    return;
 if($(evt.target).closest('#bongo_place').length)
    return;             
    var bongo=document.getElementById("web-messenger-container"); 
    if(bongo!=null){
   
    bongo_loaded=1; // when hidding the chat window, to remember that bongo is already loaded. 
      if(!(bongo.classList.contains("zd_Hidden"))){
        ga_tracking("Bongo", "clicked", "bongo closed");
      }
       bongo.classList.add("zd_Hidden");    
    
    }
});
    //end of bongo render, open and close





    //serial number
//     function read_spa_Software(software){
//         var software_decode_head =software.split("€");
//         var software_decode=software_decode_head[0];
        
//         var thisURL= window.location.href;
//         var URL_decode=thisURL.split("/hc/")[0];
//         var target_URL = URL_decode;
    
//                     switch (software_decode) {
//                         case 'TomTom HOME':
//                             target_URL += "/hc/en-gb/sections/360003585479-TomTom-HOME";              
//                             break;
//                         case 'MyDrive Connect':
//                              target_URL += "/hc/en-gb/sections/360003542620-MyDrive-Connect";
//                             break;
//                         case 'Bandit Studio':
//                             target_URL += "/hc/en-gb/sections/360003586039-TomTom-Bandit-Action-Camera";
//                             break;
//                         case 'Wi-Fi®':
//                             target_URL += "/hc/en-gb/sections/360003542600-Wi-Fi";
//                             break;
//                         case 'MySports Connect':
//                             target_URL += "/hc/en-gb/sections/360003542980-Sports-Watch";
//                             break;
//                         case 'N/A':
//                            target_URL =thisURL;
//                     }
//                   window.location.href = target_URL;  
//         //end of function
//       }








//        $("#tt_serial_no_input").on('input',function(){   
//         var tt_serial_number_input = (document.getElementById("tt_serial_no_input").value).toString(); 
//         if((tt_serial_number_input.length)==2){
//            // sunshineSearch("tt_serial_number","serial_prefix",tt_serial_number_input);
//         }
//       });
   





    //serial number



    // above code are edited by levit

                      // Below code is zendesk
                          function closest(element, selector) {
                              if (Element.prototype.closest) {
                                  return element.closest(selector);
                              }
                              do {
                                  if (Element.prototype.matches && element.matches(selector) ||
                                      Element.prototype.msMatchesSelector && element.msMatchesSelector(selector) ||
                                      Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
                                      return element;
                                  }
                                  element = element.parentElement || element.parentNode;
                              } while (element !== null && element.nodeType === 1);
                              return null;
                          }

                          // social share popups
                          Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
                              anchor.addEventListener('click', function(e) {
                                  e.preventDefault();
                                  window.open(this.href, '', 'height = 500, width = 500');
                              });
                          });

                          // In some cases we should preserve focus after page reload
                          function saveFocus() {
                              var activeElementId = document.activeElement.getAttribute("id");
                              sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
                          }
                          var returnFocusTo = sessionStorage.getItem('returnFocusTo');
                          if (returnFocusTo) {
                              sessionStorage.removeItem('returnFocusTo');
                              var returnFocusToEl = document.querySelector(returnFocusTo);
                              returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
                          }

                          // show form controls when the textarea receives focus or backbutton is used and value exists
                          var commentContainerTextarea = document.querySelector('.comment-container textarea'),
                              commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

                          if (commentContainerTextarea) {
                              commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
                                  commentContainerFormControls.style.display = 'block';
                                  commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
                              });

                              if (commentContainerTextarea.value !== '') {
                                  commentContainerFormControls.style.display = 'block';
                              }
                          }

                          // Expand Request comment form when Add to conversation is clicked
                          var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
                              requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
                              requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

                          if (showRequestCommentContainerTrigger) {
                              showRequestCommentContainerTrigger.addEventListener('click', function() {
                                  showRequestCommentContainerTrigger.style.display = 'none';
                                  Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
                                  requestCommentSubmit.style.display = 'inline-block';

                                  if (commentContainerTextarea) {
                                      commentContainerTextarea.focus();
                                  }
                              });
                          }

                          // Mark as solved button
                          var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
                              requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
                              requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

                          if (requestMarkAsSolvedButton) {
                              requestMarkAsSolvedButton.addEventListener('click', function() {
                                  requestMarkAsSolvedCheckbox.setAttribute('checked', true);
                                  requestCommentSubmitButton.disabled = true;
                                  this.setAttribute('data-disabled', true);
                                  // Element.closest is not supported in IE11
                                  closest(this, 'form').submit();
                              });
                          }

                          // Change Mark as solved text according to whether comment is filled
                          var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

                          if (requestCommentTextarea) {
                              requestCommentTextarea.addEventListener('input', function() {
                                  if (requestCommentTextarea.value === '') {
                                      if (requestMarkAsSolvedButton) {
                                          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
                                      }
                                      requestCommentSubmitButton.disabled = true;
                                  } else {
                                      if (requestMarkAsSolvedButton) {
                                          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
                                      }
                                      requestCommentSubmitButton.disabled = false;
                                  }
                              });
                          }

                          // Disable submit button if textarea is empty
                          if (requestCommentTextarea && requestCommentTextarea.value === '') {
                              requestCommentSubmitButton.disabled = true;
                          }

                          // Submit requests filter form on status or organization change in the request list page
                          Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
                              el.addEventListener('change', function(e) {
                                  e.stopPropagation();
                                  saveFocus();
                                  closest(this, 'form').submit();
                              });
                          });

                          // Submit requests filter form on search in the request list page
                          var quickSearch = document.querySelector('#quick-search');
                          quickSearch && quickSearch.addEventListener('keyup', function(e) {
                              if (e.keyCode === 13) { // Enter key
                                  e.stopPropagation();
                                  saveFocus();
                                  closest(this, 'form').submit();
                              }
                          });

                          function toggleNavigation(toggle, menu) {
                              var isExpanded = menu.getAttribute('aria-expanded') === 'true';
                              menu.setAttribute('aria-expanded', !isExpanded);
                              toggle.setAttribute('aria-expanded', !isExpanded);
                          }

                          function closeNavigation(toggle, menu) {
                              menu.setAttribute('aria-expanded', false);
                              toggle.setAttribute('aria-expanded', false);
                              toggle.focus();
                          }

/*not being used a block of code (below)*/
                          // var burgerMenu = document.querySelector('.header .menu-button');
                          // var userMenu = document.querySelector('#user-nav');

                          // burgerMenu.addEventListener('click', function(e) {
                          //     e.stopPropagation();
                          //     toggleNavigation(this, userMenu);
                          // });


                          // userMenu.addEventListener('keyup', function(e) {
                          //     if (e.keyCode === 27) { // Escape key
                          //         e.stopPropagation();
                          //         closeNavigation(burgerMenu, this);
                          //     }
                          // });

                          // if (userMenu.children.length === 0) {
                          //     burgerMenu.style.display = 'none';
                          // }
    /*not being used a block of code (above)*/

                          //Toggles expanded aria to collapsible elements
                          var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

                          Array.prototype.forEach.call(collapsible, function(el) {
                              var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

                              el.addEventListener('click', function(e) {
                                  toggleNavigation(toggle, this);
                              });

                              el.addEventListener('keyup', function(e) {
                                  if (e.keyCode === 27) { // Escape key
                                      closeNavigation(toggle, this);
                                  }
                              });
                          });

                          // Submit organization form in the request page
                          var requestOrganisationSelect = document.querySelector('#request-organization select');

                          if (requestOrganisationSelect) {
                              requestOrganisationSelect.addEventListener('change', function() {
                                  closest(this, 'form').submit();
                              });
                          }

                          // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
                          const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
                          const subsectionsList = document.querySelector(".section-list");

                          if (subsectionsList && subsectionsList.children.length > 6) {
                              seeAllTrigger.setAttribute("aria-hidden", false);

                              seeAllTrigger.addEventListener("click", function(e) {
                                  subsectionsList.classList.remove("section-list--collapsed");
                                  seeAllTrigger.parentNode.removeChild(seeAllTrigger);
                              });
                          }

                          // If multibrand search has more than 5 help centers or categories collapse the list
                          const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
                          Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
                              if (filter.children.length > 6) {
                                  // Display the show more button
                                  var trigger = filter.querySelector(".see-all-filters");
                                  trigger.setAttribute("aria-hidden", false);

                                  // Add event handler for click
                                  trigger.addEventListener("click", function(e) {
                                      e.stopPropagation();
                                      trigger.parentNode.removeChild(trigger);
                                      filter.classList.remove("multibrand-filter-list--collapsed")
                                  })
                              }
                          });
                      // Above code is zendesk 
  
   /*** Redirecting untranslated articles to an existing language ****/
  
        var notDefaultLanguage = window.location.href.indexOf('/en-gb/') == -1;
        var isArticle = window.location.href.indexOf('/articles/') > -1;
        var isErrorPage = $(".error-page").length > 0;


        if ( isArticle && notDefaultLanguage && isErrorPage ) {
            var newURL = window.location.href.replace(/(.*\/hc\/)([\w-]+)(\/.*)/, "$1en-gb$3");
            window.location.href =  newURL;
        }  
  
   /*** End of Redirecting untranslated articles to an existing language ****/ //Amy DDA-322
        /*** No results found tracking ****/
              var results_event_category = "";
              var results_event_action = "";
              var results_event_label = "";   
              var resultslist = document.getElementsByClassName('search-results-list');
              if (window.location.href.indexOf("/search?utf8") > -1 && (resultslist.length === 0)){
                var resultsheader = document.getElementsByClassName('search-results-subheading');
                var resultsheaderstring = resultsheader[0].innerHTML;

                var customersearch = resultsheaderstring.substring (
                  resultsheaderstring.indexOf('"') + 1, 
                  resultsheaderstring.lastIndexOf('"')
                );
               
                  results_event_category = "Search Results";
                  results_event_action = "No Results found";
                  results_event_label = customersearch;                  
								var waitForUtag = setInterval(function () {                 
                       ga_tracking(results_event_category, results_event_action, results_event_label);  
                    clearInterval(waitForUtag);
                } , 1000);          
                 

              }
  
  /*** End of No results found tracking ****/ //my DDA-512
  
}); // end of DOM js file function - put everything above this line

$(document).ready(function() {  // only insert after this if you need document to be ready
  
    var on__this_url= window.location.href;
 
/***** Responsive Videos *****/
  
    if (on__this_url.indexOf("/articles/")!= -1) {
                  
      /**** Scroll tracking *****/
              // Default time delay before checking location
              var callBackTime = 100;
              // # px before tracking a reader
              var readerLocation = 150;

              // Set some flags for tracking & execution
              var timer = 0;
              var scroller = false;
              var endContent = false;
              var didComplete = false;

              // Set some time variables to calculate reading time
              var startTime = new Date();
              var beginning = startTime.getTime();
              var totalTime = 0;

              // Get some information about the current page
              var pageTitle = document.title;

              // Check the location and track user
              function trackLocation() {
              bottom = $(window).height() + $(window).scrollTop();                   
              height = $(document).height(); 
              heightNoFooter = height - 1000;                
                 // If user starts to scroll send an event
                                    if (bottom > readerLocation && !scroller) {
                                        currentTime = new Date();
                                        scrollStart = currentTime.getTime();
                                        timeToScroll = Math.round((scrollStart - beginning) / 1000);
                                            utag.link({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ reading' });
                                            //                        ga('send', 'event', 'Reading', 'StartReading', pageTitle, timeToScroll, {'metric1': timeToScroll});
                                        }

                                        scroller = true;
                                            
                                      // If user has hit the bottom of the content send an event
                                      if (bottom >= heightNoFooter && !didComplete) {                                         
                                        currentTime = new Date(); end = currentTime.getTime(); totalTime = Math.round((end - scrollStart) / 1000); 
                                        utag.link ({ 'event_category': 'faq_engage', 'event_action': 'scroll', 'event_label': 'FAQ ended' });
                                      // ga('send', 'event', 'Reading', 'PageBottom', pageTitle, totalTime, {'metric3': totalTime});
                                      didComplete = true;
                                      }
                            }
              // Track the scrolling and track location
              $(window).scroll(function() {
              if (timer) { 
                clearTimeout(timer); 
              							}
              // Use a buffer so we don't call trackLocation too often.
              timer = setTimeout(trackLocation, callBackTime);
              });
            //  });
/********************* END ********************/
                  /**** Scroll tracking *****/    
      
      
    	$('.video-container').removeClass("video-container");
      $('.video-block').removeClass("video-block");
    	$('iframe[src*="youtube"]').wrap("<div class='video-container'></div>");
 			$('.video-container').wrap("<div class='video-block'></div>");
      $('.video-block').prependTo(".ts-article-video");
      $('.ts-article-video-header').prependTo(".ts-article-video");
      $('.article-links').appendTo('.ts-article-video');
/***** End Responsive Videos *****/
/***** Article Fixes *****/ 
  		$('.tts-note').addClass("article-note");  
 		 	$('.article-note').removeClass("tts-note");  
      $('.note').addClass("article-note");  
 		 	$('.article-note').removeClass("note");  
      $('.btn').addClass("button");  
 		 	$('.button').removeClass("btn"); 
/***** End Article Fixes *****/ 
/*****  Content Pages *******/   
      $("<div class='ct-header-block'></div>").prependTo(".ct-article"); 
      $(".ct-article-header").prependTo(".ct-header-block"); 
      $(".ct-article-sub-header").appendTo(".ct-header-block"); 
      $(".ct-header-description").appendTo(".ct-header-block");   
      $('<div id="option-1" class="ct-options" data="option-1-content"><span class="radiobtn"></span>Android</div>'+
        '<div class="ct-options" data="option-2-content"><span class="radiobtn"></span>iPhone</div>'+
        '<div class="ct-options" data="option-3-content"><span class="radiobtn"></span>Windows</div>').appendTo('.ct-options-list'); //adding radio options to content template  
 
function openSoftware(evt, softwareName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("ct-option-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("ct-options");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(softwareName).style.display = "block";
  evt.currentTarget.className += " active";
}
  
  
    $('.ct-options').on('click',function(evt){
    // where is the software name????
    var software=$(this).attr("data");
     
    openSoftware(evt,software);
   
  })
  
  $("#option-1").click();
  
/*****  End Content Pages *******/  
/***** Back to top function *****/ 
    
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 2000) {

            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }
    });

    $('#back-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
/***** End back to top *****/ //Amy Ogborn    
/***** Article Satisfaction *****/ 

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 600) {
            $('.article-votes').fadeIn(200);
        } else {
            $('.article-votes').fadeOut(200);
        }
    });
  /*add on*/
    /*when Article Satisfaction has been clicked on YES/NO hide it*/
        $(".article-vote").click(function(){
         	 $(".article-votes").addClass("zd_Hidden");
        });

  /*add on*/
/***** Article Satisfaction end *****/ //Amy Ogborn   

/*****  Troubleshooting Template *****/

          var theLabels = document.getElementsByClassName("labels");
          if (theLabels.length > 0 ) {  
         
                var i;          
                for (i = 0; i < theLabels.length; i++) {
                    var colorthese = theLabels[i].innerText;
                   
                    if ($('.ts-article-title').html().indexOf(colorthese) != -1){
                      			
                            $(".ts-article-title:contains("+colorthese+")").html(function(_, html) {
                                return html.replace(colorthese, '<span class="ts-red">'+colorthese+'</span>');
                          });
                    }             
                  }
            }  
  
/***** End of Troubleshooting Template *****/ //Amy Ogborn    
/*****  Get Started Template *****/ 

  
  $('.gs-article-header-block').click(function() {
        $('body,html').animate({
            scrollTop: 850
        }, 500);
    });
  
/***** End of Get Started Template *****/ //Amy Ogborn  
/*****  How To Template *****/ 

      $('.ht-header-content').appendTo(".ht-article-header");  
      $('.ht-article-body strong').contents().unwrap();

        // $('.ht-article-body img').each(function(){
        //   $(this).insertAfter($(this).parent());
        // }); 
  
/***** End of  How To Template *****/ //Amy Ogborn  
} //end of 'if this is on an article'       
  
/***** End of  Article Templates *****/ //Amy Ogborn   
/***** Promoted Articles  *****/ 
  	var numOfPromos = document.getElementsByClassName("mySlides");

      if (numOfPromos.length === 1) {
        $('#right-arrow').addClass("zd_Hidden");
        $('#left-arrow').addClass("zd_Hidden");
      } 
  
     
      $('.close').click(function() {       // This click function is to minimize the announcements box to the side   

        $('.promoted-articles-box').addClass("minimize");
        $('ul.promoted-articles').addClass("minimize-articles");
        $('.promoted_header').addClass("minimize-header"); 
        $('.promoted-articles-box').removeClass("articles");
	      $('.close').addClass("zd_Hidden");
        $('.promoted_header h4').addClass("zd_Hidden");
        $('#right-arrow').addClass("zd_Hidden");
        $('#left-arrow').addClass("zd_Hidden");
        $('div#promoted-arrow').removeClass("zd_Hidden");
       
    });
  
    $('#promoted-arrow').click(function() {   //This click function is to reopen the announcements   
     
        $('.promoted-articles-box').removeClass("minimize");
        $('ul.promoted-articles').removeClass("minimize-articles");
        $('.promoted_header').removeClass("minimize-header"); 
        $('.promoted-articles-box').addClass("articles");
	      $('.close').removeClass("zd_Hidden");
        $('.promoted_header h4').removeClass("zd_Hidden");
        $('div#promoted-arrow').addClass("zd_Hidden");      
       if (numOfPromos.length > 1) {
        $('#right-arrow').removeClass("zd_Hidden");
        $('#left-arrow').removeClass("zd_Hidden");
      }      
    });
  
if (numOfPromos.length > 0 ) {  
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
 window.plusSlides = function (n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  slides[slideIndex-1].style.display = "block"; 
}
}
/***** End of Promoted Articles *****/  //Amy Ogborn   
/***** FORMS *****/   
//This code is to ensure only Signed in users see the request form if we add class="request"
//end
  
        (function(_w, _d, $){

            $(_d).ready(function(){
                var _locale = window.location.pathname.replace('/', '')
                .replace('?','/').split('/')[1];
                if (HelpCenter.user.role=='end_user') {
                $('.request')
                .html('<a class="submit-a-request" href="/hc/'+
                _locale+'/requests/new">'+
                'Submit a request</a>');
                } else if (HelpCenter.user.role=='anonymous') {
                $('.request')
                .html('<a href="/hc/'+
                _locale+'/signin">'+
                'Submit a request</a>');
            }
            }); 

        }(window, document, jQuery));
// End 
/***** END FORMS *****/ //Amy Ogborn  
/*****  Temp Header *****/ 

        //toggle the hamburger menu
        var button = document.getElementById('nav-main-hamburger');
        var nav = document.getElementById("nav-wrapper");  

        button.onclick =  function() {
              if (!nav.style.display || nav.style.display === "none") {
                        nav.style.display = "block";
                    } else {
                        nav.style.display = "none";
                    }
        };

				//Add the profile icon to the header
        $('<svg width="16" height="16" class="profile-icon"><path d="M2 14h12v-.012c0-.056-.11-.22-.602-.544-.62-.418-1.495-.778-2.613-1.058-1.034-.251-1.963-.374-2.785-.374-.822 0-1.75.123-2.772.371-1.131.283-2.006.643-2.64 1.07-.478.316-.588.48-.588.535V14zm6-3.988c.99 0 2.076.144 3.257.431 1.342.335 2.428.783 3.258 1.341.99.655 1.485 1.39 1.485 2.204V16H0v-2.012c0-.814.495-1.549 1.485-2.204.83-.558 1.916-1.006 3.258-1.34 1.181-.288 2.267-.432 3.257-.432zM8 6c.362 0 .672-.084.969-.26.318-.188.56-.43.747-.747a1.83 1.83 0 00.26-.969 1.96 1.96 0 00-.271-1.013 2.01 2.01 0 00-.736-.751A1.833 1.833 0 008 2a1.83 1.83 0 00-.969.26 2.01 2.01 0 00-.736.751 1.96 1.96 0 00-.271 1.013c0 .362.084.672.26.969.188.318.43.56.747.747.297.176.607.26.969.26zm0 2c-.719 0-1.381-.18-1.988-.539a4.065 4.065 0 01-1.45-1.449 3.832 3.832 0 01-.538-1.988c0-.719.18-1.39.539-2.012A4.008 4.008 0 016.012.539 3.832 3.832 0 018 0c.719 0 1.381.18 1.988.539.607.36 1.09.85 1.45 1.473a3.97 3.97 0 01.538 2.012c0 .719-.18 1.381-.539 1.988a4.065 4.065 0 01-1.449 1.45A3.845 3.845 0 018 8z" fill-rule="evenodd"></path></svg>').prependTo('.user-info > [role="button"]');   

/*****  End Temp Header *****/   // Amy

  /*****  New request pages - product pre-select *****/ 
              function getQueryParams (queryString)
              {
                 queryString = queryString.split ('+').join (' ');

                 var params = {};
                 var tokens;
                 var regex = /[?&]?([^=]+)=([^&]*)/g;

                 while (tokens = regex.exec (queryString))
                 {
                    params[decodeURIComponent (tokens[1])] = decodeURIComponent (tokens[2]);
                 }

                 return params;
              }
                var params = getQueryParams (document.location.search); 
                if (params.product)
                {
                 $("#request_custom_fields_360005150940").val(params.product);
                }
                //hide org & form option
                $('.form-field.request_ticket_form_id').hide();
                $('.form-field.request_organization_id').hide();
  /***** End of New request pages - product pre-select *****/ //Lorna Rickett 
    /***** Temporary hide/show CSS *****/
  $("#option-2").addClass('button');
  $("#option-1").addClass('button');
  $("#option-3").addClass('button');

    /***** Temporary hide/show CSS *****/
  
  
}); // end of document ready function
  /***** Temporary hide/show CSS *****/
function showOption(e, t, n) {    for (i = t; i <= n; i++) i !== e && (document.getElementById("option-" + i).className = "tts-options tts-inactive", document.getElementById("option-" + i + "-content").style.display = "none");    document.getElementById("option-" + e).className = "tts-options tts-active", document.getElementById("option-" + e + "-content").style.display = "block"} 
  

function box_toggle(e) {
    "none" == document.getElementById(e).style.display ? document.getElementById(e).style.display = "block" : document.getElementById(e).style.display = "none"
}

function box_show(a) {
  
    "none" == document.getElementById(a).style.display && (document.getElementById(a).style.display = "block")
}

function box_hide(e) {

    document.getElementById(e).style.display = "none"
}

function kmt_Toggle(e, t, o) {
    var m = document.getElementById(e);
    t.originalInnerHTML || (t.originalInnerHTML = t.innerHTML), "none" != m.style.display ? (m.style.display = "none", t.innerHTML = t.originalInnerHTML) : "none" == m.style.display && (m.style.display = "", t.innerHTML = answer_string[o].close)
}
function kmt_ShowBoxPopup(e, t) {
    var o = document.getElementById(e).innerHTML;
    showBoxPopupWin = window.open("", e, "height=400,width=710,screenX=250,screenY=80, scrollbars=yes"), showBoxPopupWin.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd"><html><head><title>' + e + '</title><link rel="stylesheet" href="http://uk.support.tomtom.com/euf/assets/themes/standard/tomtom_site.css"><script language="JavaScript" type="text/javascript" src="http://uk.support.tomtom.com/euf/assets/js/reset.js"></script></head><body>' + o + "</body</html>"), window.focus && showBoxPopupWin.focus()
}

function kmt_ShowBox(e) {
    if ("block" == document.getElementById(e).style.display) return document.getElementById(e).style.display = "none", !1;
    for (levels = e.match(/_/g), allBoxes = document.getElementsByTagName("div"), i = 0; i < allBoxes.length; i++) allBoxes[i].id.match("BOX") && (document.getElementById(allBoxes[i].id).style.display = "none");
    if (document.getElementById(e).style.display = "block", null == levels) return !1;
    if(e) {for (levels = levels.length + 1, temp = e, i = 0; i < levels; i++) temp = temp.substring(temp, temp.length - 3), temp.length > 2 && (document.getElementById(temp).style.display = "block");}
    return !1
}

function kmt_HideBox(e) {
    return document.getElementById(e).style.display = "none", !1
}
  /***** End temporary hide/show CSS *****/