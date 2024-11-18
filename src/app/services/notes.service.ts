import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InputSignal } from '@angular/core';
import { NotesResponse } from '../models/api.note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  http = inject(HttpClient)

  getNotes(groupId: string) {
    const url = `http://localhost:3000/notes/${groupId}`
    return this.http.get<NotesResponse>(url)
  }

  createNewNote(title: string, content: string, groupId: string) {
    const url = `http://localhost:3000/notes/create`
    const body = { title, content, groupId }
    return this.http.post(url, body)
  }
}
