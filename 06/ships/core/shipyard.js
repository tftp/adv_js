'use strict';

function Shipyard () {
  this.create = function(){
    let name = 'Ship' + new Date().getTime();
    let model = this.typeShipyard;
    return new Ship(name, model);
  };

  this.repair = function(object){
    if (typeof(object) != 'object')
      throw new Error('argument must be Object');

    if (!object.model)
      throw new Error('Object must have model attribute');

    if (object.model !== this.typeShipyard)
      throw new Error(`Ship must have type ${this.typeShipyard}` );
  };

  this.paint = function(object){
    if (typeof(object) != 'object')
      throw new Error('argument must be Object');

    return console.log(`${object.name} is paint`)
  };

  this.change = function(object){
    if (typeof(object) != 'object')
      throw new Error('argument must be Object');

    if (!object.model)
      throw new Error('Object must have model attribute');

    if (object.model !== this.typeShipyard)
      throw new Error(`Ship must have type ${this.typeShipyard}` );

    return this.create();
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
