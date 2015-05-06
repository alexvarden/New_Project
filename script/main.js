function c(log)
{
	console.log(log);
} 

 

function fail(message , input)
{
	c("Form-error : "+message);

	var id = "#"+input.id;

	// add class to input tag
	$(id).addClass('state-error').removeClass('state-success');

	// add class to input tag
	$(id).attr('placeholder', message).val("");

}

function pass(input,form)
{	

	var id = "#"+input.id;

	// add class to input tag
	$(id).removeClass('state-error').addClass('state-success');

	//add class to label tag
	$(id).parent('label').removeClass('state-error').addClass('state-success');
	
	// add message 
	 $(id).parent().siblings('div.message').html("");


}

 

function validate(form,rules)
{
	
	  // form = $(form).parents('form:first');
	  form = $(form);

      c(' ---------------- validate ---------------');
		/*
			
			Options			pass 	discription
			-------------------------------------------
			required		bool	check exists	
			contains  		string  contains substring at least somewhere in it (regardless of case). 	
			endsIn			string  contains substring at the end (regardless of case). 	
			max				int		make sure string length is more than x	
			min 			int		make sure string length is less than x
			alpha			bool	make sure string is just letters 
			numeric			bool	make sure string is just numbers 
			numeric_s		bool	make sure string is just numbers 
			max_val			int 	maximum numeric value
			min_val			int 	maximum numeric value
			alphanumeric_S  bool	make sure string is just letters/numbers & spaces
			alphanumeric	bool	make sure string is just letters/numbers 
			letters			int		makes sure there is x amount of letters
			upperletters	int		makes sure there is x amount of capital letters
			lowerletters	int		makes sure there is x amount of lower case letters
			numbers			int	    makes sure there is x amount of numbers
			nospace			bool	disallows spaces 
			email			bool	check if valid email
			equalto			ID 		checks to inputs are the same
			Notequal		ID 		checks to inputs are Not the same
			pair			ID		requires at least 1 of inputs 
			notbefore	  ID:date	checks date is not before date element		
			notafter	  ID:date	checks date is before date element
			regex 		   regex	takes regex sting and compares
	  */

 	  carryon = true;

      // go through each input in form
      $.each(form.find('input'), function(key, input) 
      {	      	 
	 	// check if rule exsist
	    if(rules[input.id] != undefined)
		{


			labelName = $(input).attr('name');	// Get user friendly name of input 
			labelName = $('label[for="'+labelName+'"]').html();	// Get user friendly name of input 

					$(input).attr('onblur', 'validate(this,Rules)');

			      	c("-------- " + labelName + " :"+ input.value+"		------");
			      	// c("-------- " + labelName "+--------------------");

			      	if (carryon)
			    	{

						// required

			 		      if(rules[input.id].required) // check exists
					      {								 

			 					var fail_txt = labelName+" is required";
			 		      
			 			      	if (input.value == "") 	{fail(fail_txt,input); carryon = false; return false;}
			 					else{pass(input);}
			 		      }

						// contains
						    if(rules[input.id].contains) // make sure contains substring (regardless of case). 	
						    {
						    	var substring = rules[input.id].contains.toLowerCase(); // get string and turn to lowercase
 								var inputvalue = input.value.toLowerCase(); // turn value to lowercase

 								//	tests
	 							// 	c('substring = '+substring);
								//  c('inputvalue = '+inputvalue);

								var fail_txt = labelName+' is not Valid';
								
								var test = 0; // reset Test
									test = inputvalue.indexOf(substring); // will return -1 if not found

								// c('test = '+test);

					 	    	if (test == -1){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }


						// endsIn
						    if(rules[input.id].endsIn) // make sure contains substring (regardless of case). 	
						    {
						    	var substring = rules[input.id].endsIn.toLowerCase(); // get string and turn to lowercase
 								var inputvalue = input.value.toLowerCase(); // turn value to lowercase

 								
								var fail_txt = labelName+' must end in '+substring;
								
								var index = 0; // reset index
									index = inputvalue.indexOf(substring); // will return -1 if not found


 								 // Tests 
								 // c('substring = '+substring);
								 // c('inputvalue = '+inputvalue);
								 // c('substring.L = '+substring.length);
								 // c('inputvalue.L = '+inputvalue.length);
								 // c('index = '+index);
								 


					 	    	 // c((inputvalue.length-1) +' - '+ (substring.length-1) +' != '+ (index));


								if(index == -1){fail(fail_txt,input); carryon = false; return false;} // if doesnt contain it 
					 	    	else if((inputvalue.length-1) - (substring.length-1) != index)	{ fail(fail_txt,input); carryon = false; return false; } // if does but not at the end.(-1's to account for the 0 index)
								else{pass(input);}
						    }



						// MIN : int 
							if(rules[input.id].min) //  make sure string length is more than x
							{
								var fail_txt = labelName+" must be "+rules[input.id].min+" Charecters or more.";

						 		if (input.value.length < rules[input.id].min) 	{fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
							}

						// MAX : int
						   if(rules[input.id].max) //  make sure string length is more than x
			   		       {
								var fail_txt = labelName+" must be "+rules[input.id].max+" Charecters or less.";

						 	   	if (input.value.length > rules[input.id].max) 	{fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						   }

						// alpha
						    if(rules[input.id].alpha) // make sure string is just letters 
						    {
								var fail_txt = 'only letters are allowed for '+labelName;
								var filter= /^[a-zA-Z]+$/;
					 	    	
					 	    	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }

						// numeric
						    if(rules[input.id].numeric) // make sure string is just numbers 
						    {
								var fail_txt = 'only numeric characters are allowed for '+labelName;
								var filter= /^\d+$/;
					 	    	
					 	    	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }

							// numeric_s
						    if(rules[input.id].numeric_s) // make sure string is just numbers 
						    {
								var fail_txt = 'only numeric characters are allowed for '+labelName;
								var filter= /^[0-9\s]/;
					 	    	
					 	    	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }

								    
				
						// max_val
						    if(rules[input.id].max_val) // make sure intiger value is less than 
						    {
								var fail_txt = labelName+' has a maximum value of '+rules[input.id].max_val;
								var value = parseInt(rules[input.id].max_val);

					 	    	if (input.value >= value ){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }
				
						// min_val
						    if(rules[input.id].min_val) // make sure intiger value is more than 
						    {
								var fail_txt = labelName+' has a minimum value of '+rules[input.id].min_val;
								var value = parseInt(rules[input.id].min_val);

					 	    	if (input.value < rules[input.id].min_val){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }

						// alphanumeric
						    if(rules[input.id].alphanumeric) // make sure string is just letters/numbers 
						    {
								var fail_txt = 'only alphanumeric characters are allowed for '+labelName;
								var filter= /^[a-zA-Z0-9]+$/;
					 	    	
					 	    	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }		

						 // alphanumeric_S
						    if(rules[input.id].alphanumeric_S) // make sure string is just letters/numbers 
						    {
								var fail_txt = 'only alphanumeric characters and spaces are allowed for '+labelName;
								var filter= /^[a-zA-Z0-9\s]+$/;
					 	    	
					 	    	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }		   

						// nospace
						    if(rules[input.id].nospace) // make sure string is just letters/numbers 
						    {
								var fail_txt = 'no spaces allowed in '+labelName;
								var filter= /\s/;
					 	    	
					 	    	if (filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						    }				            

						// letters : int 
						    if(rules[input.id].letters) // makes sure there is x amount of letters
						    {
								var fail_txt = 'There must be at least '+rules[input.id].letters+' letter(s) in '+labelName;
								var count = input.value.match(/[a-zA-Z]/g);

								if(count == null){  count  = 0 ;}
								else{ 	count = count.length;	}

								// c("A-Z:"+count+"/"+rules[input.id].letters);

				 		      	if (count < rules[input.id].letters ){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }	


						// upperletters:int      	
						    if(rules[input.id].upperletters) // makes sure there is x amount of letters
						    {
								var fail_txt = 'There must be at least '+rules[input.id].upperletters+' upper case letter(s) in '+labelName;
								var count = input.value.match(/[A-Z]/g);

								if(count == null){  count  = 0 ;}
								else{ 	count = count.length;	}

								c("A-Z:"+count+"/"+rules[input.id].upperletters);

				 		      	if (count < rules[input.id].upperletters ){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }	

						// lowerletters:int      	
						    if(rules[input.id].lowerletters) // makes sure there is x amount of letters
						    {
								var fail_txt = 'There must be at least '+rules[input.id].lowerletters+' upper case letter(s) in '+labelName;
								var count = input.value.match(/[a-z]/g);

								if(count == null){  count  = 0 ;}
								else{ 	count = count.length;	}

								c("a-z:"+count+"/"+rules[input.id].lowerletters);

				 		      	if (count < rules[input.id].lowerletters ){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						     }	



						// numbers : int 
						      if(rules[input.id].numbers) // makes sure there is x amount of numbers
						      {
								var fail_txt = 'There must be at least '+rules[input.id].numbers+' number(s) in '+labelName;
								var count = input.value.match(/\d/g);

								if(count == null){  count  = 0 ;}
								else{ 	count = count.length;	}

								// c("0-9:"+count+"/"+rules[input.id].numbers); 

				 		      	if (count < rules[input.id].numbers ){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }		   

						// Email
						      if(rules[input.id].email) // check if valid email 
						      {
								var fail_txt = 'Invalid email address entered';
								var filter= /(^[a-zA-Z]{1,})([a-zA-Z0-9]{0,})?([_.-]{0,1})?([a-zA-Z]{1,})([a-zA-Z0-9]{0,})\@([a-zA-Z]{1,})+([a-zA-Z0-9]{1,})?([-_.]{0,1})?([a-zA-Z]{1,})([a-zA-Z0-9]{0,})\.([a-zA-Z]){2,4}/; 		      	
				 		     
				 		      	if (!filter.test(input.value)){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }

						// equalto : ID
							  if(rules[input.id].equalto) // check if valid email 
						      {
								

								target = rules[input.id].equalto;
								


								c("------New Password Value----");
									

								target = form.find('input#'+target);



								// get user friendly name of 2nd input 
				      			targetName = $(target).parent('label').text();
				      			targetName = $.trim(targetName);

								var fail_txt = targetName + ' does not equal '+ labelName;

								c(target.val()+" = "+input.value);

				 		      	if (target.val() != input.value){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }


						// Notequal : ID			    
						  if(rules[input.id].notequal) // check if valid email 
						      {
								
								target = $(rules[input.id].equalto)[0];

								// get user friendly name of 2nd input 
				      			targetName = $(target).parent('label').text();
				      			targetName = $.trim(targetName);

								var fail_txt = targetName + ' can not be the same '+ labelName;

								// c(target.value+" = "+input.value);

				 		      	if (target.value == input.value){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }

						// pair : ID
						      if(rules[input.id].pair) // check if valid email 
						      {
								

								target = $(rules[input.id].pair)[0];
					
								if(target == undefined || target == null ){c('pair isnt real'); carryon = false; return false;}


								// get user friendly name of 2nd input 
						      	targetName = $(input).attr('name');

								var fail_txt = 'At least one of '+ labelName +' or '+ targetName + ' must be completed' ;

								// c(target.value+" = "+input.value);

				 		      	if (target.value == "" && input.value == ""){fail(fail_txt,input); carryon = false; return false;}
								else{pass(input);}
						      }
						
						//notbefore	  ID:date
				  			  if(rules[input.id].notbefore) 
						      {
								
								target = $(rules[input.id].equalto)[0];

								// get user friendly name of 2nd input 
				      			targetName = $(target).parent('label').text();
				      			targetName = $.trim(targetName);

								var fail_txt = targetName + ' can not be the same '+ labelName;

								// c(target.value+" = "+input.value);
								
								Date1 = new Date(target.value).getTime() 	

								c(Date1);

								if( (new Date(target.value).getTime() > new Date(input.value).getTime()))
								{

								}

						 		 	// if (target.value == input.value){fail(fail_txt,input); carryon = false; return false;}
									// else{pass(input);}
						    	  
								return false;

						      }	
		
		      					// letters : int 
							    if(rules[input.id].regex) // makes sure there is x amount of letters
							    {
									var fail_txt = labelName+' is incorrect' ;
									var regex = rules[input.id].regex;
									var bool = regex.test(input.value);
 
					 		      	if (!bool ){fail(fail_txt,input); carryon = false; return false;}
									else{pass(input);}
							    }	





					}
					else
					{
							return false;
					}
	
		}

      });


    c("-----------------------------------------");

   	return carryon; 
}
