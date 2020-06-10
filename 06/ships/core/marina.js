'use strict';

/**
 * @typedef {Object} Marina
 * @property {object <{number} x, {number} y>} position
 * @property {array} ships
 */

function Marina(position) {
    let _ships = [];

    if (!position || typeof(position.x) != 'number')
      throw new Error('Position X is wrong');

    if (!position || typeof(position.y) != 'number')
      throw new Error('Position Y is wrong');

    this.position = position;

    this.moor = function (ship) {
        if (ship.isAnchorDroped())
          ship.riseAnchor();

        ship.moveTo(this.position);
        ship.dropAnchor();
        _ships.push(ship);

      return true;
    };

    this.unmoor = function (ship) {
      let pos = _ships.findIndex(item => item == ship);
      console.log(_ships);
      console.log(pos);

      if (pos == -1)
          throw new Error('Ship is out of marina');

      if (ship.isAnchorDroped())
          ship.riseAnchor();

        _ships.splice(pos,1);
      return true;
    };

    this.ships = function() {
        return _ships;
    };
  };

const marina = new Marina({x: 0, y: 0});
