
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: Http) { }

  url = 'http://localhost:5000/api/file';

  getAll() {
    return this.http.get(this.url);
  }

  getOneFile(id) {
    return this.http.get(this.url + '/' + id);
  }

  post(
    title: string,
    file: File
  ) {
    const File = new FormData();
    File.append('title', title);
    File.append('file', file);
    return this.http.post( this.url, File);
  }

  update(
    id: string,
    title: string
  ) {
    const body = {
      id,
      title
    };
    return this.http.patch(this.url + '/' + id, body);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id);
  }

}
