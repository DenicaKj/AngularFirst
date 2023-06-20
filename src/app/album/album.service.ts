import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAlbum } from "./album";
import { Observable, catchError, map, tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AlbumService{
    private albumUrl='https://jsonplaceholder.typicode.com/photos'
    constructor(private http:HttpClient){
    }
    getAlbums():Observable<IAlbum[]>{
        return this.http.get<IAlbum[]>(this.albumUrl).pipe(
            tap(data=>console.log('All',JSON.stringify(data))),
            catchError(this.handleError)
        )
    }
    getAlbum(id:number):Observable<IAlbum | undefined>{
      return this.getAlbums().pipe(
        map((albums: IAlbum[]) => albums.find(a => a.albumId === id))
        )
    }
    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
      }
}