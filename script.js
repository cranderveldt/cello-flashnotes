jQuery(document).ready(function($){
    var cards = [{'name':'<h1>High A</h1>','fingering':'<img src="assets/img/fingering/high-A.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-A.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/A.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High B</h1>','fingering':'<img src="assets/img/fingering/high-B.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-B.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/B.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High C</h1>','fingering':'<img src="assets/img/fingering/high-C.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-C.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/C.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High D</h1>','fingering':'<img src="assets/img/fingering/high-D.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-D.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/D.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High E</h1>','fingering':'<img src="assets/img/fingering/high-E.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-E.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/E.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High F</h1>','fingering':'<img src="assets/img/fingering/high-F.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-F.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/F.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>High G</h1>','fingering':'<img src="assets/img/fingering/high-G.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/high-G.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/G.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low A</h1>','fingering':'<img src="assets/img/fingering/low-A.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-A.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/A.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low B</h1>','fingering':'<img src="assets/img/fingering/low-B.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-B.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/B.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low C</h1>','fingering':'<img src="assets/img/fingering/low-C.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-C.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/C.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low D</h1>','fingering':'<img src="assets/img/fingering/low-D.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-D.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/D.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low E</h1>','fingering':'<img src="assets/img/fingering/low-E.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-E.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/E.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low F</h1>','fingering':'<img src="assets/img/fingering/low-F.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-F.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/F.mp3" type="audio/mpeg"></audio>'},{'name':'<h1>Low G</h1>','fingering':'<img src="assets/img/fingering/low-G.jpg" alt="Fingering">','staff':'<img src="assets/img/staff/low-G.jpg" alt="Grand Staff">','sound':'<audio autoplay><source src="assets/audio/G.mp3" type="audio/mpeg"></audio>'}];
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
    var addKeyListener = function() {

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
            if (opts.manual === 'keypress') {
                addKeyListener();
            } else {
                $('#game .controls').show().find('button').hide();
            }
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