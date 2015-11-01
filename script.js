(function(){
    
    var direction = [];
    var speed = 200;
    var food;
    var size_field = 15;
    var current_score = 0;
    var record;
    if (localStorage.getItem('record')){
        record = localStorage.getItem('record');
        $('.record').text(record);
    }else{
        record = 0;
    }

    function initGame(){
        direction[0] = 3;
        snake = ["0_2","0_1","0_0"];
        fillField();
        createSnake();
        generateFood();
        setTimeout(function(){gameUpdate()}, speed);
    }
    initGame();

    $(document).on('keydown', function(e){
        if(e.keyCode == 37) { //left
            direction[0] !== 3 ? direction.push(1) : direction;
        }else if(e.keyCode == 38) { //up
            direction[0] !== 4 ? direction.push(2) : direction;
        }else if(e.keyCode == 39) { //right
            direction[0] !== 1 ? direction.push(3) : direction;
        }else if(e.keyCode == 40) { //down
            direction[0] !== 2 ? direction.push(4) : direction;
        }

    })    
    
    function fillField(){
        $('.main').html('');
    	for(var x = 0; x < size_field; x++){
    		for(var y = 0; y < size_field; y++){
    			$('.main').append('<div class=cell id=cell_'+x+'_'+y+'></div>');
    		}          
    	}
    }

    function createSnake(){
        $('#cell_0_0').addClass('snake');
        $('#cell_0_1').addClass('snake');
        $('#cell_0_2').addClass('snake head');
    }
   
    function generateFood(){
        var fx = Math.floor(Math.random() * size_field);
        var fy = Math.floor(Math.random() * size_field);
        if(!$('#cell_'+fx+'_'+fy).hasClass('snake') || !$('#cell_'+fx+'_'+fy).hasClass('food')){
           $('#cell_'+fx+'_'+fy).addClass('food');
           food = fx+'_'+fy;
        }else{ 
           generateFood();   
        } 
    }

    function scoreCounting(){
        current_score++;
        $('.cs').text(current_score);
        if(record < current_score){
            record++;
            localStorage.setItem('record',record);
            $('.record').text(localStorage.getItem('record'));
        }else{
            return;
        } 
    }

    function gameUpdate(){
        if (current_score >= 10){
            speed = 170;
        };

        var tail = snake.pop();
        $('#cell_'+tail).removeClass('snake');
        
        var head = snake[0];
        var rc = head.split('_');   
        var r = parseInt(rc[0]);
        var c = parseInt(rc[1]);

        if(direction.length > 1){
            direction.shift();
            if(direction.length > 1){
                switch(direction.shift()){
                   case 1: c=c-1; break;
                   case 2: r=r-1; break;
                   case 3: c=c+1; break;
                   case 4: r=r+1; break;
                }
            }else{
                switch(direction[0]){
                   case 1: c=c-1; break;
                   case 2: r=r-1; break;
                   case 3: c=c+1; break;
                   case 4: r=r+1; break;
                }
            }
        }else{
            switch(direction[0]){
               case 1: c=c-1; break;
               case 2: r=r-1; break;
               case 3: c=c+1; break;
               case 4: r=r+1; break;
            }
        }

        var new_head = ''+r+'_'+c;
        snake.unshift(new_head);

        if(new_head == food){
            snake.push(tail);
            $('#cell_'+tail).addClass('snake');
            $('#cell_'+food).removeClass('food');
            scoreCounting(); 
            generateFood();
        };

        if(c < 0 || r < 0 || c > (size_field - 1) || r > (size_field - 1) || $('#cell_'+new_head).hasClass('snake')){
            alert('Game Over');
            current_score = 0;
            $('.cs').text(current_score);
            speed = 200;
            return initGame();
        }else{
            $('#cell_'+new_head).addClass('snake head');
            $('#cell_'+head).removeClass('head');
            setTimeout(function(){gameUpdate()}, speed);  
        }     
    }


})();