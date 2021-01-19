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
var communityLink_navigation = document.getElementById('subfooter_link_community_navigation').innerHTML; // Get all the hidden HTML DC hidden in 'footer.hbs'
var communityLink_apps = document.getElementById('subfooter_link_community_apps').innerHTML;
var communityLink_sports = document.getElementById('subfooter_link_community_sports').innerHTML;
var communityLink_accounts = document.getElementById('subfooter_link_community_accounts').innerHTML;
var communityLink_usermanuals = document.getElementById('subfooter_link_community_usermanuals').innerHTML;
var communityLink_learn_more = document.getElementById('subfooter_link_community_learn_more').innerHTML;
if (communityLink) { // If the community link exists then,
	if (the_url.indexOf(naviagtion_category_ID) !== -1) { // if url contains the navigation ID
		communityLink.href = communityLink_navigation; //change HREF to the DC 'subfooter_link_community_navigation'
	} 
	else if (the_url.indexOf(apps_category_ID) !== -1) { // if url contains the apps ID
		communityLink.href = communityLink_apps; //change HREF to the DC 'subfooter_link_community_apps'
	} 
	else if (the_url.indexOf(sports_category_ID) !== -1) { // if url contains the sports ID
		communityLink.href = communityLink_sports; //change HREF to the DC 'subfooter_link_community_sports'
	} 
	else if (the_url.indexOf(accounts_orders_legal_category_ID) !== -1) { // if url contains the accounts ID
		communityLink.href = communityLink_accounts; //change HREF to the DC 'subfooter_link_community_accounts'
	}
	else if (the_url.indexOf(user_manual_release_info_category_ID) !== -1) { // if url contains the user manauls ID
		communityLink.href = communityLink_usermanuals; //change HREF to the DC 'subfooter_link_community_usermanuals'
	}
	else if (the_url.indexOf(learn_more_category_ID) !== -1) { // if url contains the learn more ID
		communityLink.href = communityLink_learn_more; //change HREF to the DC 'subfooter_link_community_learn_more'
	} else {}
}
/******************* End of Change subfooter links if in specific category ************************/
 /******************  Category Pages GA tracking if customer clicks Section in category *********************/
   	        var category_category = "Category"; 
   	        var category_action = "";
     	    var category_event = "";
			var nav_cat_id_string = naviagtion_category_ID.toString();
            var category_anchor = document.getElementsByClassName('section-tree-title');
            var category_see_all_articles = document.getElementsByClassName('see-all-articles');
   $(category_anchor).click(function() {
    var category_link = this.getElementsByTagName("a")[0];
    var category_link_anchor =  category_link.href.toString();
    if (the_url.indexOf(nav_cat_id_string) !== -1) {
        category_action = "Navigation";
          if (category_link_anchor.indexOf(wifi_section_id) !== -1) {
           			category_event = "Wi-Fi"
    	    } else if (category_link_anchor.indexOf(mdc_section_id) !== -1) {
           			category_event = "MyDrive Connect"        
    	    }	else if (category_link_anchor.indexOf(tthome_section_id) !== -1) {
           			category_event = "TomTom HOME"               
    	    } 
    }  else if (the_url.indexOf(sports_category_ID) !== -1) {
        category_action = "Sports";
                if (category_link_anchor.indexOf(sports_watch_section_id) !== -1) {
           			category_event = "Sports Watch"
    	    } else if (category_link_anchor.indexOf(golfer_section_id) !== -1) {
           			category_event = "TomTom Golfer"        
    	    } else if (category_link_anchor.indexOf(tomtom_touch_section_id) !== -1) {
           			category_event = "TomTom Touch"        
    	    } else if (category_link_anchor.indexOf(bandit_section_id) !== -1) {
           			category_event = "TomTom Bandit Action Camera"        
    	    }
    } else if (the_url.indexOf(apps_category_ID) !== -1) {
        category_action = "Apps";   
          if (category_link_anchor.indexOf(amigo_section_id) !== -1) {
           			category_event = "TomTom AmiGO"
    	    } else if (category_link_anchor.indexOf(go_navigation_section_id) !== -1) {
           			category_event = "TomTom GO navigation"        
    	    } else if (category_link_anchor.indexOf(go_mobile_section_id) !== -1) {
           			category_event = "TomTom GO Mobile"        
    	    } else if (category_link_anchor.indexOf(navigation_app_section_id) !== -1) {
           			category_event = "TomTom Navigation App"        
    	    } else if (category_link_anchor.indexOf(curfer_app_section_id) !== -1) {
           			category_event = "TomTom Curfer"        
    	    } 
    } else if (the_url.indexOf(accounts_orders_legal_category_ID) !== -1) {
        category_action = "Accounts";     
          if (category_link_anchor.indexOf(services_section_id) !== -1) {
           			category_event = "Services"
    	    } else if (category_link_anchor.indexOf(legal_privacy_section_id) !== -1) {
           			category_event = "Legal & Privacy"        
    	    } else if (category_link_anchor.indexOf(accounts_section_id) !== -1) {
           			category_event = "Accounts"        
    	    } else if (category_link_anchor.indexOf(orders_section_id) !== -1) {
           			category_event = "Orders"        
    	    }                                                  
    } else if(the_url.indexOf(user_manual_release_info_category_ID) !== -1) {
        category_action = "User Manuals"; 
          if (category_link_anchor.indexOf(release_notes_section_id) !== -1) {
           			category_event = "Release Notes"
    	    } else if (category_link_anchor.indexOf(user_manuals_section_id) !== -1) {
           			category_event = "User Manuals"        
    	    }
    } else if (the_url.indexOf(learn_more_category_ID) !== -1) { 
        category_action = "Learn More";       
          if (category_link_anchor.indexOf(about_section_id) !== -1) {
           			category_event = "About"
    	    } else if (category_link_anchor.indexOf(tips_section_id) !== -1) {
           			category_event = "Tips"        
    	    } else if (category_link_anchor.indexOf(using_your_device_section_id) !== -1) {
           			category_event = "Using your device"        
    	    } else if (category_link_anchor.indexOf(announcements_section_id) !== -1) {
           			category_event = "Announcements"        
    	    }
    } else {
        category_action = "Other"; 
    }  
    ga_tracking(category_category, category_action, category_event);
   });   


   $(category_see_all_articles).click(function() {
    var category_all_link = this.href.toString();;
    if (the_url.indexOf(nav_cat_id_string) !== -1) {
        category_action = "Navigation";
          if (category_all_link.indexOf(wifi_section_id) !== -1) {
           			category_event = "Wi-Fi"
    	    } else if (category_all_link.indexOf(mdc_section_id) !== -1) {
           			category_event = "MyDrive Connect"        
    	    }	else if (category_all_link.indexOf(tthome_section_id) !== -1) {
           			category_event = "TomTom HOME"               
    	    } 
    }  else if (the_url.indexOf(sports_category_ID) !== -1) {
        category_action = "Sports";
                if (category_all_link.indexOf(sports_watch_section_id) !== -1) {
           			category_event = "Sports Watch"
    	    } else if (category_all_link.indexOf(golfer_section_id) !== -1) {
           			category_event = "TomTom Golfer"        
    	    } else if (category_all_link.indexOf(tomtom_touch_section_id) !== -1) {
           			category_event = "TomTom Touch"        
    	    } else if (category_all_link.indexOf(bandit_section_id) !== -1) {
           			category_event = "TomTom Bandit Action Camera"        
    	    }
    } else if (the_url.indexOf(apps_category_ID) !== -1) {
        category_action = "Apps";   
          if (category_all_link.indexOf(amigo_section_id) !== -1) {
           			category_event = "TomTom AmiGO"
    	    } else if (category_all_link.indexOf(go_navigation_section_id) !== -1) {
           			category_event = "TomTom GO navigation"        
    	    } else if (category_all_link.indexOf(go_mobile_section_id) !== -1) {
           			category_event = "TomTom GO Mobile"        
    	    } else if (category_all_link.indexOf(navigation_app_section_id) !== -1) {
           			category_event = "TomTom Navigation App"        
    	    } else if (category_all_link.indexOf(curfer_app_section_id) !== -1) {
           			category_event = "TomTom Curfer"        
    	    } 
    } else if (the_url.indexOf(accounts_orders_legal_category_ID) !== -1) {
        category_action = "Accounts";     
          if (category_all_link.indexOf(services_section_id) !== -1) {
           			category_event = "Services"
    	    } else if (category_all_link.indexOf(legal_privacy_section_id) !== -1) {
           			category_event = "Legal & Privacy"        
    	    } else if (category_all_link.indexOf(accounts_section_id) !== -1) {
           			category_event = "Accounts"        
    	    } else if (category_all_link.indexOf(orders_section_id) !== -1) {
           			category_event = "Orders"        
    	    }                                                  
    } else if(the_url.indexOf(user_manual_release_info_category_ID) !== -1) {
        category_action = "User Manuals"; 
          if (category_all_link.indexOf(release_notes_section_id) !== -1) {
           			category_event = "Release Notes"
    	    } else if (category_all_link.indexOf(user_manuals_section_id) !== -1) {
           			category_event = "User Manuals"        
    	    }
    } else if (the_url.indexOf(learn_more_category_ID) !== -1) { 
        category_action = "Learn More";       
          if (category_all_link.indexOf(about_section_id) !== -1) {
           			category_event = "About"
    	    } else if (category_all_link.indexOf(tips_section_id) !== -1) {
           			category_event = "Tips"        
    	    } else if (category_all_link.indexOf(using_your_device_section_id) !== -1) {
           			category_event = "Using your device"        
    	    } else if (category_all_link.indexOf(announcements_section_id) !== -1) {
           			category_event = "Announcements"        
    	    }
    } else {
        category_action = "Other"; 
    }  
    ga_tracking(category_category, category_action, category_event);
   });

/****************** End GA tracking if customer clicks Section in category ********************/      