var api_server_url = mapObject.proxy_api_server[searchKey];

////strap page create RMA and update ticket  - Asmita////
    function successCallBack(data){
		////for RMA callback
  		if(data.status == "oow") {
  			$("#oow_serial").removeClass("zd_Hidden");
			$("#oow_serial").show();
			$("#rma_error").hide();
  		} else if (data.status == "no_rma") {
			$("#rma_error").removeClass("zd_Hidden");
			$("#rma_error").show();
			$("#oow_serial").hide();
		}
		
		////for PAS callback
  		if(data.status == "success") {
  			$("#ask_for_pas").hide();
  			$("#pas_confirmation").removeClass("zd_Hidden");
			$("#pas_confirmation").show();
  		} else if(data.status == "failed") {
			$("#oow_serial").hide();
			$("#rma_error").removeClass("zd_Hidden");
			$("#rma_error").show();
		}
    }

    /* Function for all API calls */
    function submitStrapRequest(curruseremail, requesttype, strapData = '')
    {  	
      server_url = vanilla_sso_server+'zenApi/src/strapController.php';
      $.ajax({
        url : server_url, 
        type : 'POST',
        dataType:'JSON',
        data : { e_valid: curruseremail, r_type: requesttype, zd_qr: strapData},
        success : successCallBack,
        error : function(request,error) { }
      });
    } 
    ////strap page update ticket - End////
  
$(document).ready(function(){
  var current_user = HelpCenter.user.email;
  var ticket_id = "";
  
  ticket_id = the_url.split('requests/')
  ticket_id = ticket_id[1];
  if($.isNumeric(ticket_id)) {
    console.log('Ticket id is : '+ticket_id);
    submitStrapRequest(current_user, "submitStrapRequest", ticket_id);
  }
  
  $("#pas_yes").on("click", function(){
  	submitStrapRequest(current_user, "createPASrequest", ticket_id);
  });
});