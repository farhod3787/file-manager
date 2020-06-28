import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../shared/file-uplad-service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
})
export class AddFilesComponent implements OnInit {

  form: FormGroup;
  imagePreview: any;
  imageview = true;
  status = true;
  id = null ;
  title: String;
  file: any
  constructor(
    private fileService: FileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      file: new FormControl(null, {validators: [Validators.required]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.status = false;
        this.id = paramMap.get('id');
        this.fileService.getOneFile(this.id).subscribe( result => {
            const postData = result.json();
            this.title = postData.title;
            this.file = postData.file_name;
            this.form.setValue({
            title:   this.title,
            file: this.file
          });
        });
      } else {
        this.id = null;
      }
    });
  }

  onSave() {
    if (this.status) {
      this.fileService.post(
        this.form.value.title,
        this.form.value.file
      ).subscribe(res => {
        if (res.json().ok) {
          alert(res.json().message);
        } else {
          alert(res.json().message);
        }
      });
    } else {
      this.fileService.update(
        this.id,
        this.form.value.title
      ).subscribe( result => {
        if (result.json().ok) {
          alert(result.json().message);
        } else {
          alert(result.json().message);
        }
      });
    }





  }



  onInputChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader()  ;
    reader.onload = () => {
    this.imagePreview = reader.result;                   // rasm tanlanganda ko'rsatish
    this.imageview = true;
    };
    reader.readAsDataURL(file);
  }

}
