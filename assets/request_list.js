/*************************** Repair page or requests page ********************************/
   var api_server_url = mapObject.proxy_api_server[searchKey];
   
   /***************************  Cookies Functions ***************************/
    //general cookie functions
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
        if (time == 0) {
            document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; ';
        } else {
            var CookieDate = new Date();
            var today = new Date();
            CookieDate.setTime(today.getTime() + time);
            document.cookie = name + '=' + value + ';domain=.tomtom.com; path=/; expires=' + CookieDate.toGMTString() + ';';
        }
    };

    ////SSO cookie 
    //this function is creating a function cookie called "sso" to remember user current URL
    // read_cookie() and set_cookie() function is pre created. 
    function createSSOcookie() {
        if (read_cookie("sso") === "") {
            var current_url = window.location.href;
            var encode_current_url = encodeURIComponent(current_url);
            set_cookie("sso", encode_current_url, 0);
            //setCookie, 3rd parameter is 0 means no expire time, this is a function cookie
        }
    };

    //this function remove "sso" cookie by passing cookie name "sso" through parametre 
    function removeCookie(name) {
        if ((read_cookie("sso") != "")) {
            set_cookie(name, '', -1);
        }
    };


   //move this function to the requests.hbs
   var lastPart = the_url.substr(the_url.lastIndexOf('/') + 1);
   if ((lastPart === "requests") || (lastPart === "requests#repairs")) { // if the end of the url is requests  
       var submit_btn_form = document.getElementById("new_request");
       if (submit_btn_form == null) {
           // in side this if statement means not a request page after form failed submission
           var requestsPage = document.getElementById("requests");
           var repairsPage = document.getElementById("repairs");
           repairsPage.classList.add("zd_Hidden");
           var current = document.getElementsByClassName("current")[0];
           var repairsHeader = document.getElementById('repairs_header');
           var requestsHeader = document.getElementById('requests_header');

           repairsHeader.onclick = function() {
               if (!repairsPage.style.display || repairsPage.style.display === "none") {
                   repairsPage.classList.remove("zd_Hidden");
                   requestsPage.classList.add("zd_Hidden");
                   repairsHeader.classList.add("current");
                   requestsHeader.classList.remove("current");
               }
           };
           if (the_url.indexOf("/requests#repairs") != -1) {
               repairsPage.classList.remove("zd_Hidden");
               requestsPage.classList.add("zd_Hidden");
               repairsHeader.classList.add("current");
               requestsHeader.classList.remove("current");
           }
       }


   } // end if the end of the url is requests  

