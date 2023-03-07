let vText = document.querySelector(".input");
let vBtn = document.querySelector(".add");
let vRes = document.querySelector(".result");
let msg = [];
let msg1 = [];
let c = 0;
let id = 0;
let retrievedArray = JSON.parse(localStorage.getItem('myArray'));
let allTasksDone = retrievedArray ?? [];
let retrievedCounter = localStorage.getItem("counter");
let allTasksDoneCounter = retrievedCounter ?? 0;
//This code is executed when the page is reloaded after the first one
if(window.localStorage.getItem('task')) {
    vRes.style.backgroundColor = "whitesmoke";
    msg = msg.concat(JSON.parse(window.localStorage.task));
    msg.forEach((e) => {
        //Creating a Div Tag to display the three buttons
        let myDiv = document.createElement("div");
        myDiv.className = "tasksContainer";
        var buttonsDiv = document.createElement('div');
        buttonsDiv.className = "buttonsContainer";
        var myInput = document.createElement('input');
        myInput.className = "newInput";
        myInput.type = "text";
        myInput.value = e;
        myInput.readOnly =true;
        myInput.maxLength = "55";
        myInput.title = "Press Enter when  you finish your edit";
        myInput.id = id;
        id++;
        vRes.append(myDiv);
        myDiv.style.backgroundColor =  "whitesmoke";
        //End of creating the task body
        //Start of creating Delete button
        let vDlete = document.createElement("button");
        vDlete.className = "delete";
        vDlete.innerHTML = `Delete`;
        buttonsDiv.appendChild(vDlete);
        //End of creating Delete button
        //Start of creating Edit button
        let vEdit = document.createElement("button");
        vEdit.className = "edit";
        vEdit.innerHTML = `Edit`;
        buttonsDiv.appendChild(vEdit);
        //End of creating Delete button
        //Start of creating checkbox
        var vCheckBox = document.createElement('input');
        vCheckBox.type = "checkbox";
        vCheckBox.className = "checkbox";
        //End of creating checkbox
        //Append the childs
        myDiv.append(vCheckBox);
        myDiv.append(myInput);
        myDiv.append(buttonsDiv);
        //Loop for adding a check on the done tasks
        for (let i = 0; i < allTasksDone.length; i++) {
            if(myDiv.children[1].value === allTasksDone[i])
            {
                (myDiv.children[1]).style.textDecoration = "line-through";
                (myDiv.children[1]).style.color = "#9e9e9e";
                (myDiv.children[0]).checked = true;
            }
        }
        //The Delete Button handelar 
        vDlete.addEventListener("click",function(e){
            let retrievedArray = JSON.parse(localStorage.getItem('myArray')) ?? [];
            let retrievedCounter = localStorage.getItem("counter") ?? 0;
            for(let i = 0 ; i < msg.length ; i++){
                let vCurrent = (e.currentTarget.parentElement.parentElement.children[1].value);
                if(vCurrent !== msg[i])
                msg1 = msg1.concat(msg[i]); 
            }
            msg=msg1;
            window.localStorage.setItem('task', JSON.stringify(msg));
            msg1=[];
            for (let i = 0; i < retrievedArray.length; i++) {
                if(e.currentTarget.parentElement.parentElement.children[1].value === retrievedArray[i])
                {
                    retrievedArray.splice(i,1)
                }
            }
            localStorage.setItem("myArray", JSON.stringify(retrievedArray));
            if (retrievedCounter <= 0) {
                retrievedCounter = 0;
            } else {
                retrievedCounter--;
            }
            localStorage.setItem("counter", retrievedCounter);
            e.currentTarget.parentElement.parentElement.remove();
            if(vRes.innerHTML === ""){
                vRes.style.backgroundColor = "white";
            }
        });
        //The Edit Button handelar
        vEdit.addEventListener("click",function(e){
            // Retrieve the existing localStorage items and parse it into an object
            let data = JSON.parse(window.localStorage.getItem('task'));
            let vElement = e.currentTarget.parentElement.parentElement.children[1]
            let oldValue = vElement.value;
            let elementIndex = vElement.id;
            vElement.readOnly = false;
            vElement.focus();
            vElement.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    // Update the value of the object
                    data[elementIndex] = vElement.value;
                    //Save the updated object back to localStorage
                    window.localStorage.setItem('task', JSON.stringify(data));
                    vElement.readOnly = true;
                    vElement.blur();    
                }    
            });
            //Because if the user clicks outside the iput, the input will remain in edit mode
            const myInterval = setInterval(function () {
                if(vElement !== (document.activeElement)){
                    let newValue = vElement.value;
                    if(oldValue === newValue){
                        vElement.readOnly = true;
                    }
                    else{
                        data[elementIndex] = newValue;
                        window.localStorage.setItem('task', JSON.stringify(data));
                        vElement.readOnly = true;
                    }
                    clearInterval(myInterval);
                }
            }, 1000);
        });
        //The checkbox handelar
        vCheckBox.addEventListener("click",function(e){
            let vElement = e.currentTarget.parentElement.children[1]
            if(vElement.style.textDecoration === "line-through"){
                vElement.style.textDecoration = "none";
                vElement.style.color = "black";
                for (let i = 0; i < allTasksDone.length; i++) {
                    if(allTasksDone[i] === vElement.value){
                        allTasksDone.splice(i,1)
                        allTasksDoneCounter--; 
                        window.localStorage.setItem('myArray', JSON.stringify(allTasksDone));
                        window.localStorage.setItem("counter", allTasksDoneCounter);
                    }
                }
            }else{
                vElement.style.textDecoration = "line-through";
                vElement.style.color = "#9e9e9e";
                allTasksDone[allTasksDoneCounter] = vElement.value;
                allTasksDoneCounter++; 
                window.localStorage.setItem('myArray', JSON.stringify(allTasksDone));
                window.localStorage.setItem("counter", allTasksDoneCounter);
            }
        });
    });
    if(vRes.innerHTML === ""){
        vRes.style.backgroundColor = "white";
    }
}

