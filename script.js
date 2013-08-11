jQuery(document).ready(function($){
    var cards = [{'name':'<h1>A</h1>','fingering':'<img src="assets/img/fingering/A.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/A.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/A.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>B</h1>','fingering':'<img src="assets/img/fingering/B.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/B.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/B.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>C</h1>','fingering':'<img src="assets/img/fingering/C.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/C.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/C.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>D</h1>','fingering':'<img src="assets/img/fingering/D.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/D.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/D.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>E</h1>','fingering':'<img src="assets/img/fingering/E.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/E.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/E.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>F</h1>','fingering':'<img src="assets/img/fingering/F.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/F.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/F.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>G</h1>','fingering':'<img src="assets/img/fingering/G.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/G.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/G.mp3" type="audio/mpeg"></audio>'}];
    var options = {'manual_key':'','cards_set':'10','control_type':'automatic','deck':'basic-cello','delay':'5','front':['name','staff'],'back':['fingering','sound'],'manual':'button','timeout':'5'};
    var groupIndex = 0;
    var groupLimit = parseInt(options.cards_set, 10);
    var randomCard = function(last) {
        var index = -1;
        if (last) {
            index = _.indexOf(cards, last);
            cards.splice(index, 1);
        }
        var returnObj = cards[_.random(cards.length-1)];
        if (last) {
            cards.splice(index, 0, last);
        }
        return returnObj;
    };
    var flipCard = function(card) {
        var $back = $('#game .card .back').show().siblings().hide().end();
        $back.html('');
        for (var b in options.back) {
            $back.append(card[options.back[b]]);
        }
        groupIndex = groupIndex + 1;
        if (groupIndex < groupLimit) {
            if (options.control_type === 'automatic') {
                setTimeout(function(){
                    showCard(randomCard(card));
                }, parseInt(options.delay, 10) * 1000);
            } else {
                $('#next-card').show().data('card', JSON.stringify(card));
            }
        }
    };
    var showCard = function(card) {
        var clue = options.front[_.random(options.front.length-1)];
        var $front = $('#game .card .front').show().siblings().hide().end();
        $front.html(card[clue]);
        if (options.control_type === 'automatic') {
            setTimeout(function(){
                flipCard(card);
            }, parseInt(options.timeout, 10) * 1000);
        } else {
            $('#flip-card').show().data('card', JSON.stringify(card));
        }
    };
    // On submit, record options
    $('#options').on('submit', function(e){
        e.preventDefault();
        var opts = {};
        $('#options input[type="text"], #options input[type="number"], #options input[type="radio"]:checked').each(function(){
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
        if (opts.control_type === 'manual') {
            $('#game .controls').show().find('button').hide();
        }
        options = opts;
        showCard(randomCard());
    });
    // Set options to defaults
    $('#defaults').on('click', function(){
        $('#options input[type="text"]').each(function(){
            var $this = $(this);
            $this.val($this.data('default'));
        });
        $('#options input[type="checkbox"], #options input[type="radio"]').each(function(){
            var $this = $(this);
            if ($this.data('default')) {
                $this.prop('checked', 'checked');
            } else {
                $this.prop('checked', '');
            }
        });
        $('.automatic-group').show();
        $('.manual-group').hide();
    });
    $('.control-type').on('click', function(){
        var $this = $(this);
        if ($this.val() === 'automatic') {
            $('.automatic-group').show();
            $('.manual-group').hide();
        }
        if ($this.val() === 'manual') {
            $('.automatic-group').hide();
            $('.manual-group').show();
        }
    });
    $('#flip-card').on('click', function(){
        var $this = $(this).hide();
        var card = JSON.parse($this.data('card'));
        $this.data('card','');
        flipCard(card);
    });
    $('#next-card').on('click', function(){
        var $this = $(this).hide();
        var card = JSON.parse($this.data('card'));
        $this.data('card','');
        showCard(randomCard(card));
    });
});