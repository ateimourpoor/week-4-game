$(document).ready(function () {

    var characters= {
        "Aragorn": {
            name: "Aragorn",
            health: 120,
            attack: 8,
            link: "assets/images/aragorn.jpg",
            counterAttack: 15
        },
        "Tauriel": {
            name: "Tauriel",
            health: 100,
            attack:3,
            link: "assets/images/tauriel.jpg",
            counterAttack: 5
        },
        "Legolas": {
            name: "Legolas",
            health: 150,
            attack: 8,
            link: "assets/images/legolas.jpg",
            counterAttack: 20
        },
        "Bolg": {
            name: "Bolg",
            health: 180,
            attack: 7,
            link: "assets/images/bolg.jpg",
            counterAttack: 25
        }
    };

    console.log(characters)

    var attCharacter;
    var remCharacters    = [];
    var defCharacter;
    var attCounter = 1;
    var kills = 0;
    var killedCharacters =[];


    var showCharacter = function (character, showlocation) {
        var charDiv = $("<div class='character' value='" + character.name + "'>");
        var charName = $("<div class='charcter-name'>").text(character.name);
        var imageName =$("<img class='character-image' alt='image'>").attr("src", character.link);
        var charHealth =$("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(imageName).append(charHealth);
        $(showlocation).append(charDiv);
    };

    var initializeGame = function () {
        for (var key in characters) {
            showCharacter(characters[key], ".allCharacters");
        }
    };

    initializeGame();


    var avlEnemy =function(enemyList){
        for (var i = 0; i < enemyList.length; i++) {
            showCharacter(enemyList[i], ".avaialable-enemies");
        }
    };



    var RestartGame = function() {
        var resButton =$("<button>Restart</button>").click(function () {
            location.reload();

        });

        $("body").append(resButton);

    };






    $(".allCharacters").on("click",".character", function () {
        var name = $(this).attr("value");
        if(!attCharacter){
            attCharacter = characters[name];
            for(var key in characters){
                if(key !== name){
                    remCharacters.push(characters[key]);
                }
            }
            console.log(remCharacters);
            $(".allCharacters").empty();
            showCharacter(attCharacter, ".attacker");
            avlEnemy(remCharacters);
        }

    })

    $(".avaialable-enemies").on("click", ".character", function () {
        var name = $(this).attr("value");
        if(attCharacter !== "" && !defCharacter){
            $(".attack-result").empty();
            $(".defend-result").empty();
            remCharacters =[];
            defCharacter = characters[name];
            console.log(killedCharacters);
            for(var key in characters){
                console.log(killedCharacters);
                if(key !== name && key!== attCharacter.name && killedCharacters.indexOf(key)=== -1){
                    remCharacters.push(characters[key]);
                }
            }
            $(".avaialable-enemies").empty();
            showCharacter(defCharacter, ".defender");
            avlEnemy(remCharacters);
        }
    })

    $("#attButton").on("click",function(){
        if(attCharacter !== "" && defCharacter !== ""){
            var attPower = attCharacter.attack * attCounter;
            attCounter++;
            defCharacter.health = defCharacter.health - attPower;

            var attkResult = attCharacter.name+ " attacked " + defCharacter.name + " for " + (attPower) + " damage.";
            var defResult = defCharacter.name + " attacked you back for " + defCharacter.counterAttack + " damage.";



            if(defCharacter.health < 0){
                showCharacter(defCharacter,".dead-pool")
                $(".dead-pool").animate({ right: "-=200px" }, "normal");
                killedCharacters.push(defCharacter.name);
                console.log(killedCharacters);
                var winresult = attCharacter.name + " defeted " + defCharacter.name+ ". You can choose to fight another enemy";
                $(".defend-result").text(winresult);
                $(".attack-result").empty();

                defCharacter ="";
                $(".defender").empty();
                kills++;

                if( kills >= 3){
                    $(".attack-result").empty();
                    $(".defend-result").empty();
                    var victory = "You won, Amazing Job";
                    $(".defend-result").text(victory);
                    RestartGame();
                }

                console.log(defCharacter);

            }
            else {
                attCharacter.health = attCharacter.health - defCharacter.attack;
                console.log(attkResult);

                $(".attack-result").text(attkResult);
                $(".defend-result").text(defResult);

                $(".attacker").empty();
                $(".defender").empty();
                showCharacter(attCharacter, ".attacker");
                showCharacter(defCharacter, ".defender");

                console.log(attCharacter.health);
                console.log(defCharacter.health);
                if(attCharacter.health < 0){

                    RestartGame();
                    $("#attButton").unbind("click");
                    $(".attack-result").empty();
                    $(".defend-result").empty();
                    var looser =$("<h1 class='looser'>").text("Such A Looser");
                    $(".defend-result").append(looser);
                    //var looser = "Such a Looser";
                    //$(".defend-result").text(looser);
                }



            }
            console.log(remCharacters);
        }


    })




});








