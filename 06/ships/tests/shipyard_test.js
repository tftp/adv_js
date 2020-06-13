describe ("Shipyard", function() {
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

  const shipMotor = new Ship('Ship', 'motor');

  const shipSail = new Ship('Ship', 'sail');

  it ("motorShipyard can create Ship", function() {
     assert.isObject(motorShipyard.create());
  });

  it ("motorShipyard can repair Ship", function() {
     assert.isOk(motorShipyard.repair(shipMotor));
  });

  it ("motorShipyard can not repair Ship other type", function() {
     assert.ifError(motorShipyard.repair(shipSail));
  });

  it ("motorShipyard can not repair not a Ship", function() {
    assert.ifError(motorShipyard.repair());
  });

  it ("motorShipyard can not repair not a Ship", function() {
    assert.ifError(motorShipyard.repair('error'));
  });

  it ("motorShipyard can not repair not a Ship", function() {
    assert.ifError(motorShipyard.repair({ship: 'Ship'}));
  });

  it ("motorShipyard can paint a Ship", function() {
    assert.isOk(motorShipyard.paint(shipMotor));
  });

  it ("motorShipyard can not paint a Ship other type", function() {
    assert.ifError(motorShipyard.paint(shipSail));
  });

  it ("motorShipyard can change the Ship on other new Ship", function() {
    assert.isObject(motorShipyard.change(shipMotor));
    assert.notEqual(motorShipyard.change(shipMotor), shipMotor);
  });
});
