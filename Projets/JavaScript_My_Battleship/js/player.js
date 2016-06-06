/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {dom: {parentNode: {removeChild: function () {}}}};

    var player = {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            // console.log(col + ' ' + line);
            this.game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
                if (hasSucced)
                    this.game.grid.querySelector('.row:nth-child(' + (line + 1) + ') .cell:nth-child(' + (col + 1) + ')').style.background = "#c55";
                else
                    this.game.grid.querySelector('.row:nth-child(' + (line + 1) + ') .cell:nth-child(' + (col + 1) + ')').style.background = "#aaa";
            }, this));
        },
        
        // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        
        receiveAttack: function (col, line, callback) {
            var succeed = false;

            if (this.grid[line][col] !== 0) {
                if (this.grid[line][col] == 1)
                {
                    this.fleet[0].life--;
                    if (this.fleet[0].life == 0)
                        document.querySelector(".battleship").className += " sunk";
                }
                else if (this.grid[line][col] == 2)
                {
                    this.fleet[1].life--;
                    if (this.fleet[1].life == 0)
                        document.querySelector(".destroyer").className += " sunk";
                }
                else if (this.grid[line][col] == 3)
                {
                    this.fleet[2].life--;
                    if (this.fleet[2].life == 0)
                        document.querySelector(".submarine").className += " sunk";
                }
                else if (this.grid[line][col] == 4)
                {
                    this.fleet[3].life--;
                    if (this.fleet[3].life == 0)
                        document.querySelector(".small-ship").className += " sunk";
                }
                this.grid[line][col] = 0;
                succeed = true;
            }
            callback.call(undefined, succeed);
        },
        // setActiveShipPosition: function (x, y) {
        //     var ship = this.fleet[this.activeShip];
        //     var i = 0;

        //     while (i < ship.getLife()) {
        //         this.grid[y][x + i] = ship.getId();
        //         i += 1;
        //     }

        //     return true;
        // },
        setActiveShipPosition: function (x, y, placement) {
            var ship = this.fleet[this.activeShip];
            var ship_id = ship.getId();
            var i = 0;

            if (placement == 0)
            {
                if ((ship_id == 1 || ship_id == 2) && (x >= 2) && (x <= 7))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y][x - 2 + i] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y][x - 2 + i] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
                else if ((ship_id == 3) && (x >= 2) && (x <= 8))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y][x - 2 + i] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y][x - 2 + i] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
                else if ((ship_id == 4) && (x >= 1) && (x <= 8))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y][x - 1 + i] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y][x - 1 + i] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
            }
            else
            {
                if ((ship_id == 1 || ship_id == 2) && (y >= 2) && (y <= 7))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y - 2 + i][x] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y - 2 + i][x] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
                else if ((ship_id == 3) && (y >= 2) && (y <= 8))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y - 2 + i][x] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y - 2 + i][x] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
                else if ((ship_id == 4) && (y >= 1) && (y <= 8))
                {
                    while (i < ship.getLife()) {
                        if (this.grid[y - 1 + i][x] != 0)
                            return (false);
                        i += 1;
                    }
                    i = 0;
                    while (i < ship.getLife()) {
                        this.grid[y - 1 + i][x] = ship_id;
                        i += 1;
                    }
                    return (true);
                }
            }
            return (false);
        },
        clearPreview: function () {
            utils.play_music(1, 1000);
            this.fleet.forEach(function (ship) {
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom); // enfanticide
                }
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        },
        renderTries: function (grid) {
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';
                    }
                });
            });
        },
        renderShips: function (grid) {
            var i = 0;
            var j = 0;

            while (j < this.grid.length)
            {
                while (i < this.grid[j].length)
                {

                    var node = grid.querySelector('.row:nth-child(' + (i + 1) + ') .cell:nth-child(' + (j + 1) + ')');
                    if (this.grid[i][j] == 1)
                        node.style.backgroundColor = "#e60019";
                    else if (this.grid[i][j] == 2)
                        node.style.backgroundColor = "#577cc2";
                    else if (this.grid[i][j] == 3)
                        node.style.backgroundColor = "#56988c";
                    else if (this.grid[i][j] == 4)
                        node.style.backgroundColor = "#203140";
                    i++;
                }
                i = 0;
                j++;
            }
        },
        setGame: function(game) {
            this.game = game;
        }
    };

    global.player = player;

}(this));