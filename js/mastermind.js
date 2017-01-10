function getColor() {
    var colors = ['A', 'B', 'C', 'D', 'E', 'F'];
    var min = 0;
    var max = 5;

    return colors[Math.round(Math.random() * max)];
}

var game = [getColor(),getColor(),getColor(),getColor()];

function check() {
    var result = []
    $('div[id^="chooser-"]').each(function(idx) {
        var classArr = $(this).attr('class').split(' ');
        if (classArr[1] != undefined) {
            result.push(classArr[1])
        }
    })

    if (result.length < 4) return;
    var test = game.slice();
    var clr = 0;
    var clrpos = 0;

    $(result).each(function(idx,item) {
        console.log("outter: ", item, idx)
        $(test).each(function(idx2, item2) {
            console.log("inner", item2, idx2)
            if (item2 == item) {
                if (idx2 == idx) {
                    clrpos++;
                } else {
                    clr++;
                }
                test[idx2] = undefined;
            }
        })
    })



    console.log("Schwarze Möppen:" , clrpos, ", Weiße Möppen: ", clr)
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
    $('#overlay-' + columnIdx).hide();
}

$(document).ready(function() {
    $('#check').click(check)
});
