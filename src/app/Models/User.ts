
export class User{
    constructor(
        private _token:string,
        private _expiresIn: Date,
        public email:string,
        public id:string
    ){}
    get token(){
        if(!this._expiresIn || this._expiresIn < new Date()){
            return null;
        }
      return this._token;
    }
}