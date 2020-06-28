import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { AddFilesComponent } from './add-files/add-files.component';


const routes: Routes = [
  {path: '', component: FilesComponent},
  {path: 'add', component: AddFilesComponent},
  {path: 'update/:id', component: AddFilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
