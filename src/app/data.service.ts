import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AkatsukiResponse} from "./models/akatsuki.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "https://narutodb.xyz/api/akatsuki"
  constructor(private http: HttpClient) { }

  getCharacters(){
    return this.http.get<AkatsukiResponse>(this.apiUrl)
  }
}
