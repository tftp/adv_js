'use strict';

/**
 * @typedef {Object} MotorShip
 * @property {function(number)} setEnginePower
 * @property {function}         getEnginePower
 * @property {function(string)} setBodyMaterial
 * @property {function}         getBodyMaterial
 */

function MotorShip () {
  let _enginePower = 10;
  let _bodyMaterial = 'steel';

  this.setEnginePower = function(power){
    if (typeof(power) != 'number' || power <= 0)
        throw new Error('Power must be positive number!');
    _enginePower = power;
    return _enginePower;
  };

  this.getEnginePower = function(){
    return _enginePower;
  };

  this.setBodyMaterial = function(material){
    if (typeof(material) != 'string')
        throw new Error('Material must be string!');
    _bodyMaterial = material;
    return _bodyMaterial;
  };

  this.getBodyMaterial = function(){
    return _bodyMaterial;
  };
};

/**
 * @typedef {Object} SailShip
 * @property {function(number)} setMast
 * @property {function}         getMast
 * @property {function(number)} setAreaSail
 * @property {function}         getAreaSail
 */

function SailShip () {
  let _mast = 1;
  let _areaSail = 10;

  this.setMast = function(quantity){
    if (typeof(quantity) != 'number' || quantity <= 0)
        throw new Error('Quantity must be positive number!');
    _mast = quantity;
    return _mast;
  };

  this.getMast = function(){
    return _mast;
  };

  this.setAreaSail = function(number){
    if (typeof(number) != 'number' || number <= 0)
        throw new Error('Number must be positive number');
    _areaSail = number;
    return _areaSail;
  };

  this.getAreaSail = function(){
    return _areaSail;
  };
};
