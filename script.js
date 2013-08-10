jQuery(document).ready(function($){
    var cards = [{'name':'<h1>A</h1>','fingering':'<img src="assets/img/fingering/A.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/A.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/A.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>B</h1>','fingering':'<img src="assets/img/fingering/B.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/B.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/B.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>C</h1>','fingering':'<img src="assets/img/fingering/C.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/C.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/C.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>D</h1>','fingering':'<img src="assets/img/fingering/D.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/D.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/D.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>E</h1>','fingering':'<img src="assets/img/fingering/E.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/E.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/E.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>F</h1>','fingering':'<img src="assets/img/fingering/F.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/F.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/F.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>G</h1>','fingering':'<img src="assets/img/fingering/G.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/G.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/G.mp3" type="audio/mpeg"></audio>'}];
    var options = {'manual_key':'','cards_set':'10','deck':'basic-cello','front':['name','staff'],'back':['fingering','sound'],'manual':[],'timeout':'5'};
    var groupIndex = 0;
    var groupLimit = parseInt(options.cards_set, 10);
    var randomCard = function(last) {
        var arr = cards;
        var index = -1;
        if (last) {
            index = _.indexOf(arr, last);
            arr.splice(index, 1);
        }
        return arr[_.random(arr.length-1)];
        console.log(cards);
    };
    var flipCard = function(card) {
        var $back = $('#game .card .back').show().siblings().hide().end();
        $back.html('');
        for (var b in options.back) {
            $back.append(card[options.back[b]]);
        }
        groupIndex = groupIndex + 1;
        if (groupIndex < groupLimit) {
            setTimeout(function(){
                showCard(randomCard(card));
            }, parseInt(options.timeout, 10) * 1000);
        }
    };
    var showCard = function(card) {
        var clue = options.front[_.random(options.front.length-1)];
        var $front = $('#game .card .front').show().siblings().hide().end();
        $front.html(card[clue]);
        setTimeout(function(){
            flipCard(card);
        }, parseInt(options.timeout, 10) * 1000);
    };
    $('#options').on('submit', function(e){
        e.preventDefault();
        var opts = {};
        $('#options input[type="text"], #options input[type="radio"]:checked').each(function(){
            var $this = $(this);
            opts[$this.prop('name')] = $this.val();
        });
        $('#options input[type="checkbox"]').each(function(){
            var $this = $(this);
            opts[$this.prop('name')] = opts[$this.prop('name')] || [];
            if ($this.is(':checked')){
                opts[$this.prop('name')].push($this.val());
            }
        });
        $('body').removeClass('setup');
        options = opts;
        showCard(randomCard());
    });
});