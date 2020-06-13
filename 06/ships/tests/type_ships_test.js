describe ("Ships Types", function() {
  const shipMotor = new Ship('Ship', 'motor');

  const shipSail = new Ship('Ship', 'sail');

  describe ("Testing MotorShip", function(){
    it ("ShipMotor have option getEnginePower", function() {
       assert.isOk(shipMotor.getEnginePower());
    });

    it ("ShipMotor have option setEnginePower", function() {
       assert.isOk(shipMotor.setEnginePower(10));
    });

    it ("ShipMotor can not setEnginePower if argument is not positive number", function() {
       assert.ifError(shipMotor.setEnginePower());
    });

    it ("ShipMotor have option getBodyMaterial", function() {
       assert.isOk(shipMotor.getBodyMaterial());
    });

    it ("ShipMotor have option setBodyMaterial", function() {
       assert.isOk(shipMotor.setBodyMaterial('wood'));
    });

    it ("ShipMotor have not setBodyMaterial if argument is not a string", function() {
       assert.ifError(shipMotor.setBodyMaterial());
    });

    it ("ShipMotor have not option getMast", function() {
       assert.isUndefined(shipMotor.getMast);
    });

    it ("ShipMotor have not option setMast", function() {
       assert.isUndefined(shipMotor.setMast);
    });

    it ("ShipMotor have not option getAreaSail", function() {
       assert.isUndefined(shipMotor.getAreaSail);
    });

    it ("ShipMotor have not option setAreaSail", function() {
       assert.isUndefined(shipMotor.setAreaSail);
    });
  });

  describe ("Testing SailShip", function(){
    it ("ShipSail have not option getEnginePower", function() {
       assert.isUndefined(shipSail.getEnginePower);
    });

    it ("ShipSail have not option setEnginePower", function() {
       assert.isUndefined(shipSail.setEnginePower);
    });

    it ("ShipSail have not option getBodyMaterial", function() {
       assert.isUndefined(shipSail.getBodyMaterial);
    });

    it ("ShipSail have not option setBodyMaterial", function() {
       assert.isUndefined(shipSail.setBodyMaterial);
    });

    it ("ShipSail have option getMast", function() {
       assert.isOk(shipSail.getMast());
    });

    it ("ShipSail have option setMast", function() {
       assert.isOk(shipSail.setMast(1));
    });

    it ("ShipSail can not setMast if argument is not positive number", function() {
       assert.ifError(shipSail.setMast());
    });

    it ("ShipSail have option getAreaSail", function() {
       assert.isOk(shipSail.getAreaSail());
    });

    it ("ShipSail have option setAreaSail", function() {
       assert.isOk(shipSail.setAreaSail(10));
    });

    it ("ShipSail can not setAreaSail if argument is not positive number", function() {
       assert.ifError(shipSail.setAreaSail());
    });
  });
});
