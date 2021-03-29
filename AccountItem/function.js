//タイムリミット
var time_limit = 60;

//カウントダウンの数字
var readytime = 3;

//スコア変数
var score;

//正解の数の記憶を行う変数
var correct;

//誤タイピングの数の記憶を行う変数
var mistake;

var char_num = 0;

var input_num = 0;

var word_char;

var random;

window.onload = function(){
    ready();
};

//入力処理セクション

//startボタンクリック時に起動する関数
//タイマー処理
function ready(){
    readytime = 3;
    scoredis.innerHTML="";
    acItemDetail.style.visibility ="hidden";
    start_button.style.visibility ="hidden";
    reset_button.style.visibility ="hidden";
    inputNum.style.visibility = "hidden";
    var readytimer = setInterval(function(){
        count.style.fontSize = "2em";
        count.innerHTML=readytime;
        readytime--;
        if(readytime < 0){
        clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}

//ゲームスタート機能
function gameStart(){
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    acItemDetail.style.visibility ="visible";
    var time_remaining = time_limit;
    var gametimer = setInterval(function(){
    count.innerHTML="残り時間："+time_remaining;
    inputNum.style.visibility = "visible";
    inputNum.style.color = "white";
    inputNum.style.fontSize = "2em";
    inputNum.innerHTML = "入力文字数:"+input_num;
        time_remaining--;
        if(time_remaining <= -1){
        clearInterval(gametimer);
            finish();
    }
    }, 1000);
}

//表示機能
function wordDisplay(){
    random = Math.floor( Math.random() * wordlist.length );
    word.innerHTML=wordlist[random];
    japanese.innerHTML=wordlistJapanese[random];
    acItemDetail.innerHTML=acItemDescription[random];
    charInsort();
}

//charAt()文字列内から、特定の文字を返す
function charInsort(){
    word_char = wordlist[random].charAt(char_num);
}

//ゲーム終了時
function finish(){
    score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
    scoredis.innerHTML="スコア:"+score+"点"+"<hr>正タイプ数:"+correct+"<br>ミスタイプ数:"+mistake+"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
    count.innerHTML="";
    word.innerHTML="";
    japanese.innerHTML="";
    checker.innerHTML = "";
    acItemDetail.style.visibility ="hidden";
    start_button.style.visibility ="visible";
    reset_button.style.visibility ="visible";
    word_char=0;
    random = 0;
    char_num = 0;
    input_num = 0;
}

//キーダウン時処理
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

//タイピング判定処理
if(keyStr == word_char){
    input_num ++;
    checker.innerHTML = "";
    word.innerHTML="<span class='ok'>"+wordlist[random].substr(0,char_num+1)+"</span>"+wordlist[random].substr(char_num+1,wordlist[random].length);
    char_num++;
    correct++;
    charInsort();
    }else if(input_num != 0){
        checker.innerHTML = "<span class='failed'>タイプミス!</span>";
        mistake++;
    }else{
        return;
    }

    if(char_num == wordlist[random].length){
        char_num=0;
        wordDisplay();
        }
    };