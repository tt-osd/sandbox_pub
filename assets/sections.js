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
var naviagtion_category_ID = mapObject.naviagtion_category_ID[searchKey];
var apps_category_ID = mapObject.apps_category_ID[searchKey];
var sports_category_ID = mapObject.sports_category_ID[searchKey];
var accounts_orders_legal_category_ID = mapObject.accounts_orders_legal_category_ID[searchKey];
var user_manual_release_info_category_ID = mapObject.user_manual_release_info_category_ID[searchKey];
var learn_more_category_ID = mapObject.learn_more_category_ID[searchKey];
/******************* Change subfooter links if in specific category ************************/
var communityLink = document.getElementById('subfooter_link_community'); // Get the subfooter community link
var communityLink_sports = document.getElementById('subfooter_link_community_sports').innerHTML; // Get all the hidden HTML DC hidden in 'footer.hbs'
var communityLink_myDriveConnect = document.getElementById('subfooter_link_community_myDiveConnect').innerHTML;
var communityLink_ttHome = document.getElementById('subfooter_link_community_TT_Home').innerHTML;
var communityLink_wifi = document.getElementById('subfooter_link_community_wifi').innerHTML;
var communityLink_aimgo = document.getElementById('subfooter_link_community_amigo').innerHTML;
var communityLink_go_nav = document.getElementById('subfooter_link_community_go_nav').innerHTML;
var communityLink_go_mobile = document.getElementById('subfooter_link_community_go_mobile').innerHTML;
var communityLink_navigation_app = document.getElementById('subfooter_link_community_navigation_app').innerHTML;
var communityLink_curfer = document.getElementById('subfooter_link_community_curfer').innerHTML;
var communityLink_golfer = document.getElementById('subfooter_link_community_golfer').innerHTML;
var communityLink_touch = document.getElementById('subfooter_link_community_touch').innerHTML;
var communityLink_bandit = document.getElementById('subfooter_link_community_bandit').innerHTML;
var communityLink_using_device = document.getElementById('subfooter_link_community_using_device').innerHTML;
var communityLink_services = document.getElementById('subfooter_link_community_services').innerHTML;

if (communityLink) { // if the community link on the subfooter exists 
	if (the_url.indexOf(wifi_section_id) !== -1) { // and the ID matches the URL id 
        communityLink.href = communityLink_wifi; // change href to the DC matching the ID in the footer.hbs file
       } else if (the_url.indexOf(mdc_section_id) !== -1) {
        communityLink.href = communityLink_myDriveConnect;
       } else if (the_url.indexOf(tthome_section_id) !== -1) {
        communityLink.href = communityLink_ttHome;
       } else if (the_url.indexOf(amigo_section_id) !== -1) {
        communityLink.href = communityLink_aimgo;                                                 
       } else if(the_url.indexOf(go_navigation_section_id) !== -1) {
        communityLink.href = communityLink_go_nav;  
       } else if (the_url.indexOf(go_mobile_section_id) !== -1) { 
        communityLink.href = communityLink_go_mobile; 
       } else if (the_url.indexOf(navigation_app_section_id) !== -1) { 
        communityLink.href = communityLink_navigation_app; 
       } else if (the_url.indexOf(curfer_app_section_id) !== -1) { 
        communityLink.href = communityLink_curfer; 
       } else if (the_url.indexOf(sports_watch_section_id) !== -1) { 
        communityLink.href = communityLink_sports; 
       } else if (the_url.indexOf(golfer_section_id) !== -1) { 
        communityLink.href = communityLink_golfer; 
       } else if (the_url.indexOf(tomtom_touch_section_id) !== -1) { 
        communityLink.href = communityLink_touch; 
       } else if (the_url.indexOf(bandit_section_id) !== -1) { 
        communityLink.href = communityLink_bandit; 
       } else if (the_url.indexOf(using_your_device_section_id) !== -1) { 
        communityLink.href = communityLink_using_device; 
       } else if (the_url.indexOf(tips_section_id) !== -1) { 
        communityLink.href = communityLink_using_device; 
       } else if (the_url.indexOf(tips_section_id) !== -1) { 
        communityLink.href = communityLink_services; 
       } else {
        }
}
/******************* End of Change subfooter links if in specific category ************************/
/******************  Section Pages GA tracking if customer clicks Section in category *********************/
        var section_category = "Section"; 
        var section_action = "";
        var section_event = "";
        var section_anchor = document.getElementsByClassName('article-list-link');      
                $(section_anchor).click(function() {
                section_event = this.innerHTML; 
                        if (the_url.indexOf(wifi_section_id) !== -1) {
                         section_action = "W-Fi";
                        }  else if (the_url.indexOf(mdc_section_id) !== -1) {
                          section_action = "MyDrive Connect";
                        } else if (the_url.indexOf(tthome_section_id) !== -1) {
                           section_action = "TomTom Home"; 
                        } else if (the_url.indexOf(amigo_section_id) !== -1) {
                            section_action = "TomTom Amigo";                                                  
                        } else if(the_url.indexOf(go_navigation_section_id) !== -1) {
                           section_action = "Go Navigation"; 
                        } else if (the_url.indexOf(go_mobile_section_id) !== -1) { 
                            section_action = "Go Mobile";    
                        } else if (the_url.indexOf(navigation_app_section_id) !== -1) { 
                            section_action = "Go Navigation";    
                        } else if (the_url.indexOf(curfer_app_section_id) !== -1) { 
                            section_action = "Curfer";    
                        } else if (the_url.indexOf(sports_watch_section_id) !== -1) { 
                            section_action = "Sports Watch";    
                        } else if (the_url.indexOf(golfer_section_id) !== -1) { 
                            section_action = "TomTom Golfer";    
                        } else if (the_url.indexOf(tomtom_touch_section_id) !== -1) { 
                          section_action = "TomTom Touch";    
                        } else if (the_url.indexOf(bandit_section_id) !== -1) { 
                            section_action = "Bandit";    
                        } else if (the_url.indexOf(services_section_id) !== -1) { 
                            section_action = "Services";    
                        } else if (the_url.indexOf(legal_privacy_section_id) !== -1) { 
                            section_action = "Legal & Privacy";    
                        } else if (the_url.indexOf(accounts_section_id) !== -1) { 
                            section_action = "Accounts";    
                        } else if (the_url.indexOf(orders_section_id) !== -1) { 
                            section_action = "Orders";    
                        } else if (the_url.indexOf(release_notes_section_id) !== -1) { 
                            section_action = "Release Notes";    
                        } else if (the_url.indexOf(user_manuals_section_id) !== -1) { 
                            section_action = "User Manuals";    
                        } else if (the_url.indexOf(using_your_device_section_id) !== -1) { 
                            section_action = "Using your device";    
                        } else if (the_url.indexOf(tips_section_id) !== -1) { 
                            section_action = "Tips";    
                        } else if (the_url.indexOf(about_section_id) !== -1) { 
                            section_action = "About";    
                        } else if (the_url.indexOf(announcements_section_id) !== -1) { 
                            section_action = "Announcements";    
                        } else {
                            section_action = "Other"; 
                        }  
                                ga_tracking(section_category, section_action, section_event);
                });             
/****************** End GA tracking if customer clicks Section in category ********************/     
/****************** Show the golf form if on the golf page ********************/         
if (window.location.href.indexOf(golfer_section_id) > -1) {
   var golf_form_block = document.getElementById("golf_form_block");
   if (golf_form_block != null) {
    golf_form_block.style.display = "flex"; 
   } 
}
/****************** Show the golf form if on the golf page ********************/     