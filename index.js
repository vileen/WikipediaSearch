function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');

    if(!container.hasClass('active')){
        container.addClass('active');
        evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').empty();
        $('#info').show();
    }
}

function submitFn(obj, evt){
    value = $(obj).find('.search-input').val().trim();

    $('#info').hide();
    if(!value.length){
        _html = "Yup yup! Add some text friend :D";
    }
    else{
        _html = "Pending...";
        getResults();
    }

    $(obj).find('.result-container').html('<b>' + _html + '</b>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();
}

var buildResult = function(header, description, link) {
    var html =
        '<li class="linkContainer">' +
        '<a class="article" target="_blank" href="'+link+'">' +
        '<div class="header">'+header+'</div>' +
        '<div class="description">'+description+'</div>'
    '</a>'
    '</li>';

    return html;
}

var renderResults = function() {
    var headers = arguments[0][1];
    var descriptions = arguments[0][2];
    var links = arguments[0][3];
    var _html = '';
    headers.forEach(function(header, index) {
        _html += buildResult(headers[index], descriptions[index], links[index]);
    });

    $('.result-container').html(_html);
}

var getResults = function() {
    $.ajax({
        url: '//en.wikipedia.org/w/api.php',
        data: {
            limit: '10',
            origin: '*',
            action: 'opensearch',
            search: value,
        },
        success: function(results) {
            renderResults(results)
        },
        error: function(result) {
            console.log(result);
        }
    });
}