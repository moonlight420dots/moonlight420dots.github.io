window.whatasoft =  window.whatasoft || {};

whatasoft.hash = {};
whatasoft.hash.getParams = function(){
  var hash = window.location.hash.substring(1);
  var params = {};
  var vars = hash.split('&');
  for(var i = 0; i < vars.length; i++){
    if(!vars[i]){
      continue;
    }
    var pair = vars[i].split('=');
    if(pair.length < 2){
      continue;
    }
    params[pair[0]] = pair[1];
  }
  
  return params;
}
whatasoft.hash.buildParams = function(_params){
  var new_hash = Object.keys(_params).map(function(val){
      return val +'='+ _params[val];
  }).join('&');
  
  return new_hash.length ? '#'+new_hash : '';
}
whatasoft.hash.setParam = function(_name, _value){
  var params = whatasoft.hash.getParams();
  params[_name] = _value;
  window.location.hash = whatasoft.hash.buildParams(params);
}
whatasoft.hash.getParam = function(_name){
  var params = whatasoft.hash.getParams();
  return params[_name];
}