var pokemon_img = document.getElementById("pokemon_img");
var pokemon_id = document.getElementById("pokemon_id");
var text_input = document.getElementById("text_input");

var pages = [];
pages[0] = document.getElementById("page_1");
pages[1] = document.getElementById("page_2");
pages[2] = document.getElementById("page_3");
pages[3] = document.getElementById("page_4");

var current_id = 1;
var current_page = 1;
var current_music = 0;

function init() {

    play_snd("public/snd/open.wav", 0.5);
    //play_snd("public/snd/bg.mp3", 0.05);
    change_pokemon(current_id);
}

function change_image(id) {

    pokemon_img.src = "public/img/front/" + id + ".png";
    pokemon_img.onload = function() {
        play_snd("public/snd/ping_1.wav", 0.5);
    }
}

function change_informations(id) {


}

function change_input_text(id) {

    var pokemon = pokemon_list[id - 1];
    text_input.value = pokemon.name;

}

function change_pokemon_id(id) {

    pokemon_id.innerHTML = pokemon_list[id - 1].id;
}

function change_pokemon(id) {

    change_input_text(id);
    change_pokemon_id(id);
    change_image(id);
}

function change_page(page) {

    for (var i = 0; i < pages.length; ++i)
        pages[i].style.display = "none";
    pages[page - 1].style.display = "block";
}

function text_input_changed(event, val) {

    if (event.keyCode == 13) {

        for (var i = 0; i < pokemon_list.length; ++i)
        {

            if (pokemon_list[i].name.toLowerCase() == val.toLowerCase())
            {

                current_id = Number(pokemon_list[i].id)
                change_pokemon(current_id);
                return ;
            }
            else if (Number(pokemon_list[i].id) == Number(val))
            {

                current_id = Number(val);
                change_pokemon(current_id);
                return ;
            }
        }
    }
}

function pokedex_ctrl($scope) {

    $scope.name = current_id;

    $scope.a_button_click = function() {

        current_id = 1;
        change_pokemon(current_id);
    }

    $scope.select_button_click = function() {

        alert("select_button_click");
    }

    $scope.start_button_click = function() {

        alert("start_button_click");
    }

    $scope.up_button_click = function() {

        if (current_id == 151) {
            play_snd("public/snd/ping_2.wav", 0.1);
            return ;
        }
        else {
            current_id += 10;
            if (current_id > 151) {
                current_id = 151;
            }
            play_snd("public/snd/ping_4.wav", 0.1);
            change_pokemon(current_id);
            $scope.update_pages(current_id);
        }
    }

    $scope.down_button_click = function() {

        if (current_id == 1) {
            play_snd("public/snd/ping_2.wav", 0.1);
            return ;
        }
        else {
            current_id -= 10;
            if (current_id < 1) {
                current_id = 1;
            }
            play_snd("public/snd/ping_4.wav", 0.1);
            change_pokemon(current_id);
            $scope.update_pages(current_id);
        }
    }

    $scope.left_button_click = function() {

        if (current_id > 1) {
            --current_id;
            play_snd("public/snd/ping_4.wav", 0.1);
            change_pokemon(current_id);
            $scope.update_pages(current_id);
        }
        else {
            play_snd("public/snd/ping_2.wav", 0.1);
        }
    }

    $scope.right_button_click = function() {

        if (current_id < 151) {
            ++current_id;
            play_snd("public/snd/ping_4.wav", 0.1);
            change_pokemon(current_id);
            $scope.update_pages(current_id);
        }
        else {
            play_snd("public/snd/ping_2.wav", 0.1);
        }
    }

    $scope.b_button_click = function() {

        alert("b_button_click");
    }

    $scope.c_button_click = function() {

        alert("c_button_click");
    }

    $scope.prev_button_click = function() {

        if (current_page > 1) {
            --current_page;
            play_snd("public/snd/init_2.wav", 0.1);
            change_page(current_page);
        }
        else {
            play_snd("public/snd/ping_2.wav", 0.1);
        }
    }

    $scope.next_button_click = function() {

        if (current_page < 4) {
            ++current_page;
            play_snd("public/snd/init_1.wav", 0.1);
            change_page(current_page);
        }
        else {
            play_snd("public/snd/ping_2.wav", 0.1);
        }
    }

    $scope.op1_button_click = function() {

        alert("op1_button_click");
    }

    $scope.op2_button_click = function() {

        alert("op2_button_click");
    }

    $scope.update_pages = function(id) {

        // Nom du Pokemon
        $scope.name = pokemon_list[id - 1].name;

        // Especes du Pokemon
        $scope.species = pokemon_list[id - 1].species;

        // Types du Pokemon
        var types = " ";
        for (var i = 0; i < pokemon_list[id - 1].type.length; ++i)
            types += pokemon_list[id - 1].type[i] + " ";
        $scope.types = types;

        // Taille du Pokemon
        $scope.height = pokemon_list[id - 1].height;

        // Poids du Pokemon
        $scope.weight = pokemon_list[id - 1].weight;

        // Competances du Pokemon
        var abilities = " ";
        for (var i = 0; i < pokemon_list[id - 1].abilities.length; ++i)
            abilities += pokemon_list[id - 1].abilities[i] + " ";
        $scope.abilities = abilities;

        // Evolution du Pokemon
        var evolution = " ";
        for (var i = 0; i < pokemon_list[id - 1].evolution.lenght; ++i)
            evolution += pokemon_list[id - 1].evolution[i] + " ";
        $scope.evolution = evolution;
    }
    $scope.update_pages(current_id);
};

function play_snd(src, vol) {

    var snd = new Audio(src);
    snd.volume = vol;
    snd.play();
}

function change_music() {


}
