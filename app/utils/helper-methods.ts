import { Headers } from '@angular/http';

export class HelperMethods {
  public validObjectId:Function = function (id) {
    return ((id != null && id.length > 0) ? id.match(/^[0-9a-fA-F]{24}$/) : false);
  };
  public generateJsonContentHeader:Function = function ():Headers {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.createJsonContentTypeHeader(headers);
    return headers;

  };
  public createJsonContentTypeHeader:Function = function (headers:Headers) {
    if (headers) {
      headers.append('Content-Type', 'application/json');
    }
  };
  public createAuthorizationHeader:Function = function (headers:Headers) {
    if (headers) {
      headers.append('Authorization', 'Basic ' + btoa('fire:fire'));
    }
  };
}
