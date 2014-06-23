function CreateUser(settings){
    
    function start(){
        createHtml();
    }
    
    function createHtml(){
        
        var year = new Date().getFullYear();
        var years = "";

        for (var i = 1900; i <= year; i++) {
            years = '<option value="' + i + '">' + i + '</option>' + years;
        }
        
        document.body.innerHTML = '<div id="createUser"><div id="varoitus"></div><form onSubmit="stateMachine.createUser()">\
        HENKILÖTIEDOT:\
        <table>\
            <tr>\
                <td>'+text['sukupuoli']+':</td>\
                <td>\
                    <input type="radio" name="sex" class="sex" value="m" id="m">'+text['mies']+'\
                    <input type="radio" name="sex" class="sex" value="f" id="f">'+text['nainen']+'\
                </td>\
            </tr>\
            <tr>\
                <td>'+text['syntymavuosi']+': </td>\
                <td><select name="yearofbirth" id="yearofbirth">\
                <option value="valitse">Valitse</option>'
                + years +
                '</select>\
                </td>\
            </tr>\
            <tr>\
                <td>'+text['katisyys']+':</td>\
                <td> \
                <input type="radio" name="handedness" value="r" id="r">'+text['oikea']+'\
                <input type="radio" name="handedness" value="l" id="l">'+text['vasen']+'</td></tr>\
            <tr>\
                <td>'+text['koulutustausta']+':</td><td> \
                <select name="education" id="education">\
                <option value="valitse">Valitse</option>\
                <option value="Peruskoulu">Peruskoulu</option>\
                <option value="Lukio tai ammattikoulu">Lukio tai ammattikoulu</option>\
                <option value="Korkeakoulu">Korkeakoulu</option>\
                </select></td>\
            </tr>\
            <tr>\
                <td><input type="button" value="Jatka" onclick="stateMachine.createUser()" /></td><td>\
        </table>\
        </form>\
        </div>';

    }

    function getSelectListValue(listId){
        return document.getElementById(listId).options[document.getElementById(listId).selectedIndex].value;
    }
    
    function signUp(user){

        try {

            var yearOfBirth = getSelectListValue("yearofbirth");
            var education = getSelectListValue("education");

            if(yearOfBirth  === "valitse"){
                return false;
            }else if(education === "valitse"){
                return false;
            }

            var params = new Params();

            params.add("username", user.name());
            params.add("sex", document.querySelector('input[name="sex"]:checked').value);
            params.add("yearOfBirth", yearOfBirth);
            params.add("handedness", document.querySelector('input[name="handedness"]:checked').value);
            params.add("education", document.getElementById("education").value);

            var request = new Request();
            var responseText = request.createPost(settings.url + "signup", params.toString());

            return responseText === "true";

        }catch(err) {
            return false;
        }

    }
    

    return {
        start:start,
        signup:signUp
    };
    
    
}
