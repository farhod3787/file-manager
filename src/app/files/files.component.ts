import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file-uplad-service';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  images = [];
  musics = [];
  videos = [];
  constructor(
    private fileService: FileService
  ) {
    this.getFiles();
   }

  ngOnInit() {
  }

  getFiles() {
    this.fileService.getAll().subscribe( res => {
      const result = res.json();
      if ( result.ok) {
        this.images = result.images;
        this.musics = result.musics;
        this.videos = result.videos;
      } else {
        console.log('Error');
      }

    });
  }

  delete(id) {
    this.fileService.delete(id).subscribe( result => {
        alert(result.json().message);
        this.getFiles();
    });
  }

}
