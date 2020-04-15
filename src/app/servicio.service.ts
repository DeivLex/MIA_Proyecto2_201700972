import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) {
    this.CargarUsuarios();
  }

    usuarios: any[]=[];
    private CargarUsuarios() {
      this.http.get('http://localhost:8080/')
      .subscribe((resp: any[])=>{
        this.usuarios =resp;
        console.log(this.usuarios);
    });
  }
}
