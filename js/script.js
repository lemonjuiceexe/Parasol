const logo = document.querySelector(".logo");

const filenames = ["txtnormal", "txtbigger", "txtbig", "contrast"];
let otherfirst = Array.from(document.querySelectorAll(".sliderfirst .other"));

const popup = document.querySelector(".popup");
const all = Array.from(document.querySelectorAll("body *:not(.popup):not(.popup *)"));
const body = document.querySelector("body");

const aright = document.querySelector(".slidersecond .arrowright");
const aleft = document.querySelector(".slidersecond .arrowleft");
const cards = Array.from(document.querySelectorAll(".sfigure"));
//logo
logo.addEventListener("click", () => {
    window.location = "index.html"; //FIXME: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
});
//ACCESSIBILITY
window.addEventListener("load", () => {
    text(sessionStorage.getItem("text"));
    if(sessionStorage.getItem("contrast") == "true"){
        contrast();
    }
});
function text(n){
    document.body.style.fontSize = "calc(" + n + "* 1em)";
    sessionStorage.setItem("text", n);
}

function contrast(){

    const a = document.querySelectorAll("*");
    // document.body.classList.toggle("contrast");
    for(let i = 0; i < a.length; i++)
    {
        a[i].classList.toggle("contrast");
    }
    document.querySelectorAll(".accessibility--button, .acimg").forEach(x => x.classList.toggle("contrast"));
    sessionStorage.setItem("contrast", document.body.classList.contains("contrast"));
}


//POPUP
function popupopen(){
    popup.style.display = "flex";
    for(let i = 0; i < all.length; i++){
        all[i].style.filter = "blur(10px)";
    }
    body.style.backgroundBlendMode = "color";

    //disable scrolling
    ts = window.pageYOffset || document.documentElement.scrollTop;
    ls = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => { 
        window.scrollTo(ls, ts);
    }
}
function popupclose(){
    popup.style.display = "none";
    for(let i = 0; i < all.length; i++){
        all[i].style.filter = "none";
    }
    body.style.backgroundBlendMode = "overlay";
    //enable scrolling
    console.log("enable scroll");
    window.onscroll = () => {};
}

//MOBILE SLIDER
if(window.innerWidth <= 1100){
    let startX, endX;
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener("touchstart", (e) => {
            startX = e.changedTouches[0].screenX;
        });

        cards[i].addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].screenX;
            let diff = startX - endX;
            if(Math.abs(diff) < 50){ //TODO: Adjust the lambda
                return;
            }
            let ix = 0;
            if(!cards[i].classList.contains("sf-second")){
                if(startX < endX){
                    prev(0);
                }
                else{
                    next(0);
                }
            }
            else{
                if(aright.classList.contains("arrow-disabled")){
                    if(startX > endX){
                        prev(1);
                    }
                }
                else if(aleft.classList.contains("arrow-disabled")){
                    if(startX < endX){
                        next(1)
                    }
                }
            }
            console.log(startX > endX ? "left" : "right");
        });
    }    
}
//SLIDER
function next(i){
    let slideridx = "slidersecond";
    if(i == 0){
        slideridx = "sliderfirst";
    }
    if(i == 0){
        const prev = document.querySelector(`.${slideridx} .prev`);
        const curr = document.querySelector(`.${slideridx} .curr`);
        const next = document.querySelector(`.${slideridx} .next`);
    
        prev.classList.remove("prev"); prev.style = "transition: none;"; prev.classList.add("other"); 
        setTimeout(() => { prev.style = "transiton: var(--slider-t);"; }, 100); //TODO: not sure if that's a good solution
        if(i == 0){
            otherfirst.push(prev);
        }
        curr.classList.remove("curr"); curr.classList.add("prev");
        next.classList.remove("next"); next.classList.add("curr");
        if(i == 0){
            otherfirst[0].classList.remove("other"); otherfirst[0].classList.add("next"); otherfirst.shift();
        }
    }
    else{
        if(aleft.classList.contains("none") || aright.classList.contains("arrow-disabled")){ return; }
        
        const prev = document.querySelector(`.${slideridx} .prev`);
        const curr = document.querySelector(`.${slideridx} .curr`);
        const next = document.querySelector(`.${slideridx} .next`);

        console.log(prev); console.log(next);
        if(prev == null){
            next.classList.remove("next"); 
            next.style = "transition: none;"; 
            next.classList.add("prev"); 
            setTimeout(() => { next.style = "transiton: var(--slider-t);"; }, 100);

            curr.classList.remove("curr"); curr.classList.add("next");
            next.classList.remove("prev"); next.classList.add("curr");

            return;
        }
        curr.classList.remove("curr"); curr.classList.add("next");
        prev.classList.remove("prev"); prev.classList.add("curr");

        
        aright.classList.add("arrow-disabled");
        aleft.classList.remove("arrow-disabled");
    }
    
    
}

function prev(i){
    let slideridx = "slidersecond";
    if(i == 0){
        slideridx = "sliderfirst";
    }
    if(i == 0){
        const prev = document.querySelector(`.${slideridx} .prev`);
        const curr = document.querySelector(`.${slideridx} .curr`);
        const next = document.querySelector(`.${slideridx} .next`);

        prev.classList.remove("prev"); prev.classList.add("curr");
        curr.classList.remove("curr"); curr.classList.add("next");
        next.classList.remove("next"); next.classList.add("other");
        
        let x;
        if(i == 0){
            otherfirst.splice(0, 0, next); /* insert to array at [0] */
            x = otherfirst[otherfirst.length - 1];
        }
        x.classList.remove("other"); x.style = "transition: none;"; x.classList.add("prev"); setTimeout(() => { x.style = "transiton: var(--slider-t);"; }, 100); 
        if(i == 0){
            otherfirst.pop();
        }
    }
    else{
        if(aright.classList.contains("none")  || aleft.classList.contains("arrow-disabled")){ return; }
        const prev = document.querySelector(`.${slideridx} .prev`);
        const curr = document.querySelector(`.${slideridx} .curr`);
        const next = document.querySelector(`.${slideridx} .next`);

        if(next == null){
            console.log("aprawd");
            prev.classList.remove("prev"); 
            prev.style = "transition: none;"; 
            prev.classList.add("next"); 
            setTimeout(() => { prev.style = "transiton: var(--slider-t);"; }, 100);

            curr.classList.remove("curr"); curr.classList.add("prev");
            prev.classList.remove("next"); prev.classList.add("curr");
            return;
        }
        curr.classList.remove("curr"); curr.classList.add("prev");
        next.classList.remove("next"); next.classList.add("curr");

        aleft.classList.add("arrow-disabled");
        aright.classList.remove("arrow-disabled");
    }
}