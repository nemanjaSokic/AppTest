import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  uri = 'http://localhost:4000'
  constructor(private http: HttpClient ) { }

  getTasks(){
    return this.http.get(`${this.uri}/tasks`);
  }

  getTaskById(id){
    return this.http.get(`${this.uri}/tasks/${id}`);
  }

  addTask(title, description){
    const task = {
      title: title,
      description:description
    };
    return this.http.post(`${this.uri}/tasks/add`,task);
  }

  updateTask(id, title, description, status){
    const task = {
      title: title,
      description:description,
      status:status
    };
    return this.http.put(`${this.uri}/tasks/update/${id}`,task);
  }

  deleteTask(id){
    return this.http.delete(`${this.uri}/tasks/delete/${id}`);
  }
}
