import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {AkatsukiMember, AkatsukiResponse} from "../../models/akatsuki.model";

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  mostrarImagen = false;
  akatsukiResponse: AkatsukiResponse;

  ngOnInit(): void {
    this.obtenerPersonajes()
  }

  mostrarTodasLasFotos() {
    for (let akatsukiResponseElement of this.akatsukiResponse.akatsuki) {
      akatsukiResponseElement.mostrarImagen = true
    }
  }

  obtenerPersonajes() {
    this.dataService.getCharacters().subscribe(result => this.akatsukiResponse = result)

  }

  habilitarFoto(akatsuki: any): void {
    akatsuki.mostrarImagen = akatsuki.mostrarImagen == false;
  }

  eliminar(akatsuki: AkatsukiMember) {
    for (let i = 0; i < this.akatsukiResponse.akatsuki.length; i++) {
      if (this.akatsukiResponse.akatsuki[i].id === akatsuki.id) {
        this.akatsukiResponse.akatsuki.splice(i, 1);
        break;
      }
    }
  }

  modificarNombre(akatsuki: AkatsukiMember) {
    const nombre: string = prompt("Introduzca el nuevo nombre")!!
    for (let i = 0; i < this.akatsukiResponse.akatsuki.length; i++) {
      if (this.akatsukiResponse.akatsuki[i].id === akatsuki.id) {
        this.akatsukiResponse.akatsuki[i].name = nombre
      }
    }
  }
}
