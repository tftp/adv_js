'use strict';

function Shipyard () {
  this.create = function(){
    let name = 'Ship' + new Date().getTime();
    let model = this.typeShipyard;
    return new Ship(name, model);
  };

  this.repair = function(object){
    validateObject(object, this);

    return true;
  };

  this.paint = function(object){
    validateObject(object, this);

    return true;
  };

  this.change = function(object){
    validateObject(object, this);

    return this.create();
  };

  function validateObject(object, shipyard){
    if (typeof(object) != 'object')
      throw new Error('argument must be Object');

    if (!object.model)
      throw new Error('Object must have model attribute');

    if (object.model !== shipyard.typeShipyard)
      throw new Error(`Ship must have type ${shipyard.typeShipyard}` );
  };
};

const motorShipyard = Object.create(new Shipyard, {
  typeShipyard: {
    value: 'motor',
  },
});

const sailShipyard = Object.create(new Shipyard, {
  typeShipyard: {
    value: 'sail',
  },
});
