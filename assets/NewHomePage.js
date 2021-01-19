 var user_manual_release_info_ID = mapObject.user_manual_release_info_category_ID[searchKey];
 var naviagtion_ID = mapObject.naviagtion_category_ID[searchKey];
 var apps_ID = mapObject.apps_category_ID[searchKey];
 var sports_ID = mapObject.sports_category_ID[searchKey];
 var accounts_orders_legal_ID = mapObject.accounts_orders_legal_category_ID[searchKey];
 var learn_more_ID = mapObject.learn_more_category_ID[searchKey];


 function insertSubTitle() {

    //for new home page 

    var user_manual_subTitle = document.getElementById("sub-title-" + user_manual_release_info_ID);
    var navigation_subTitle = document.getElementById("sub-title-" + naviagtion_ID);
    var apps_subTitle = document.getElementById("sub-title-" + apps_ID);
    var sports_subTitle = document.getElementById("sub-title-" + sports_ID);
    var accounts_subTitle = document.getElementById("sub-title-" + accounts_orders_legal_ID);
    var learnMore_subTitle = document.getElementById("sub-title-" + learn_more_ID);


    var user_manual_Text = document.getElementById("home_category_sub_title_manual");
    var navigation_Text = document.getElementById("home_category_sub_title_nav");
    var apps_Text = document.getElementById("home_category_sub_title_apps");
    var sports_Text = document.getElementById("home_category_sub_title_sport");
    var accounts_Text = document.getElementById("home_category_sub_title_account");
    var learnMore_Text = document.getElementById("home_category_sub_title_other");

    var user_manual_cta = document.getElementById("explore_" + user_manual_release_info_ID); // Get CTA for the category
    var navigation_cta = document.getElementById("explore_" + naviagtion_ID); // Get CTA for the category
    var apps_cta = document.getElementById("explore_" + apps_ID); // Get CTA for the category
    var sports_cta = document.getElementById("explore_" + sports_ID); // Get CTA for the category
    var accounts_cta = document.getElementById("explore_" + accounts_orders_legal_ID); // Get CTA for the category
    var learnMore_cta = document.getElementById("explore_" + learn_more_ID); // Get CTA for the category

    var user_manual_cta_text = document.getElementById("home_category_cta_manual"); // Get text from DC for the CTA
    var navigation_cta_text = document.getElementById("home_category_cta_nav"); // Get text from DC for the CTA
    var apps_cta_text = document.getElementById("home_category_cta_apps"); // Get text from DC for the CTA
    var sports_cta_text = document.getElementById("home_category_cta_sports"); // Get text from DC for the CTA
    var accounts_cta_text = document.getElementById("home_category_cta_account"); // Get text from DC for the CTA
    var learnMore_cta_text = document.getElementById("home_category_cta_other"); // Get text from DC for the CTA

    if ((user_manual_subTitle != null) && (user_manual_Text != null)) {
        user_manual_subTitle.innerHTML = user_manual_Text.innerHTML;
        user_manual_cta.innerHTML = user_manual_cta_text.innerHTML;  // Put text from DC for the into CTA
    }
    if ((navigation_subTitle != null) && (navigation_Text != null)) {
        navigation_subTitle.innerHTML = navigation_Text.innerHTML;
        navigation_cta.innerHTML = navigation_cta_text.innerHTML; // Put text from DC for the into CTA
    }
    if ((apps_subTitle != null) && (apps_Text != null)) {
        apps_subTitle.innerHTML = apps_Text.innerHTML;
        apps_cta.innerHTML = apps_cta_text.innerHTML; // Put text from DC for the into CTA
    }
    if ((sports_subTitle != null) && (sports_Text != null)) {
        sports_subTitle.innerHTML = sports_Text.innerHTML;
        sports_cta.innerHTML = sports_cta_text.innerHTML; // Put text from DC for the into CTA
    }
    if ((accounts_subTitle != null) && (accounts_Text != null)) {
        accounts_subTitle.innerHTML = accounts_Text.innerHTML;
        accounts_cta.innerHTML = accounts_cta_text.innerHTML; // Put text from DC for the into CTA
    }
    if ((learnMore_subTitle != null) && (learnMore_Text != null)) {
        learnMore_subTitle.innerHTML = learnMore_Text.innerHTML;
        learnMore_cta.innerHTML = learnMore_cta_text.innerHTML; // Put text from DC for the into CTA
    }
    //for new home page 
}

