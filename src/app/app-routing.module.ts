import { AddNoteComponent } from './add-note/add-note.component';
import { ListNoteComponent } from './list-note/list-note.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditNoteComponent } from './edit-note/edit-note.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-note', pathMatch: 'full'},
  { path: 'list-note', component: ListNoteComponent },
  { path: 'add-note', component: AddNoteComponent },
  { path: 'edit-note/:id', component: EditNoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