$(document).ready(function(){ 
    //Code for BuRMA SSO cookie creation - Start 
    var server_url = api_server_url+'zenApi/src/repairController.php';
    
    if (read_cookie("tt_cp_auth") === "" && HelpCenter.user.email != null){
      $.ajax({
        url : server_url,
        type : 'POST',
        dataType:'JSON',
        data : { ce_check: HelpCenter.user.email},
        success : function(response) {
          set_cookie("tt_cp_auth",response.encryptemail,3600000);
        }
      });
    }
  //Code for BuRMA SSO cookie creation - End // Asmita
    ///BuRMA call setup          
    ////get current user 
    var current_user = HelpCenter.user.email;
	var server_url = api_server_url+'zenApi/src/repairController.php';
    
  /* ********
  	** if seller clicks on RMA number in iframe - will redirect to same page with RMA number in URL
  	** take RMA from URL and call following function
  	******** */
  	if (the_url.indexOf("?")!= -1) {
      all_variables = the_url.split('?');
      rma_id = all_variables['1'];
      apiendpoint = "rma/details/"+rma_id+"/";
      getAPIresponse(apiendpoint, current_user, 'getrmadetails');
  	}
  
    apiendpoint = "contact/type/";
  	///// call api for getting user type ///// 
    getAPIresponse(apiendpoint, current_user, 'getusertype');

    function successCallBack(data){
    	///If API is for checking user type///
     	if(data.requesttype == 'getusertype') {
        contacttype = data.result.type;
        if(contacttype == 3) {	////if user is BuRMA, show ifrmae
           $('#tt_burma').attr('src', data.burmaLocaleUrl);
           $('#cs_BURMA_Frame').show();
        } else {
           apiendpoint = "rma/list/"+current_user;
           getAPIresponse(apiendpoint, current_user, 'getrmalist');
        }
     	} else if(data.requesttype == 'getrmalist') {
  			var rmalist = data.result;
        $.each(rmalist, function(index, value){          
          if(!isNaN(index)) {
            var requestStatusTtitle = getRequestStatus(value.statusName);
            $("#MyRepair_List").find("tbody").append("<tr><td class='MyRepairDetails' id='"+value.rmaID+"' >"+value.product+"</td><td>"+value.datecreated+"</td><td class='requests-table-status'><span class='rma_status'>"+requestStatusTtitle+"</span></td></tr>"); 
            if(value.statusName == "repairs_request_status_05") {
							if(value.type == "DER" || value.type == "OOW") {
								$(".rma_status").find(".BUF").hide();
              } else if(value.type == "BUF") {
								$(".rma_status").find(".DER").hide();
              }
            } else if (value.statusName == "repairs_request_status_07") {
							if(value.type == "DER" || value.type == "OOW") {
								$(".rma_status").find(".BUF").hide();
              } else if(value.type == "BUF") {
								$(".rma_status").find(".DER").hide();
              }
            }
          }                   
        });
  			$("#cs_MyRepair_List").show();                                      
   		}  else {  
  			requestDetails = data.result;
        $('#cs_MyRepair_Details').show();
        $("#request_name").html("<b>"+requestDetails.request+"</b>");
        $("#date_created").html(requestDetails.datecreated);
        $("#date_updated").html(requestDetails.dateupdated);
        var requestStatusTtitle = getRequestStatus(requestDetails.requeststatusname);
        $("#current_status").html(requestStatusTtitle);
        if(requestDetails.requeststatusname == "repairs_request_status_05") {
          if(requestDetails.rmatype == "DER" || requestDetails.rmatype == "OOW") {
            $("#current_status").find(".BUF").hide();
          } else if(requestDetails.rmatype == "BUF") {
            $("#current_status").find(".DER").hide();
          }
        } else if (requestDetails.requeststatusname == "repairs_request_status_07") {
          if(requestDetails.rmatype == "DER" || requestDetails.rmatype == "OOW") {
            $(".current_status").find(".BUF").hide();
          } else if(requestDetails.rmatype == "BUF") {
            $(".current_status").find(".DER").hide();
          }
        }
        $("#customer").html(requestDetails.customer);
        $("#ship_address").html(requestDetails.address);
        $("#phone_number").html(requestDetails.phonenumber);
    			if(typeof requestDetails.inbound_shipments != "undefined") {
  				$("#print-shipping-label").attr('attr-data', requestDetails.inbound_shipments);
  				$("#print-shipping-label").show();
  			} else {
  				$("#print-shipping-label").hide();
  			}
  			if(typeof requestDetails.outbound_shipments != "undefined")
        	$("#outbound_shipments").html(requestDetails.outbound_shipments);
		    $('html,body').animate({
        scrollTop: $(".repairs_details_container").offset().top},
        'slow');                            
      }
  	}  
  
   	$(document.body).on('click', '.MyRepairDetails' ,function(){
        rma_id = $(this)[0].id;
        apiendpoint = "rma/details/"+rma_id+"/";
        getAPIresponse(apiendpoint, current_user, 'getrmadetails');
    });  
   $(document.body).on('click', '#print-shipping-label' ,function(){
        apiendpoint = $(this).attr("attr-data");
        burma_url = server_url;
      	requesttype = 'getshippinglabel';
        $.ajax({
            url : burma_url, 
            type : 'POST',
            dataType:'image/gif',
            data : { e_valid: current_user, r_type: requesttype, e_point: apiendpoint},
            success : successCallBack,
            error : function(request,error)
            {
              console.log('error : '+request);
              // convert to Base64
              //var b64Response = btoa(request.responseText);
              var b64Response = request.responseText; 

              // create an image
              var outputImg = document.createElement('img');
              outputImg.src = 'data:image/gif;base64,'+b64Response;

              // append it to your page
              $("#shipping_label").empty();
              $("#shipping_label").append(outputImg);
              //$("#shipping_label img").css({'transform': 'rotate(+90deg)'});
            }
        });
        //getAPIresponse(apiendpoint, current_user, 'getshippinglabel');
    });
  
  	function getRequestStatus(requestStatus) {
  		var rstatus = ''; 
  		switch (requestStatus) {
        case "repairs_request_status_01":
          rstatus = $("#repairs_request_status_01").html();
                         
          break;
        case "repairs_request_status_04":
          rstatus = $("#repairs_request_status_04").html();
                           
          break;
        case "repairs_request_status_05":
          rstatus = $("#repairs_request_status_05").html();

          break;
        case "repairs_request_status_06":
          rstatus = $("#repairs_request_status_06").html();
                       
          break;
        case "repairs_request_status_07":
          rstatus = $("#repairs_request_status_09").text();
   
          break;
        case "repairs_request_status_10":
          rstatus = $("#repairs_request_status_10").html();

          break;
        case "repairs_request_status_11":
          rstatus = $("#repairs_request_status_11").html();

          break;
  			case "repairs_request_status_12":
          rstatus = $("#repairs_request_status_12").html();

  				break;
  			case "repairs_request_status_17":
          rstatus = $("#repairs_request_status_17").html();

  				break;
  			case "repairs_request_status_18":
          rstatus = $("#repairs_request_status_18").html();

  				break;
  			case "repairs_request_status_20":
          rstatus = $("#repairs_request_status_20").html();
                        
  				break;
  			case "repairs_request_status_21":
          rstatus = $("#repairs_request_status_21").html();
                       
  				break;
      }
			return rstatus;
  	}	
        
		/* Function for all API calls */
    function getAPIresponse(apiendpoint, curruseremail, requesttype) {
			burma_url = server_url;
      $.ajax({
          url : burma_url, 
          type : 'POST',
          dataType:'JSON',
  				data : { e_valid: curruseremail, r_type: requesttype, e_point: apiendpoint},
          success : successCallBack
      });
    }
});
       /*************************** End Repair page or requests page ********************************/