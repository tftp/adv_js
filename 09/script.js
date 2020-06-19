class CustomPromise {

  then(successCb, rejectCb){
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

  catch(rejectCb){
    this.then (null, rejectCb)
  }

  _resolve(result){
    if(!this._resultResolve)
      this._resultResolve = result

    this.__success__.forEach(cb => cb(result))
    if (this._status === 'pending')
      this._status = 'fulfilled'
  }

  _reject(error){
    if(!this._resultError)
      this._resultError = error

    this.__error__.forEach(cb => cb(error))
    if (this._status === 'pending')
      this._status = 'rejected'
  }

  constructor (callback) {
    this.__success__ = [];
    this.__error__ = [];
    this._callback = callback;
    this._status = 'pending';

    setTimeout( () => {
      callback(this._resolve.bind(this), this._reject.bind(this))
    }, 0);

  }

  static resolve = function(result){
    let newPromis =  new CustomPromise(resolve => resolve(result))
    newPromis._status = 'fulfilled'
    newPromis._resultResolve = result
    newPromis.__success__.push(() => {})
    return newPromis
  }

  static reject = function(result){
    let newPromis =  new CustomPromise(reject => reject(result))
    newPromis._status = 'rejected'
    newPromis._resultError = result
    newPromis.__error__.push(() => {})
    return newPromis
  }

};