// This code is executed when the page first time opened
vBtn.addEventListener("click",function(){
    if(vText.value !== ""){
        // Store the input in local storage
        // vRes.style.backgroundColor = "whitesmoke";
        msg = msg.concat(vText.value);
        c++;
        window.localStorage.setItem(`task`,JSON.stringify(msg));
        //Creating a Div Tag to display the three buttons
        let myDiv = document.createElement("div");
        myDiv.className = "tasksContainer";
        var buttonsDiv = document.createElement('div');
        buttonsDiv.className = "buttonsContainer";
        var myInput = document.createElement('input');
        myInput.className = "newInput";
        myInput.type = "text";
        myInput.value = vText.value;
        myInput.readOnly =true;
        myInput.maxLength = "55";
        myInput.title = "Press Enter when  you finish your edit";
        myInput.id = id;
        id++;
        vRes.append(myDiv);
        myDiv.style.backgroundColor =  "whitesmoke";
        //End of creating the task body
        //Start of creating Delete button
        let vDlete = document.createElement("button");
        vDlete.className = "delete";
        vDlete.innerHTML = `Delete`;
        buttonsDiv.appendChild(vDlete);
        //End of creating Delete button
        //Start of creating Edit button
        let vEdit = document.createElement("button");
        vEdit.className = "edit";
        vEdit.innerHTML = `Edit`;
        buttonsDiv.appendChild(vEdit);
        //End of creating Delete button
        //Start of creating checkbox
        var vCheckBox = document.createElement('input');
        vCheckBox.type = "checkbox";
        vCheckBox.className = "checkbox";
        //End of creating checkbox
        //Append the childs
        myDiv.append(vCheckBox);
        myDiv.append(myInput);
        myDiv.append(buttonsDiv);
        //The Delete Button handelar 
        vDlete.addEventListener("click",function(e){
            let retrievedArray = JSON.parse(localStorage.getItem('myArray')) ?? [];
            let retrievedCounter = localStorage.getItem("counter") ?? 0;
            for(let i = 0 ; i < msg.length ; i++){
                let vCurrent = (e.currentTarget.parentElement.parentElement.children[1].value);
                if(vCurrent !== msg[i])
                msg1 = msg1.concat(msg[i]); 
            }
            msg=msg1;
            window.localStorage.setItem('task', JSON.stringify(msg));
            msg1=[];
            for (let i = 0; i < retrievedArray.length; i++) {
                if(e.currentTarget.parentElement.parentElement.children[1].value === retrievedArray[i])
                {
                    retrievedArray.splice(i,1)
                }
            }
            localStorage.setItem("myArray", JSON.stringify(retrievedArray));
            if (retrievedCounter <= 0) {
                retrievedCounter = 0;
            } else {
                retrievedCounter--;
            }
            localStorage.setItem("counter", retrievedCounter);
            e.currentTarget.parentElement.parentElement.remove();
            if(vRes.innerHTML === ""){
                vRes.style.backgroundColor = "white";
            }
        });
        //The Edit Button handelar
        vEdit.addEventListener("click",function(e){
            // Retrieve the existing localStorage items and parse it into an object
            let data = JSON.parse(window.localStorage.getItem('task'));
            let vElement = e.currentTarget.parentElement.parentElement.children[1]
            let oldValue = vElement.value;
            let elementIndex = vElement.id;
            vElement.readOnly = false;
            vElement.focus();
            vElement.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    // Update the value of the object
                    data[elementIndex] = vElement.value;
                    //Save the updated object back to localStorage
                    window.localStorage.setItem('task', JSON.stringify(data));
                    vElement.readOnly = true;
                    vElement.blur();    
                }    
            });
            //Because if the user clicks outside the iput, the input will remain in edit mode
            const myInterval = setInterval(function () {
                if(vElement !== (document.activeElement)){
                    let newValue = vElement.value;
                    if(oldValue === newValue){
                        vElement.readOnly = true;
                    }
                    else{
                        data[elementIndex] = newValue;
                        window.localStorage.setItem('task', JSON.stringify(data));
                        vElement.readOnly = true;
                    }
                    clearInterval(myInterval);
                }
            }, 1000);
        });
        //The checkbox handelar
        vCheckBox.addEventListener("click",function(e){
            let vElement = e.currentTarget.parentElement.children[1]
            if(vElement.style.textDecoration === "line-through"){
                vElement.style.textDecoration = "none";
                vElement.style.color = "black";
                for (let i = 0; i < allTasksDone.length; i++) {
                    if(allTasksDone[i] === vElement.value){
                        allTasksDone.splice(i,1)
                        allTasksDoneCounter--; 
                        localStorage.setItem('myArray', JSON.stringify(allTasksDone));
                        window.localStorage.setItem("counter", allTasksDoneCounter);
                    }
                }
                }else{
                vElement.style.textDecoration = "line-through";
                vElement.style.color = "#9e9e9e";
                allTasksDone[allTasksDoneCounter] = vElement.value;
                allTasksDoneCounter++; 
                window.localStorage.setItem('myArray', JSON.stringify(allTasksDone));
                window.localStorage.setItem("counter", allTasksDoneCounter);
            }
        });
    }
    // To reset the input field
    vText.value="";
    });

