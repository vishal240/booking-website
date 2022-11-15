import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept' : 'application/json',
    'Authorization': ''
  })
};
const httpOption = {
  headers: new HttpHeaders({
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public url: string;
  constructor(public http: HttpClient, public toastr: ToastrService) {
    this.url = environment.url
  }
  getBundle (){
    return this.http.get(this.url + 'transunion/get/bundle', httpOptions);
  }
  uploadFile(opost: any): Observable<any> {
    return this.http.post(this.url + 'landlord/upload-lease-aggrement', opost, httpOption)
  }
  uploadAgreementFile(opost: any): Observable<any> {
    return this.http.post(this.url + 'global/upload-file/file', opost, httpOption)
  }
  uploadImages(opost: any): Observable<any> {
    return this.http.post(this.url + 'uploadfile', opost, httpOption)
  }
  uploadany_id(opost: any): Observable<any> {
    return this.http.post(this.url + 'global/upload-file/any-bs', opost, httpOption)
  }
  uploadVideos(opost: any): Observable<any> {
    return this.http.post(this.url + 'global/upload-file/video', opost, httpOption)
  }
  uploadAudio(opost: any): Observable<any> {
    return this.http.post(this.url + 'global/upload-file/audio', opost, httpOption)
  }
  getCountry(): Observable<any> {
    return this.http.get('assets/json/country.json');
  }
  common_api(api_name: any,opost: any): Observable<any> {
    return this.http.post(this.url + api_name, opost, httpOptions);
  }
  typeSuccess(e: any) {
    this.toastr.success(e, 'Success!', { positionClass: 'toast-top-right', timeOut: 3000, progressBar: true });
  }
  typeError(e: any) {
      this.toastr.error(e, 'Inconceivable!', { positionClass: 'toast-top-right', timeOut: 3000, progressBar: true });
  }
}
