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

  crearNuevoPersonaje() {
    // Pide los datos del nuevo personaje
    const nombre: string = prompt('Introduce el nombre del nuevo personaje') || "Sin nombre"
    const imagen : string = prompt('Introduce la URL de la imagen del nuevo personaje')|| 'https://cuv.upc.edu/en/shared/imatges/fotos-professorat-i-professionals/anonimo.jpg/@@images/image.jpeg';

    const imagenes: string[] = [imagen];

    // Crea el nuevo personaje
    const nuevoPersonaje: AkatsukiMember = {
      id: 0,
      name: nombre,
      role: "",
      images: imagenes,
      mostrarImagen: false
    };

    // Añade el nuevo personaje a la lista
    this.akatsukiResponse.akatsuki.unshift(nuevoPersonaje);
  }


  obtenerPersonajes() {
    this.dataService.getCharacters().subscribe(result => {
      this.akatsukiResponse = result;
      for (let akatsuki of this.akatsukiResponse.akatsuki) {
        akatsuki.mostrarImagen = false;
      }
    });
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
