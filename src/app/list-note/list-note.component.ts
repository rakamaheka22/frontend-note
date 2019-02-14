import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Query, Note } from '../types';


@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.scss']
})
export class ListNoteComponent implements OnInit {

  list: Observable<Note[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.list = this.apollo.watchQuery<Query>({
      query: gql`
      {
          notes {
            id
            judul
            tgl
          }
      }
      `,
      // fetchPolicy: 'network-only'
    })
    .valueChanges.pipe(
      map(result => result.data.notes)
    );
  }

  deleteNote(id: string) {
    this.apollo.mutate({
      mutation: gql`
        mutation deleteNote($id: String!) {
          deleteNote(id: $id) {
            id
            judul
          }
        }
      `,
      variables: {
        id: id
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
    }).subscribe();
  }

}
