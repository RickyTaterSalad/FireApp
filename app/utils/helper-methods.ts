export class HelperMethods {

  constructor() {
  }
  public validObjectId:Function = function (id) {
    return ((id != null && id.length > 0) ? id.match(/^[0-9a-fA-F]{24}$/) : false);
  };

}
