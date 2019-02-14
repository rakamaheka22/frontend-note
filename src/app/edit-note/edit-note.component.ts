import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query, Note } from '../types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: Note = { id: '', judul: '', deskripsi: '', tgl: '' };

  constructor(private apollo: Apollo, public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.apollo.watchQuery<Query>({
      query: gql`
        query noteById($id: String!) {
          noteById(id: $id) {
            id
            judul
            deskripsi
            tgl
          }
        }
      `,
      variables: {
        id: id
      }
    })
    .valueChanges.subscribe((res) => {
      this.note = res.data.noteById;
    });
  }

  editNote() {
    this.apollo.mutate({
      mutation: gql`
        mutation editNote($id: String!, $judul: String!, $deskripsi: String, $tgl: String!) {
          editNote(id: $id, judul: $judul, deskripsi: $deskripsi, tgl: $tgl) {
            id
            judul
          }
        }
      `,
      variables: {
        id: this.note.id,
        judul: this.note.judul,
        deskripsi: this.note.deskripsi,
        tgl: this.note.tgl
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
