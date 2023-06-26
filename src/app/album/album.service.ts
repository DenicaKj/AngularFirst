import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAlbum } from "./album";
import { Observable, catchError, map, of, publishReplay, refCount, shareReplay, switchMap, take, tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AlbumService{
    private albumUrl='https://jsonplaceholder.typicode.com/photos'
    albums!:IAlbum[]
    constructor(private http:HttpClient){
    }
    albumsOb!:Promise<IAlbum[]|undefined>
    getAlbumsPrivate():Promise<IAlbum[]|undefined>{
      this.albumsOb= this.http.get<IAlbum[]>(this.albumUrl).pipe(
        tap(data=>console.log('All',JSON.stringify(data))),
        catchError(this.handleError)).toPromise()
        return this.albumsOb
    }
    async getAlbums():Promise<IAlbum[]>{
      await this.getAlbumsPrivate();
      console.log(this.albumsOb)
      if(this.albums){
        return (this.albums)
      }else{
        let albums = await this.albumsOb;
        this.albums=albums!;
        console.log(this.albums)
        return this.albums;
      }
    }
    update(album:IAlbum){
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };

      return this.http.put<IAlbum>(`${this.albumUrl}/${album.id}`, album, options);

    }
    detele(id:number){
      let httpheaders=new HttpHeaders()
      .set('Content-type','application/Json');
      let options={
        headers:httpheaders
      };
      this.albums=this.albums.filter(a=>a.id!=id)
      return this.http.delete<number>(this.albumUrl+"/"+id)
     
    }
    getAlbum(id:number):IAlbum|undefined{
      return 
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

function next(value: IAlbum[]): void {
  throw new Error("Function not implemented.");
}
