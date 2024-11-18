import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GroupsResponse } from '../models/api.note';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  http = inject(HttpClient)

  getGroups() {
    const url = `http://localhost:3000/groups`
    return this.http.get<GroupsResponse>(url)
  }

  createNewGroup(name: string) {
    const url = `http://localhost:3000/groups/create`
    const body = { name }

    return this.http.post(url, body)
  }

  updateGroup(name: string, groupId: string) {
    const url = `http://localhost:3000/groups/update`
    const body = { name, groupId }

    return this.http.put(url, body)
  }

  deleteGroup(groupId: string) {
    const url = `http://localhost:3000/groups/delete/${groupId}`

    return this.http.delete(url)
  }
}
