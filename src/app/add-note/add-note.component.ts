import { Component, Input } from '@angular/core';

import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  
  addForm: FormGroup;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder, public router: Router) { 
    this.addForm = this.formBuilder.group({
      'id': ['', Validators.required],
      'judul': ['', Validators.required],
      'deskripsi': [''],
      'tgl': ['']
    });
  }

  addNote(formData: Note) {
    this.apollo.mutate({
      mutation: gql`
        mutation addNote($id: String!, $judul: String!, $deskripsi: String, $tgl: String!) {
          addNote(id: $id, judul: $judul, deskripsi: $deskripsi, tgl: $tgl) {
            id
            judul
          }
        }
      `,
      variables: {
        id: formData.id,
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        tgl: formData.tgl
      },
      refetchQueries: [
        {
          query: gql`
          {
              notes {
                id
                judul
                tgl
              }
          }
          `
        }
      ]
    }).subscribe(() => this.router.navigate(['/list-note']));
  }

}
