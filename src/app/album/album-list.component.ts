import { Component, OnDestroy, OnInit } from "@angular/core";
import { IAlbum } from "./album";
import { AlbumService } from "./album.service";
import { Subscription } from "rxjs";


@Component({
    selector:'albums',
    templateUrl:"./album-list.component.html"
})
export class AlbumComponent implements OnInit,OnDestroy{
    albums:IAlbum[]=[]
    pageTitleAlbum:string="Album List"
    errorMessage:string=''
    sub!:Subscription
    ngOnInit(): void {
        this.albumService.getAlbums().subscribe({
            next:albums=>this.albums=albums,
            error:err=>this.errorMessage=err
        });
    }
    constructor(private albumService:AlbumService){

    }
    ngOnDestroy(): void {
        this.sub.unsubscribe
    }

}