'use strict';
const axios = require('axios');

module.exports = {
	metadata: () => ({
  	name: 'getDeviceDetailsFromLinda',
    properties: {
    	serialPrefix: { required: true, type: 'string' },
    	oscAuth: { required: true, type: 'string' },
    	oscHost: { required: true, type: 'string' },
      variableName : { type: "string", required: true },
      userName : { type: "string", required: true },
      pass : { type: "string", required: true }
		},
    supportedActions: ['one_res', 'no_res']
  }),	
  invoke: (conversation, done) => { 
				const _variable = conversation.properties().variableName;
        const serialPrefix = conversation.properties().serialPrefix; // this can be used for searchValue
        const oscAuth = conversation.properties().oscAuth;
        const userName=conversation.properties().userName;
        const pass=conversation.properties().pass;
    
        var querry = JSON.stringify({"query": {"serial_prefix": {"$contains": serialPrefix}}});
		
			axios.post("https://tomtomhelp1570114826.zendesk.com/api/sunshine/objects/query?per_page=100&page=1",querry,{headers:{'Authorization':oscAuth}}).then(response => {
    
     //var payload length is used for looping through the returning data no matter the length
        var payload_length = Object.keys((response.data)["data"]).length;
    
        if(payload_length > 0){
          
          var new_payload =[];

					for(var i = 0; i < payload_length; i++)
						{
              new_payload.push((((response.data)["data"])[i])["attributes"]);		
            }   
            
                //conversation.logger().info("new payload: "+ $VAR);
                conversation.variable(_variable, new_payload); 
                conversation.transition().keepTurn(true);   
                conversation.transition('one_res');  
                done();
				}else{
                var no_result = ["no_result",0];
                conversation.variable(_variable, no_result);   
                conversation.transition().keepTurn(true);   
                conversation.transition('no_res');  
                done();
            }   
							
        }).catch(error => {
            conversation.variable(_variable, error);
            conversation.transition().keepTurn(true);  
            done(); 
        });
  }
};