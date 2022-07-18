window.whatasoft =  window.whatasoft || {};
function unserialize(serialize) {
  let obj = {};
  serialize = serialize.split('&');
  for (let i = 0; i < serialize.length; i++) {
    thisItem = serialize[i].split('=');
    obj[decodeURIComponent(thisItem[0])] = decodeURIComponent(thisItem[1]);
  };
  return obj;
};
whatasoft.ajax = function(_cache_id, _data){
  return new Promise(function(resolve, reject){
    var post_data = {};
    var params = {};
    var errors = [];
    
    var session_id = BX.bitrix_sessid();
    
    if(_data instanceof FormData){
      _data.append('cache_id', _cache_id);
      _data.append('session_id', session_id);
      params = {
        contentType: false,
        processData: false
      };
      post_data = _data;
    }else if(typeof _data == 'string'){
      post_data = _data + '&cache_id='+ _cache_id +'&session_id='+ session_id;
    }else if(typeof _data == 'object'){
      var additional = {
        cache_id: _cache_id,
        session_id: session_id
      };
      post_data = $.extend({}, _data, additional);
    }else{
      errors.push('Wrong request data type');
      reject(errors);
    }
    
    var defaults = {
      url: '/bitrix/components/whatasoft/ajax.util/ajax.php',
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: post_data
    };
    var settings = $.extend({}, defaults, params);
    
    var request = $.ajax(settings);
    request.done(function(data){
      BX.message['bitrix_sessid'] = data.session_id;
      if(data.status == 'ok'){
        resolve(data.data);

        let pd = unserialize(post_data);

        if (pd && parseInt(pd.WAS_WEB_FORM_ID) === 16) {
          ingEvents.init({});
          ingEvents.Event({category:'forms', action:'submit', label:'form', ya_label:'form'});
          Comagic.addOfflineRequest({
            name: pd.NAME,
            phone: parseInt(phoneNormalize(pd.PHONE)),
          });
          phoneMask('form_callback_2');
        }

      }else{
        if(data.wrong_session){
          errors.push(BX.message('WAS_AJAX_JS_ERROR_SESSION'));
        }
        reject(errors);
      }
    });
    
    request.fail(function(jqXHR, textStatus){
      errors.push('Request failed: ' + textStatus);
      reject(errors);
    });
  });
};

whatasoft.addSpinner = function(_block){
  if($('.was_spinner_cont',_block).length > 0){
    return;
  }
  spinner = $('<div class="was_spinner_cont"><div class="spinner"></div></div>');
  if(_block.css('position') != 'absolute' && _block.css('position') != 'fixed'){
    _block.css('position', 'relative');
  }
  _block.append(spinner);
}

whatasoft.removeSpinner = function(_block){
  _block.find('.was_spinner_cont').remove();
}