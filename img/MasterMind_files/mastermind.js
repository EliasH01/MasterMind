function getColor() {
    var colors = ['A', 'B', 'C', 'D', 'E', 'F'];
    var min = 0;
    var max = 5;

    return colors[Math.round(Math.random() * max)];
}

function check() {
    var result = []
    $('.mm-active select').each(function(idx) {
        result.push($(this).val())
    })
    console.log(result)
    var tableRow = '<tr><td>'+result[0]+'</td><td>'+result[1]+'</td><td>'+result[2]+'</td><td>'+result[3]+'</td> <td></td><td></td><td></td><td></td></tr>';
    $('.mm-active').after(tableRow)

    console.log(tableRow)
}

$(document).ready(function() {
    $('#check').click(check)
});