'use strict';
const axios = require('axios');

module.exports = {
	metadata: () => ({
  	name: 'getDeviceDetailsFromLinda',
    properties: {
    	serialPrefix: { required: true, type: 'string' },
    	oscAuth: { required: true, type: 'string' },
    //	oscHost: { required: true, type: 'string' },
      variableName : { type: "string", required: true },
     // userName : { type: "string", required: true },
      //pass : { type: "string", required: true }
		},
    supportedActions: ['no_res']
  }),	
  invoke: (conversation, done) => { 
        const { serialPrefix, oscAuth, variableName } = conversation.properties();

      
        var final_result=[];
        var querry = JSON.stringify({"query": {"Serial_Prefix_forBongo": {"$contains": serialPrefix}}});

			axios.post("https://tomtomhelp1570114826.zendesk.com/api/sunshine/objects/query?per_page=100&page=1",querry,{headers:{'Authorization':oscAuth}}).then(response => {
    
     //var payload length is used for looping through the returning data no matter the length
        var response_length = Object.keys((response.data)["data"]).length;
    
        if(response_length > 0){
           
					for(var i = 0; i < response_length; i++)
						{
              
              var image_pt_id=((((response.data)["data"])[i])["attributes"]["ID_forBongo"])
              var image_url= "http://download.tomtom.com/support/cc/help/assets/linda_images/"+image_pt_id+".png";
             // final_result.push((((response.data)["data"])[i])["attributes"]["ID_forBongo"]);
             final_result.push({"image":image_url,
                                "software":(((response.data)["data"])[i])["attributes"]["Software_forBongo"],
                                "model":(((response.data)["data"])[i])["attributes"]["Product_forBongo"],
                                "prefix":(((response.data)["data"])[i])["attributes"]["Serial_Prefix_forBongo"]
                               
                                     
                              });
            } 

          
            
            
            conversation.variable(variableName, final_result);   
                conversation.transition();
				conversation.keepTurn(true);   
                //conversation.transition('no_res');  
                done();


				}else{
                //var no_result = ["no_result",0];
                conversation.variable(variableName,[]);   
                conversation.keepTurn(true);   
                conversation.transition('no_res');  
                done();
            }   			
        }).catch(error => {
            conversation.variable(variableName,[]);
			conversation.logger().error(module.exports.metadata().name+": Unhandled exception: "+e.stack);
			conversation.transition('no_res');
            conversation.keepTurn(true);  
            done(); 
        });
  }
};