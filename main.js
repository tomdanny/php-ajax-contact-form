$(document).ready(function(){ 

    $('#characterLeft').text('140 characters left');
    $('#message').keydown(function () {
        var max = 140;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    });    


    function submitForm() {

        $('#submit').disabled = true;
        $('#status').innerHTML = "please wait ...";

        var formdata = new FormData();

        formdata.append("first-name", $("#first-name").value);
        formdata.append("last-name", $("#last-name").value);
        formdata.append("email", $("#email").value);
        formdata.append("company-name", $("#company-name").value);
        formdata.append("message", $("#message").value);

        var ajax = new XMLHttpRequest();
       
       
       ajax.open("POST", "form-parser.php", true);
       ajax.setRequestHeader("Content-type" ,"application/x-www-form-urlencoded");
       
       
       
       ajax.onreadystatechange = function() {

            if(ajax.readyState == 4 && ajax.status == 200 ) {
                    
                if(ajax.responseText == "success") {
                   
                     $("#form").innerHTML = '<p>Thanks ' + $("#first-name").value + ', your message has been sent.</p>';
                
                } else {    
                    $("#status").innerHTML = ajax.responseText;
                    $("#submit").disabled = false;

                }
            }
        }

        ajax.send(formdata);
    }

});