/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        ia_state: [0, 0, 0],
        basicIA: function() {
            var result = [2];
            
            if (this.ia_state[0] == 0)
            {
                do
                {
                    result[0] = utils.rand_number(0, 9);
                    result[1] = utils.rand_number(0, 9);
                }while (this.tries[result[0]][result[1]] !== 0);
            }
            return (result);
        },

        play: function () {
            var self = this;
            setTimeout(function () {
                if (localStorage.getItem("difficulty") == 1)
                    var result = self.basicIA();
                else if (localStorage.getItem("difficulty") == 3)
                    var result = self.basicIA();
                else
                    var result = self.basicIA();
                var line = result[0];
                var col = result[1];

                self.game.fire(this, line, col, function (hasSucced) {
                    self.tries[line][col] = hasSucced;
                    if (hasSucced)
                        self.game.miniGrid.querySelector('.row:nth-child(' + (col + 1) + ') .cell:nth-child(' + (line + 1) + ')').style.background = "#c55";
                    else
                        self.game.miniGrid.querySelector('.row:nth-child(' + (col + 1) + ') .cell:nth-child(' + (line + 1) + ')').style.background = "#aaa";
                    });
            }, 2000);
        },
        placeShips: function (callback) {
            var ship_1 = false;
            var ship_2 = false;
            var ship_3 = false;
            var ship_4 = false;
            while (ship_1 == false)
                ship_1 = this.placeShip(5);
            while (ship_2 == false)
                ship_2 = this.placeShip(6);
            while (ship_3 == false)
                ship_3 = this.placeShip(7);
            while (ship_4 == false)
                ship_4 = this.placeShip(8);
            
            setTimeout(function () {
                callback();
            }, 5);
            //log_grid(this.grid);
        },
        placeShip: function(id)
        {
            var life;
            var posx;
            var posy;
            var pos;
            var i = 0;
            if (id == 5 || id == 6)
            {
                life = 5;
                pos = utils.rand_number(0, 1);
                if (pos == 0)
                {
                    posx = utils.rand_number(0, 5);
                    posy = utils.rand_number(0, 9);
                    while (i < life)
                    {
                        if (this.grid[posx + i][posy] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx + i][posy] = id
                        i++;
                    }
                }
                else if (pos == 1)
                {
                    posx = utils.rand_number(0, 9);
                    posy = utils.rand_number(0, 5);
                    while (i < life)
                    {
                        if (this.grid[posx][posy + i] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx][posy + i] = id
                        i++;
                    }
                }
            }
            else if (id == 7)
            {
                life = 4;
                pos = utils.rand_number(0, 1);
                if (pos == 0)
                {
                    posx = utils.rand_number(0, 6);
                    posy = utils.rand_number(0, 9);
                    while (i < life)
                    {
                        if (this.grid[posx + i][posy] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx + i][posy] = id
                        i++;
                    }
                }
                else if (pos == 1)
                {
                    posx = utils.rand_number(0, 9);
                    posy = utils.rand_number(0, 6);
                    while (i < life)
                    {
                        if (this.grid[posx][posy + i] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx][posy + i] = id
                        i++;
                    }
                }
            }
            else if (id == 8)
            {
                life = 3;

                pos = utils.rand_number(0, 1);
                if (pos == 0)
                {
                    posx = utils.rand_number(0, 7);
                    posy = utils.rand_number(0, 9);
                    while (i < life)
                    {
                        if (this.grid[posx + i][posy] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx + i][posy] = id
                        i++;
                    }
                }
                else if (pos == 1)
                {
                    posx = utils.rand_number(0, 9);
                    posy = utils.rand_number(0, 7);
                    while (i < life)
                    {
                        if (this.grid[posx][posy + i] != 0)
                            return (false);
                        i++;
                    }
                    i = 0;
                    while (i < life)
                    {
                        this.grid[posx][posy + i] = id
                        i++;
                    }
                }
            }
        }
        /*areShipsOk: function (callback) {
            var i = 0;
            var j;

            this.fleet.forEach(function (ship, i) {
                j = 0;
                while (j < ship.life) {
                    this.grid[i][j] = ship.getId();
                    h;
                }
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
        }*/
    });

    global.computer = computer;

}(this));

function log_grid(grid)
{
    var i = 0;
    while (i < grid.length)
    {
        console.log(grid[i]);
        ++i;
    }
}