function get_uuid(){
  if (localStorage.getItem("client_uuid") == null){
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    localStorage.setItem("client_uuid",uuid);
  }   
  return localStorage.getItem("client_uuid")
}
function get_user_data(){
  let country = Intl.DateTimeFormat().resolvedOptions().timeZone
  return country
}
function get_page_url(){
    let website_url = "https://thefriendlyskies.net"
    if (window.location.pathname+window.location.search == "/"){
        return website_url
    }
    else{
        let path = window.location.pathname+window.location.search
        return website_url + path.substring(0, path.length - 1);
    }
}

async function register_view(){
  let url = "https://micro-views.vercel.app/api/create_view"

  payload = {
    "viewer_instance":{
      "country": get_user_data(),
      "client_uuid": get_uuid(),
      "ip": ""
    },
    "url_instance": {
      "url": get_page_url()
    }
  }
  
  const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify(payload),
  });
  const res = await response.json()
}
register_view()