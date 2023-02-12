let vText = document.querySelector(".input");
let vBtn = document.querySelector(".add");
let vRes = document.querySelector(".result");
let msg = [];
let msg1 = [];
let c=0;

if(window.localStorage.getItem('task')) {
    vRes.style.backgroundColor = "whitesmoke";
    msg = msg.concat(JSON.parse(window.localStorage.task));
    msg.forEach((e) => {
        let mydDiv = document.createElement("div");
        mydDiv.className = "new";
        mydDiv.innerHTML = e;
        let vSpan = document.createElement("span");
        vSpan.innerHTML = `Delete`;
        vRes.append(mydDiv);
        mydDiv.appendChild(vSpan);
        vSpan.addEventListener("click",function(e){
            for(let i = 0 ; i < msg.length ; i++){
                let vCurrent = (e.currentTarget.parentElement.innerHTML).slice(0,-19);
                if(vCurrent !== msg[i])
                msg1 = msg1.concat(msg[i]); 
            }
            msg=msg1;
            window.localStorage.setItem('task', JSON.stringify(msg1));
            msg1=[];
            e.currentTarget.parentElement.remove();
            if(vRes.innerHTML === ""){
                vRes.style.backgroundColor = "white";
            }
        });
    });
    if(vRes.innerHTML === ""){
        vRes.style.backgroundColor = "white";
    }
}
vBtn.addEventListener("click",function(){
    if(vText.value !== ""){
        vRes.style.backgroundColor = "whitesmoke";
        msg = msg.concat(vText.value);
        c++;
        window.localStorage.setItem(`task`,JSON.stringify(msg));
        let mydDiv = document.createElement("div");
        mydDiv.className = "new";
        let divTxt = document.createTextNode(`${vText.value}`);
        mydDiv.appendChild(divTxt);
        vRes.append(mydDiv);
        let vSpan = document.createElement("span");
        vSpan.innerHTML = `Delete`;
        mydDiv.appendChild(vSpan);
        vSpan.addEventListener("click",function(e){
            for(let i = 0 ; i < msg.length ; i++){
                let vCurrent = (e.currentTarget.parentElement.innerHTML).slice(0,-19);
                if(vCurrent !== msg[i])
                msg1 = msg1.concat(msg[i]); 
            }
            msg=msg1;
            window.localStorage.setItem('task', JSON.stringify(msg));
            msg1=[];
            e.currentTarget.parentElement.remove();
            if(vRes.innerHTML === ""){
                vRes.style.backgroundColor = "white";
            }
        });
    }
    vText.value="";
    });