insertSubTitle();



 function insertCategoryTitleColor() {
     var user_manual_CategoryTitle = document.getElementById("blocks_item_title_" + user_manual_release_info_ID);
     var navigation_CategoryTitle = document.getElementById("blocks_item_title_" + naviagtion_ID);
     var apps_CategoryTitle = document.getElementById("blocks_item_title_" + apps_ID);
     var sports_CategoryTitle = document.getElementById("blocks_item_title_" + sports_ID);
     var accounts_CategoryTitle = document.getElementById("blocks_item_title_" + accounts_orders_legal_ID);
     var learnMore_CategoryTitle = document.getElementById("blocks_item_title_" + learn_more_ID);
     if (user_manual_CategoryTitle != null) {
         user_manual_CategoryTitle.style.backgroundColor = "#E94743";
     }
     if (navigation_CategoryTitle != null) {
         navigation_CategoryTitle.style.backgroundColor = "#61ADE0";
     }
     if (apps_CategoryTitle != null) {
         apps_CategoryTitle.style.backgroundColor = "#008D8D";
     }
     if (sports_CategoryTitle != null) {
         sports_CategoryTitle.style.backgroundColor = "#EC619F";
     }
     if (accounts_CategoryTitle != null) {
         accounts_CategoryTitle.style.backgroundColor = "#F9B023";
     }
     if (learnMore_CategoryTitle != null) {
         learnMore_CategoryTitle.style.backgroundColor = "#004B7F";
     }
 }


 insertCategoryTitleColor();

 function insertImages(assetsGuidesDesktop, assetsNavigationDesktop, assetsAppsDesktop, assetsOrdersDesktop, assetsSportsDesktop, assetsOthersDesktop) {



     var user_manual_category = document.getElementById("blocks-item-" + user_manual_release_info_ID);
     var navigation_category = document.getElementById("blocks-item-" + naviagtion_ID);
     var apps_category = document.getElementById("blocks-item-" + apps_ID);
     var sports_category = document.getElementById("blocks-item-" + sports_ID);
     var accounts_category = document.getElementById("blocks-item-" + accounts_orders_legal_ID);
     var learnMore_category = document.getElementById("blocks-item-" + learn_more_ID);

     if (user_manual_category != null) {
         var imageURL = "https:" + assetsGuidesDesktop;
         user_manual_category.style.backgroundImage = "url('" + imageURL + "')";
     }

     if (navigation_category != null) {
         var imageURL = "https:" + assetsNavigationDesktop;
         navigation_category.style.backgroundImage = "url('" + imageURL + "')";
     }
     if (apps_category != null) {
         var imageURL = "https:" + assetsAppsDesktop;
         apps_category.style.backgroundImage = "url('" + imageURL + "')";
     }
     if (sports_category != null) {
         var imageURL = "https:" + assetsSportsDesktop;
         sports_category.style.backgroundImage = "url('" + imageURL + "')";
     }
     if (accounts_category != null) {
         var imageURL = "https:" + assetsOrdersDesktop;
         accounts_category.style.backgroundImage = "url('" + imageURL + "')";
     }
     if (learnMore_category != null) {
         var imageURL = "https:" + assetsOthersDesktop;
         learnMore_category.style.backgroundImage = "url('" + imageURL + "')";
     }


 }

 if (navigator.userAgent.indexOf('Windows') != -1) {
     $('.explore').addClass("explore_WINDOWS");
 }
  /****************** GA tracking if customer clicks on category ********************/
  var homepage_category = document.getElementsByClassName("home_page_category");
  var homepage_category_category = "Home Page"; 
  var homepage_category_action = "Category";
 
  var user_manual_category = document.getElementById("blocks-item-" + user_manual_release_info_ID);
  var user_manual_category_ids = user_manual_category.id;
  var navigation_category = document.getElementById("blocks-item-" + naviagtion_ID);
  var naviagtion_category_ids = navigation_category.id;
  var apps_category = document.getElementById("blocks-item-" + apps_ID);
  var apps_category_ids = apps_category.id;
  var sports_category = document.getElementById("blocks-item-" + sports_ID);
  var sports_category_ids = sports_category.id;
  var accounts_category = document.getElementById("blocks-item-" + accounts_orders_legal_ID);
  var accounts_category_ids = accounts_category.id;
  var learnMore_category = document.getElementById("blocks-item-" + learn_more_ID);
  var learnMore_category_ids = learnMore_category.id;
 
  var homepage_category_event = "";
    $(homepage_category).click(function() {
     var category_link = this.id;
     if (category_link == user_manual_category_ids) {
         homepage_category_event = "User Manual";       
     }  else if (category_link == naviagtion_category_ids) {
         homepage_category_event = "Navigation";   
     } else if (category_link == apps_category_ids) {
         homepage_category_event = "Apps";   
     } else if (category_link == sports_category_ids) {
         homepage_category_event = "Sports"; 
     } else if (category_link == accounts_category_ids) {
         homepage_category_event = "Accounts"; 
     }else if (category_link == learnMore_category_ids) {
         homepage_category_event = "Learn More"; 
     } else {
         homepage_category_event = "Other"; 
     }  
     ga_tracking(homepage_category_category, homepage_category_action, homepage_category_event);
    });             
 /****************** End GA tracking if customer clicks on category *********************/  