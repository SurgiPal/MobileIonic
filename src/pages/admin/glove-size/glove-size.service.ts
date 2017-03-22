import { CONFIGURATION } from './../../../providers/app.constants';
import { GloveSize } from './../../../models/glove-size';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GloveSizeService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public readonly serviceName = 'Glove Size';
  private url = CONFIGURATION.baseUrls.server+ 'api/GloveSizes';  // URL to web api
  constructor(private authHttp: AuthHttp ) {

  }

  getAll(): Promise<GloveSize[]>
  {
    return this.authHttp.get(this.url,  { headers: this.headers })
      .toPromise()
      .then(response => response.json() as GloveSize[])
      .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.authHttp.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(param: string): Promise<GloveSize> {
    return this.authHttp
      .post(this.url, JSON.stringify({ name: param }), { headers: this.headers })
      .toPromise()
      .then(res => res.json()  )
      .catch (   this.handleError);
  }
  update(param: GloveSize): Promise<GloveSize> {
    const url = `${this.url}/${param.id}`;
    return this.authHttp
      .put(url, JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(() => param)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log('SERVICE ERROR', error.message || error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
