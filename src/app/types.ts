export type Note = {
    id: string;
    judul: string;
    deskripsi: string;
    tgl: string;
  }
  
  export type Query = {
    notes: Note[];
    noteById: Note;
  }