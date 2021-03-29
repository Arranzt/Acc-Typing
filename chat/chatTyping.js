    
    //変数定義
    var random;

    var idCount = 0;

    //タイムリミット
    var time_limit = 300;

    //カウントダウンの数字
    var readytime = 3;

    //スコア変数
    var score;

    //正解の数の記憶を行う変数
    var correct;

    //誤タイピングの数の記憶を行う変数
    var mistake;

    var char_num = 0;

    var counter = 0;

    var word_char;

    var test=1;

    var gametimer;

    var input_num = 0;

    //supportWordのカウント
    var support_word_num = 0;

    //customerWordのカウント
    var customer_word_num = 0;

    window.onload = function(){
        ready();
    };

    function scroll(){
        scrollBy(0, 500);
    }

    function scrollTop(){
        scrollTo(0, 0);
    }

    //関数処理

    //タイマー処理
    function ready(){
        readytime = 3;
        scoredis.innerHTML="";
        flexheight.style.height = "180px";
        a.style.display = "none";
        b.style.display = "none";
        start_button.style.visibility ="hidden";
        reset_button.style.visibility ="hidden";
        // unvisible.style.visibility ="hidden";
        var readytimer = setInterval(function(){
            count.style.fontSize = "2em";
            count.innerHTML=readytime;
            readytime--;
            if(readytime < 0){
                clearInterval(readytimer);
                gameStart();
                }
        },1000);
    }

    //ゲームスタート機能
    function gameStart(){
        score = 0.0;
        mistake = 0;
        correct = 0;
        flexheight.style.height = "100%";
        count.style.visibility ="hidden";
        start_button.style.visibility ="hidden";
        reset_button.style.visibility ="hidden";
        a.style.display = "block";
        b.style.display = "block";
        wordDisplay();
        var time_remaining = time_limit;
        gametimer = setInterval(function(){
            timerCountNum.innerHTML="残りタイム<br>"+time_remaining;
            inputNum.style.color = "white";
            inputNum.style.backgroundColor = "transparent";
            inputCount.innerHTML = "入力文字数<br>"+input_num;
            time_remaining--;
            if(time_remaining <= -1){
                clearInterval(gametimer)
                finish();
                scrollTop();
        }
        },1000);
    }

    function gameStop(){
        clearInterval(gametimer);
    }

    //表示機能
    function wordDisplay(){
        random = Math.floor( Math.random() * supportWordList.length );
        word.innerHTML=supportWordList[random][support_word_num];
        japanese.innerHTML=supportWordlistJapanese[random][support_word_num];
        charInsort();
    }
    
    function charInsort(){
        word_char = supportWordList[random][support_word_num].charAt(char_num);
    }

    function finish(){
        score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
        scoredis.innerHTML="スコア:"+score+"点"+"<hr>正タイプ数:"+correct+"<br>ミスタイプ数:"+mistake+"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
        gameStop();
        checker.style.visibility = "hidden";
        count.innerHTML="";
        start_button.style.visibility ="visible";
        reset_button.style.visibility ="visible";
        word_char=0;
        support_word_num = 0;
        customer_word_num = 0;
        idCount = 0;
        char_num = 0;
    }

    document.onkeydown = function(e) {
        if(e.keyCode == 189){
            keyStr = "-";
            }else if(e.keyCode == 188){
                    keyStr = ","
                    }else if(e.keyCode == 190){
                        keyStr = "."
                    }else if(e.keyCode == 191){
                        keyStr = "・"
                        }else if(e.keyCode == 219){
                            keyStr = "「"
                        }else if(e.keyCode == 221){
                            keyStr = "」"
                        }else{
    var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
    }

    function newCustomerBalloon(){
        //左側のテキストの追加
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "balloon");

        var newFigure = document.createElement("figure");
        newFigure.setAttribute("class", "balloon-image-left");

        var newImg = document.createElement("img");
        newImg.setAttribute("src", "kaisya_komaru_man.png");
        newImg.setAttribute("alt", "no-img2");

        var newFigcaption = document.createElement("figcaption");
        newFigcaption.setAttribute("class", "balloon-image-description");
        newFigcaption.innerHTML = "Customer";

        var newBalloonText = document.createElement("div");
        newBalloonText.setAttribute("class", "balloon-text-right");

        var newP = document.createElement("p");
        newP.setAttribute("class", "customerWord");
        newP.innerHTML = customerWordLists[random][customer_word_num];

        var parentDiv = document.getElementById("sup");
        parentDiv.appendChild(newDiv);

        newDiv.appendChild(newFigure);
        newFigure.appendChild(newImg);
        newFigure.appendChild(newFigcaption);
        newDiv.appendChild(newBalloonText);
        newBalloonText.appendChild(newP);
    }

    function newSupportBalloon(){
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "balloon");

        var newFigure = document.createElement("figure");
        newFigure.setAttribute("class", "balloon-image-right");

        var newImg = document.createElement("img");
        newImg.setAttribute("src", "ope.png");
        newImg.setAttribute("alt", "no-img2");

        var newFigcaption = document.createElement("figcaption");
        newFigcaption.setAttribute("class", "balloon-image-description");
        newFigcaption.innerHTML = "Support";

        var newBalloonText = document.createElement("div");
        newBalloonText.setAttribute("class", "balloon-text-left");

        var newJapanese = document.createElement("p");
        newJapanese.setAttribute("class", "supportWord japaneseSize");
        newJapanese.innerHTML = supportWordlistJapanese[random][support_word_num];

        var newChecker = document.createElement("span");
        newChecker.setAttribute("id", "checker"+idCount);
        newChecker.innerHTML = "<br>";

        var newWord = document.createElement("p");
        newWord.setAttribute("id", "word"+idCount);
        newWord.setAttribute("class", "supportWord wordSize");
        newWord.innerHTML = supportWordList[random][support_word_num];

        var box = document.getElementById("box");
        var parentDiv = document.getElementById("sup");

        parentDiv.appendChild(newDiv);

        newDiv.appendChild(newFigure);
        newFigure.appendChild(newImg);
        newFigure.appendChild(newFigcaption);
        newDiv.appendChild(newBalloonText);
        newBalloonText.appendChild(newJapanese);
        newBalloonText.appendChild(newChecker);
        newBalloonText.appendChild(newWord);
        scroll();
        charInsort();
    }

    if(keyStr !== word_char){
        if(supportWordList[random][support_word_num] == supportWordList[random][0]){
            checker.innerHTML = "<span class='failed'>タイプミス!</span>";
            mistake ++;
        }else{
            var failCheckers = document.getElementById("checker"+idCount);
            failCheckers.innerHTML = "<span class='failed'>タイプミス!</span>";
            mistake ++;
        }
    }
    
        if(keyStr == word_char){
            if(supportWordList[random][support_word_num] == supportWordList[random][0]){
                checker.innerHTML = "<br>";
                word.innerHTML="<span class='ok'>"+supportWordList[random][support_word_num].substr(0,char_num+1)+"</span>"+supportWordList[random][support_word_num].substr(char_num+1,supportWordList[random][support_word_num].length);
                char_num++;
                correct++;
                input_num++;
                charInsort();
            }else if(supportWordList[random][support_word_num] == supportWordList[random][counter]){
                var addWords = document.getElementById("word"+idCount);
                addWords.innerHTML="<span class='ok'>"+supportWordList[random][support_word_num].substr(0,char_num+1)+"</span>"+supportWordList[random][support_word_num].substr(char_num+1,supportWordList[random][support_word_num].length);
                var successCheckers = document.getElementById("checker"+idCount);
                successCheckers.innerHTML = "<br>";
                input_num ++;
                char_num++;
                correct++;
                charInsort();
            
                }else if(supportWordList[random][support_word_num] == "undefined"){
                    finish();
                    scrollTop();
                    } else {
                        finish();
                        scrollTop();                              
                    }
        }
    
        //最後の配列の値の長さと入力文字数が一致するまで処理
    if(supportWordList[random][support_word_num] == undefined){
        count.style.visibility ="hidden";
        scrollTop();
        gameStop();
        finish();
        }else if(char_num == supportWordList[random][support_word_num].length){
            if(customerWordLists[random][customer_word_num] == undefined){
                scrollTop();
                gameStop();
                finish();
            }else{
            char_num = 0 ;
            idCount++;
            counter ++;
            support_word_num ++;
            newCustomerBalloon();
            customer_word_num ++;
            newSupportBalloon();
            }   
        }
    }