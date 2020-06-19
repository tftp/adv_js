const CustomPromise = function (callback){
  this.__success__ = [];
  this.__error__ = [];
  this._callback = callback;
  this._status = 'pending';

  this.then = function (successCb, rejectCb){
    if(successCb) {
      this.__success__.push(successCb)
    }

    if(rejectCb) {
      this.__error__.push(rejectCb)
    }

    if (this._resultResolve && this.__success__.length > 1){
      this.__success__[this.__success__.length - 1](this._resultResolve)
    }

    if (this._resultError && this.__error__.length > 1)
      this.__error__[this.__error__.length - 1](this._resultError)
  }

  this.catch = function (rejectCb){
    this.then (null, rejectCb)
  }

  this._resolve = function (result){
    if(!this._resultResolve)
      this._resultResolve = result

    this.__success__.forEach(cb => cb(result))
    if (this._status === 'pending')
      this._status = 'fulfilled'
  }

  this._reject = function (error){
    if(!this._resultError)
      this._resultError = error

    this.__error__.forEach(cb => cb(error))
    if (this._status === 'pending')
      this._status = 'rejected'
  }

  setTimeout( () => {
    callback(this._resolve.bind(this), this._reject.bind(this))
  }, 0);
};
