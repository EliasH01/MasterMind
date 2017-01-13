function getColor() {
    var colors = ['A', 'B', 'C', 'D', 'E', 'F'];
    var min = 0;
    var max = 5;

    return colors[Math.round(Math.random() * max)];
}

var game = []
var rounds = 12;
var startTime = 0;
var timer;

function init() {
    game = [getColor(),getColor(),getColor(),getColor()];
    $('.mm-result').fadeOut()
   // $('.mm-result').remove() 
    $('div[id^="chooser-"]').removeClass().addClass('bullet')
    $('.initial-hidden').hide()
    startTime = 0;
    window.clearInterval(timer)
}

function check() {
    var result = []
    console.log (game)
    $('div[id^="chooser-"]').each(function(idx) {
        var classArr = $(this).attr('class').split(' ');
        if (classArr[1] != undefined) {
            result.push(classArr[1])
        }
    })

    if (result.length < 4) return;

    if (timer == undefined) {
        timer = window.setInterval(function(){
            $('#time').text(++startTime)
        }, 1000)
    }

    $('#rounds-display').text(rounds)
    var test = game.slice();
    var clr = 0;
    var clrpos = 0;

    for (var idx = 0; idx < result.length; idx++) {
        if (result[idx] == test[idx]) {
            clrpos++
            test[idx] = undefined
        }
    }

    for (var idx = 0; idx < result.length; idx++) {
        var idxFound = test.indexOf(result[idx])
        if (idxFound >= 0) {
            test[idxFound] = undefined
            clr++
        }
    }

    console.log("Schwarze Möppen:" , clrpos, ", Weiße Möppen: ", clr)

    rounds--
    if (rounds == 0 && clrpos < 4) {
        // Verloren
        $('#loose').show()
        window.clearInterval(timer)
    } else if (clrpos == 4) {
        // Gewonnen!
        $('#win').show()
        window.clearInterval(timer)
    }

    var tableRow = '<tr class="mm-result"><td><div class="bullet '+result[0]+'"> </div></td><td><div class="bullet '+result[1]+'"> </div></td><td><div class="bullet '+result[2]+'"> </div></td><td><div class="bullet '+result[3]+'"> </div></td> ';
    for (var i = 0; i < 4; i++){
        var resClass = '';
        if (clrpos > 0) {
            resClass = 'black';
            clrpos--;
        } else if (clr > 0) {
            resClass = 'white';
            clr--;
        }
        tableRow += '<td class="' + resClass + '"></td>'
    }
    tableRow += '</tr>';
    $('.mm-active').after(tableRow)

    console.log(tableRow)
}

function setBullet(columnIdx, value) {
    $('#chooser-' + columnIdx).removeClass();
    $('#chooser-' + columnIdx).addClass('bullet ' + value);
    $('#overlay-' + columnIdx).slideUp(150);
}

$(document).ready(function() {
    $('#check').click(check)
    $('.logo').click(init)
    $('div[id^="overlay-"]').each(function(idx, elem) {
        $('#chooser-' + (idx + 1)).click(function(){
            $('#overlay-' + (idx + 1)).slideDown(150)
        })
    })
    init()
});
