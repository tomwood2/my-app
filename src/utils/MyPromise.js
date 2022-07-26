
const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};

class MyPromise {

    #thenCallbacks = [];
    #catchCallbacks = [];
    #state = STATE.PENDING;
    #value;     // success or reject value

    #onSuccessBound = this.#onSuccess.bind(this);
    #onFailBound = this.#onFail.bind(this);

    constructor(cb) {
        try {
            cb(this.onSuccessBound, this.onFailBound);
        } catch (e) {
            this.#onFail(e);
        }

    }

    #runCallbacks() {
        if (this.STATE === STATE.FULFILLED) {
            this.#thenCallbacks.forEach(cb => cb(this.#value));
            this.#thenCallbacks = [];
            return;
        } 

        if (this.STATE === STATE.REJECTED) {
            this.#catchCallbacks.forEach(cb => cb(this.#value));
            this.#catchCallbacks = [];
            return;
        } 
    }

    #onSuccess(value) {
        if (this.#state != STATE.PENDING) {
            return;
        }

        this.#value = value;
        this.#state = STATE.FULFILLED;
        this.#runCallbacks();
    }

    #onFail(value) {
        if (this.#state != STATE.PENDING) {
            return;
        }
        
        this.#value = value;
        this.#state = STATE.REJECTED;
        this.#runCallbacks();
    }

    then(thenCb, catchCb) {

        // the cb passed to MyPromise ctor
        // will be called immediately and be
        // provided with the new promise's #onSuccess and #onFail
        return new MyPromise((resolve, reject) => {

            // here we don't save thenCb directly,
            // we make a new cb that might use thenCb
            this.#thenCallbacks.push((result) => {

                // if the cb provided to then is null (called from .catch is one example)
                // we return this new promise resolved with the
                // result of the promise that then was called on
                if (thenCb === null) {
                    resolve(result);
                    return;
                }

                // we DO have a thenCB
                try {
                    resolve(thenCb(result));
                } catch (error) {
                    reject(error);
                }
            });


            // if (thenCb != null) {
            //     this.#thenCallbacks.push(thenCb);
            // }

            // if (catchCb != null) {
            //     this.#catchCallbacks.push(catchCb);
            // }

            this.#runCallbacks();

        });
    }

    catch(cb) {
        // same as then with only a catchCb
        this.then(undefined, cb);
    }

    finally(cb) {

    }

}

export {MyPromise};