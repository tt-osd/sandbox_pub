# FROZEN
this is the back up of DDA Zendesk theme

here are the set ups to be aware of when working with front end themes


In general, No Script functions are suggested to be written on templates, some exceptions such as $.loadScript function which is defined in template(header.hbs), it allows other functions to be called on templates, this function is accessable from all tamplates besides document_head.
    
only and always only write functions will be executed on all pages in Script.js or load the separated JS function on header/footer templates, depends on situation, but in general footer is the preference, becasue the less code on header, the better SEO performance we get.

    Global functions and variables are made for easy use, so far the following global functions and vars can be accessed on all templates besides Script.JS and document_head, if a functions needs to access global assets on header/footer, it is better to be plcaed at the end of code block on header/footer template.

    Global functions, besides the $.loadScript function, currenty google Analytics tracking function ga_tracking() is global. cookie related functions such as read_cookie() will be global in the future release.

    ############this is how function ga_tracking() being inserted on header and called ###################################
    <label class="zd_Hidden" id="Google_Analytics_Tracking_FC">{{asset 'Google_Analytics_Tracking.js'}}</label>
    $.loadScript('https:'+document.getElementById("Google_Analytics_Tracking_FC").innerHTML);
    ######################################################################################################################

    furthermore, function load_style(); is another global function, the detail can be round few paragraphs below. 
    ############this is how function load_style() being inserted on header and called ###################################
    <label class="zd_Hidden" id="load_style">{{asset 'load_style.js'}}</label>
    <script>
    $.loadScript('https:' + document.getElementById("load_style").innerHTML, function () {
      var homePage_Css = $("#HomePage_css").html();
      load_style(homePage_Css);
    });</script>
    ######################################################################################################################

    Global variable,
    1.    var the_url= window.location.href; // this variable contains the data of current page url, placed on header
          in many cases, we need url to let functions behave different on sandbox/ prod or different pages, if a function is being loaded on template, this the_url can be directly called or passing through parametere
    2.    var mapObject = JSON.parse(readMap(mapSrc)); // this variable contains Map object for all the ids and etc for sandbox and production, placed on header
          mapObject is being generated by a function on header called readMap(), you dont need to use or understand this fucntion, mapObject is ready for use. 
          to get value from mapObject you need an extra global var called searchKey. see 3.
          How to use mapObject, please check below release note on 12th Novermber 2020, Thursday. 
    3. searchKey, this is the variable which contains either the keyword "supportsandbox" or "help" which means sandbox or production, this search key so far being used together with mapObject, to fetch a value for sandbox or production, the usage may look like this: var golf_form_id = mapObject.golf_form_ID[searchKey];

   
    
how to load CSS, JS functions, some actually examples can be found here is documentation

for loading functions, see more at https://confluence.tomtomgroup.com/display/CCWEBDEV/Ticket+Forms
in this documentation about request forms, in section "Help site forms", you could read the actual example of how the separated JS file is injected into template, and how is it to be load on page. 

for loading css, see more at https://confluence.tomtomgroup.com/display/CCWEBDEV/Home+Page+on+help.tomtom.com
in this documentation about branded home page design, in section "Update 14th December 2020", you could read the actual example of how to load the separate style file on page, will be using the same logic of loading script, but with an extra function, load_style(); which this function is injected on header which allows it can be accessed globally, and pass the url of css file into function as parameter, viola, your style is being loaded on page.


Dynamic content, dynamic content can be directly used on template, but not in separated JS,or in Script.JS file, but we have a solution for this, just like how we use assest files. 

for example, bongo header is a dynamic content, here is how it being injected one page.
<label id="bongo_init_headertext" class="zd_Hidden">{{dc 'bongo_init_headertext'}}</label>

and here is how it being used 
var bongo_init_headertext = document.getElementById("bongo_init_headertext").innerHTML;
in this way, the content of this dynamic content is being picked up.
to see more examples, here is a documentation of bongo SDK, https://confluence.tomtomgroup.com/display/CCWEBDEV/ODA+Web+SDK+Implementation


asset can not be used in separated JS, css, zendesk does not support this usage, and we do not have a requirement on this yet, so no solutions of course. 

# Release Notes
### 2020
## 1. 12th November Thursday 2020. 
Release of improved zendesk widget
In this release, zendesk widget configuration is being written in one_widget.JS and the script is loaded on header after all the dynamic content for bongo and zendesk widget, and in the same <sctipt> tag after the creating of "ze-snippet", the code can be found on header, around line 88,89

This release organised all the zendesk widget configuration in one file, in order, works together with the interactiong of bongo and bongo+ widget combo. 

In one_widget.js files, it clearifies the useage and advantages of new way of using Map. (see inline documenting), also only one waitFroZen funtion is needed for all the zendesk widget configuration.

After this release, the confluence documentation for zendesk widget will be update. 

### 2021 
## 1. 14/01/2021
    disable snowing JS, commented out asset injection, loading Script function and <div> place holder on header.hbs (at the end of file), keep snow.js in assets directory, in  case for future reuse. 
## 2. 19/01/2021
- Added DC for copyright to make it editable without release | *footer.hbs*
- Added seperate DC for the community link in Sub-footer (inline documented) | *footer.hbs, categories.js, sections.js*
- Added seperate DC for the CTA in home page (inline documented) | *homepage.hbs, NewHomePage,js*
## 3. 21/01/2021
Release strap form
 - Automated form for EMEA
   - Create DEL for IW
   - Ask for PAS for OOW
     - Yes : create PAS 
	 - NO : Do nothing
   - If PAS or DEL fails with validation : notifty user with DC message
 - Normal form for other locales
## 4. 20/01/2021
Released the updated Exit Survey Question and answers
## 5. 04/02/2021
Changed in script.js
	- variable for vanilla SSO from map file to get correct value
## 6. 11/02/2021
Accounts Form, not redirecting on ticket forms if cust is not logged in and remapping for the new lang-log structure and chat routing
- Added an 'else' part to ticket forms to display information if the customer is not logged in | *new_request_page.hbs*
- Added an 'if else' to the bottom of forms.js to include if the customer has selected the accounts form | *forms.js*
- Added the new lnag-locs and the account forms IDs in the mapping file | *mappublic.json*
## 7. 16/02/2021
Improvements for Strap release
 - Added new DC strap_page_eol_prefix_alert  : notify user if serial prefix is EOL
 - Updated DC strap_form_rma_failuer_alert 
 ## 8. 16/02/2021
 - Change bongo "next card" color from blue to gray 
  ## 9. 18/02/2021
 - Made the images on the homepage clickable | *home_page.hbs*
 ## 10. 04/03/2021
 - Updated locale footer to new lang locs | *footer.hbs*
 - Minimize home page | *NewHomePage.js* + *style.css*
 ## 11. 04/03/2021
 - update bot setting to make sure hidden user messaged send when Bot is connected | *bot_setting.js*
 ## 12. 09/03/2021
 - update category css and add sports connect download block | *sports_category.hbs*, *style.css*
 ## 13. 11/03/2021
 - Bongo on update FAQ | *assets/Bongo-circular-image.jpg* *assets/bot_settings.js* *assets/pnd-gray-image.jpg* *style.css* *templates/article_pages/Content.hbs* *templates/header.hbs*
 - RMA form (not available for end user yet) | *templates/new_request_page.hbs*, *style.css*, *assets/mappublic.json*, *assets/forms.js*
 - Custom dimension for 'Page category detail' added | *tealium.js*  
 -  Added Sports Connect download block, changed layout and colours | *sports_category.hbs*, *style.css* 


