document.querySelector("input").addEventListener("change",(e)=>{
    chrome.runtime.sendMessage({action:"set",on:e.target.checked})    
})

async function set(){
    try{
        const state = await chrome.runtime.sendMessage({action:"get"})
        document.querySelector("input").checked=state.on;
    }catch(err){
        console.error(err)
    }
}
set();

