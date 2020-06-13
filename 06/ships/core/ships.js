
'use strict';

/**
 * @typedef {Object} Ship
 * @property {string} name
 * @property {string} model
 * @property {object <{number} x, {number} y>} position
 */

function Ship(name, model, position = {x: 0, y: 0}) {
    let _isAnchorDroped = false;
    let _distance = 0;

    if (!name || typeof(name) != 'string' || name.trim().length < 2)
      throw new Error('Name is wrong');

    if (!model || typeof(model) != 'string' || model.trim().length < 1)
      throw new Error('Model is wrong');

    if (!position || typeof(position.x) != 'number')
      throw new Error('Position X is wrong');

    if (!position || typeof(position.y) != 'number')
      throw new Error('Position Y is wrong');

    this.name = name;
    this.model = model;
    this.position = position;

    if (this.model === 'motor')
        Object.setPrototypeOf(this, new MotorShip);

    if (this.model === 'sail')
        Object.setPrototypeOf(this, new SailShip);

    /**
    * @property {object <{number} x, {number} y>} position
    * @returns {boolean}
    */
    this.moveTo = function (position) {
      if (!position || typeof(position.x) != 'number')
        throw new Error('Position X is wrong');

      if (!position || typeof(position.y) != 'number')
        throw new Error('Position Y is wrong');

      if (_isAnchorDroped)
          throw new Error('You need to rise anchor');

      let deviantX = Math.abs(this.position.x - position.x);
      let deviantY = Math.abs(this.position.y - position.y);

      _distance = _distance + deviantX + deviantY;

      this.position = {
          x: position.x,
          y: position.y,
      };

      return true;
    };

    /**
    * @returns {boolean}
    */
    this.isAnchorDroped = function () {
        return _isAnchorDroped;
    };

    this.dropAnchor = function() {
        _isAnchorDroped = true;
    };

    this.riseAnchor = function() {
        _isAnchorDroped = false;
    };

    /**
    * @returns {number}
    */
    this.distance = function(){
        return _distance;
    };

    /**
    * @property {string} direction
    * @returns {boolean}
    */
    this.move = function(direction) {
      if (_isAnchorDroped)
          throw new Error('You need to rise anchor');

      switch (direction) {
        case 'n':
            this.position.y += 1;
            break;
        case 's':
            this.position.y -= 1;
            break;
        case 'w':
            this.position.x -= 1;
            break;
        case 'e':
            this.position.x += 1;
            break;
        default:
          throw new Error ('Direction is wrong');
      };
      _distance += 1;
      return true;
    };
};
