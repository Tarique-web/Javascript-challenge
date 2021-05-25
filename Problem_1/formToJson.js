
var formElements;
function formToJson(formId) {
    // Getting forms elements using DOM methods
    var myForm = document.getElementById(formId).elements;

    formElements = {
        "formId": formId,
        "elements": []
    }

    for (var i = 0; myForm.length > i; i++) {

        var dict = {}


        dict['elementType'] = myForm[i].tagName

        dict['type'] = myForm[i].type
        dict['name'] = myForm[i].name

        if (myForm[i].name) {
            dict['name'] = myForm[i].name
        }
        if (myForm[i].placeholder) {
            dict['placeholder'] = myForm[i].placeholder
        }

        if (myForm[i].id) {
            dict['id'] = myForm[i].id
        }

        if (myForm[i].className) {
            dict['class'] = myForm[i].className
        }

        formElements.elements.push(dict)

    }
    return JSON.stringify(formElements)


}

console.log(formToJson("testForm"))


// -----------------
function jsonToForm(formJSON, targetDivId) {

    var ElementsJson = formJSON.elements;

    // creating Div
    var createDiv = document.createElement("div");

    // inside a div form created or not by cosoling
    console.log(createDiv);
    // create div id
    createDiv.setAttribute('id', targetDivId)
    // create form inside the div
    var createFromTag = createDiv.appendChild(document.createElement('form'));
    

    for(var i=0; ElementsJson.length>i; i++){

        // here create input tag

        var createInput = createFromTag.appendChild(document.createElement(ElementsJson[i].elementType));
        // creating input type
        createInput.setAttribute('type', ElementsJson[i].type);

        if(ElementsJson[i].name){
            createInput.setAttribute('name', ElementsJson[i].name);

        }
        if(ElementsJson[i].placeholder){
            createInput.setAttribute('placeholder', ElementsJson[i].placeholder);

        }
        if(ElementsJson[i].id){
            createInput.setAttribute('id', ElementsJson[i].id);
        }
        if(ElementsJson[i].class){
            createInput.setAttribute('class', ElementsJson[i].class);
        }

        // all div elements inseted body
        document.getElementsByTagName("body")[0]
        .appendChild(createDiv);
        
    }

   


}
jsonToForm(formElements, "formDiv")

