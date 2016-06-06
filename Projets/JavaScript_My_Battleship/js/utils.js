/*jslint browser this */
/*global _ */

(function (global) {
    "use strict";

    global.utils = {
        CELL_SIZE: 60,
        fire_snd: [],
        hit_snd: [],
        water_snd: [],
        ambient_msc: [],
        running_msc: undefined,

        init: function()
        {
            this.fire_snd[0] = new Audio("./snd/fire_00.wav");
            this.fire_snd[0].volume = 0.2;
            this.fire_snd[1] = new Audio("./snd/fire_01.mp3");
            this.fire_snd[1].volume = 0.2;

            this.hit_snd[0] = new Audio("./snd/hit_00.wav");
            this.hit_snd[0].volume = 0.2;
            this.hit_snd[1] = new Audio("./snd/hit_01.ogg");
            this.hit_snd[1].volume = 0.2;

            this.water_snd[0] = new Audio("./snd/water_00.mp3");
            this.water_snd[0].volume = 0.2;

            this.ambient_msc[0] = new Audio("./snd/backing_track_00.mp3");
            this.ambient_msc[0].volume = 0.2;
            this.ambient_msc[0].loop = true;

            this.ambient_msc[1] = new Audio("./snd/backing_track_01.ogg");
            this.ambient_msc[1].volume = 0.2;
            this.ambient_msc[1].loop = true;

            
        },
        // retourne la position (démarre à 1) du noeud passé en paramètre dans son parent
        eq: function (node) {
            var p = node.parentNode;
            var i = 0;
            var nbChildren = p.children.length;
            var c = p.children[i];

            while (c !== node && i < nbChildren) {
                i += 1;
                c = p.children[i];
            }
            if (c === node) {
                return i;
            } else {
                return null;
            }
        },
        // créer un tableau à deux dimension, chaque élément du tableau est définie à la valeur (optionelle) "value" (vaut 0 par défaut)
        createGrid: function (lines, columns, value) {
            var val = value !== undefined
                ? value
                : 0;
            var i = 0;
            var j;
            var grid = [];
            while (i < lines) {
                grid[i] = [];
                j = 0;
                while (j < columns) {
                    grid[i][j] = val;
                    j += 1;
                }
                i += 1;
            }
            return grid;
        },
        // permet de faire afficher un message dans une "boite" spécifique (le noeud qui a la classe game-info)
        info: function (msg) {
            var infoBox = document.querySelector('.game-info');

            infoBox.innerHTML = msg;
        },
        // permet de demander une confirmation à l'utilisateur
        // les 2 derniers paramètres sont des callback a exécuter en cas de confirmation pour le deuxième, ou d'infirmation pour le dernier
        confirm: function (message, confirm, cancel) {
            var clickCallback;
            var confirmBox = document.querySelector('#confirm');
            var btnContainer = confirmBox.querySelector('.btn-container');
            var msgContainer = confirmBox.querySelector('.message-container');
            clickCallback = function (e) {
                if (e.target.classList.contains('btn')) {
                    this.removeEventListener('click', clickCallback);
                    confirmBox.style.display = "none";
                    if (e.target.classList.contains('confirm-ok')) {
                        if (confirm) {
                            confirm.call();
                        }
                    } else {
                        if (cancel) {
                            cancel.call();
                        }
                    }
                }
            };

            btnContainer.addEventListener('click', clickCallback);

            confirmBox.style.display = 'block';

            msgContainer.innerHTML = message;
        },
        // Fonction random qui retourne un nombre de a (inclu) a b (inclu)
        rand_number: function(a, b)
        {
            b++;
            return (Math.floor(Math.random() * (b - a)) + a);
        },
        // Play sound
        play_sound: function(name, delay)
        {
            var self = this;
            setTimeout(function()
            {
                if (name == "fire")
                {
                    var n = utils.rand_number(0, self.fire_snd.length - 1)
                    self.fire_snd[n].play();
                }
                else if (name == "hit")
                {
                    var n = utils.rand_number(0, self.hit_snd.length - 1)
                    self.hit_snd[n].play();
                }
                else if (name == "water")
                {
                    var n = utils.rand_number(0, self.water_snd.length - 1)
                    self.water_snd[n].play();
                }
            }, delay);
        },
        play_music: function(index, delay)
        {
            var self = this;
            if (self.running_msc !== undefined)
            {
                self.ambient_msc[self.running_msc].pause();
                self.ambient_msc[self.running_msc].currentTime = 0;
                setTimeout(function()
                {
                    self.ambient_msc[index].play();
                }, delay)
            }
            else
                this.ambient_msc[index].play();
            this.running_msc = index;
        }
    };

}(this));
