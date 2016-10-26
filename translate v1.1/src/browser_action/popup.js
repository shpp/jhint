window.addEventListener('click',function(e){
  if(e.target.href){
    chrome.tabs.create({url:e.target.href})
  }
})