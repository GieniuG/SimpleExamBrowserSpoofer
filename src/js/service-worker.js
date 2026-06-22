chrome.runtime.onMessage.addListener((req,sender,sendResp)=>{
    if(req.action=="set"){
        chrome.storage.local.set({"on":req.on})
    }else if(req.action=="get"){
        chrome.storage.local.get("on").then((res)=>{
            console.log(res.on)
            sendResp({on:res.on})
        }).catch(error=>{
            console.error(error)
        })
    }
    return true
})
