import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Observable, catchError, of, tap } from 'rxjs';
import { error } from 'console';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}


  getPokemonList() : Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap( (response) => this.log(response)),
      catchError((error) => this.handleError(error, [])) 
    )
  }

  getPokemonById(pokemonId: Number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap( (response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((response) => this.log(null)),
      catchError((error) =>  this.handleError(error, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap( () => this.log(null)),
      catchError( (error) => this.handleError(error, null))
    )
  }

  addPokemom(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-type' : 'application/json'})
    }
    return this.http.post<Pokemon>(`api/pokemons`, pokemon, httpOptions).pipe(
      tap( (response) => this.log(response)),
      catchError( (error) => this.handleError(error, null))
    )
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length < 2){
      return of([])
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap( (response) => this.log(response)),
      catchError( (error) => this.handleError(error, []))
    )
  }


  private log(response : any){
    console.table(response)
  }

  private handleError(error: Error, errorValue: any){
    console.error(error)
    return of(errorValue)
  }

  getPokemonTypeList(): Array<string> { 
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte', 
      'Normal', 
      'Electrik', 
      'Poison', 
      'Fée', 
      'Vol', 
      'Combat', 
      'Psy'
    ]
  } 
}
