const email_providers = require('email-providers');

class Validator {
    constructor() {
        this.value = null;
        
        this.init = this.init.bind(this);
        this.isEmail = this.isEmail.bind(this);
        this.LengthMore = this.LengthMore.bind(this);

        this.methods = {isEmail: this.isEmail, LengthMore: this.LengthMore}
    }

    init (value) {
        this.value = value;
        return this.methods;
    }

    isEmail () {
        if(this.value.indexOf('@') > -1) {
            if(this.value.split('@')[0].length > 0) {
                for(let i = 0; i < email_providers.length; i++) {
                    if(email_providers[i] === this.value.split('@')[1]) {
                        return this.methods;
                    }
                }
    
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    LengthMore (cond) {
        if(this.value.length < cond) return false;
        else return this.methods;
    }
}

module.exports = new Validator();