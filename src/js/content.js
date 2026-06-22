function main(){
    const fakeUA =  "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/6.11.0 Chrome/140.0.0.0 Safari/537.36"
    Object.defineProperty(navigator, "userAgent",{
        get: function() {return fakeUA}
    })
    Object.defineProperty(navigator,"appVersion",{
        get: function(){return fakeUA}
    })

    let banner = document.createElement("div");
    banner.id="sebBanner"

    let homeButton = document.createElement("button");
    let reloadButton = document.createElement("button");
    let left = document.createElement("div");
    left.id="left"
    homeButton.innerHTML=`<img src='${chrome.runtime.getURL('src/assets/home.svg')}'>`
    homeButton.classList.add("sebButton")
    reloadButton.innerHTML=`<img src='${chrome.runtime.getURL('src/assets/reload.svg')}'>`
    reloadButton.classList.add("sebButton")

    homeButton.addEventListener("click",()=>{
        window.location.href="https://delta.pk.edu.pl/my"
    })
    reloadButton.addEventListener("click",()=>{
        window.location.reload()
    })

    left.appendChild(homeButton)
    left.appendChild(reloadButton)

    let right = document.createElement("div")
    right.id="right"

    let bar = document.createElement("div")
    bar.id="bar"
    right.appendChild(bar)

    let timer = document.createElement("div")
    timer.id = "timer"
    let time = document.createElement("div")
    let date = document.createElement("div")
    timer.appendChild(time)
    timer.appendChild(date)



    right.appendChild(timer)
    let closeButton = document.createElement("button")
    closeButton.innerHTML=`<img src='${chrome.runtime.getURL('src/assets/close.svg')}'>`
    closeButton.classList.add("sebButton")
    right.appendChild(closeButton)

    banner.appendChild(left)
    banner.appendChild(right)
    document.querySelector("#page-wrapper").classList.add("sebsOn")
    document.querySelector("#page-wrapper").before(banner)




    function updateTime(){
        const d = new Date();
        const h=String(d.getHours()).padStart(2,"0")
        const m=String(d.getMinutes()).padStart(2,"0")
        const s=String(d.getSeconds()).padStart(2,"0")
        const D=String(d.getDay()).padStart(2,"0")
        const M=String(d.getMonth()).padStart(2,"0")
        const Y=String(d.getFullYear()).padStart(2,"0")
        time.innerHTML = `${h}:${m}:${s}`
        date.innerHTML = `${D}.${M}.${Y}`
    }
    setInterval(updateTime,500)
    updateTime();
}
chrome.runtime.sendMessage({action:"get"}).then(r=>{ if(r.on) main() })
