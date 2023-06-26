import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IAlbum } from "./album";
import { AlbumService } from "./album.service";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";

@Component({
    selector:'albums',
    templateUrl:"./album-list.component.html"
})
export class AlbumComponent implements OnInit,OnDestroy{
    albums!:IAlbum[]
    pageTitleAlbum:string="Album List"
    errorMessage:string=''
    sub!:Subscription
    private _listFilter:string=''
    filteredAlbums:IAlbum[]=[]
    originalEditAlbum:IAlbum|undefined
    editAlbum:IAlbum|undefined
    constructor(private albumService:AlbumService,private dialog: MatDialog){
    }
    
    get listFilter():string{
        return this._listFilter
    }
    
    set listFilter(value:string){
        this._listFilter=value
        this.filteredAlbums=this.preformFilter(value)
    }
    preformFilter(filter:string):IAlbum[]{
        filter=filter.toLowerCase();
        if (filter!=''){
        return this.albums.filter((product:IAlbum)=>product.title.toLowerCase().includes(filter))
        }else{
            return this.albums
        }
    }
    @ViewChild('secondDialog', { static: true })
    secondDialog!: TemplateRef<any>;
    openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
        this.dialog.open(templateRef);
      }
    penDialogWithoutRef() {
        this.dialog.open(this.secondDialog);
      }
    async ngOnInit(): Promise<void> {
        if(!this.albums){
        this.albums= await this.albumService.getAlbums();}
        this.filteredAlbums=this.albums
    }
    
    ngOnDestroy(): void {
        this.sub.unsubscribe
    }
    delete(id:number):void{
        this.albums=this.albums.filter(a=>a.id!=id)
        console.log(this.albums.find(a=>a.id==id))
        this.albumService.detele(id).subscribe(response => {
            console.log('Deleted:', response);})
        this.filteredAlbums=this.filteredAlbums.filter(a=>a.id!=id)
    }
    
    edit(id:number,title:string,url:string):void{
        let albumEdit=this.albums.find(a=>a.id==id)
        let json= {"albumId":this.albums.find(a=>a.id==id)?.albumId,"id":this.albums.find(a=>a.id==id)?.id,"title":this.albums.find(a=>a.id==id)?.title,"url":this.albums.find(a=>a.id==id)?.url,"thumbnailUrl":this.albums.find(a=>a.id==id)?.thumbnailUrl}
        let index=this.albums.findIndex(a=>a.id==id)
        if(albumEdit){
        if(albumEdit.title!=title && title!=''){
            json['title']=title
        }
        if(albumEdit?.url!=url && url!=''){
            json['url']=url
            json['thumbnailUrl']=url
        }
        this.albums[index]=<IAlbum>(json)
        this.filteredAlbums=this.albums
        this.albumService.update(this.albums[index]).subscribe(response => {
            console.log('Updated:', response);
          })
    }
    }
    initializeEditAlbum(id:number){
        this.originalEditAlbum=this.albums[this.albums.findIndex(a=>a.id==id)]
        if(this.originalEditAlbum){
            this.editAlbum={...this.originalEditAlbum}
        }
    }
    onSubmit(form:NgForm){
        if(this.editAlbum){
        this.albums[this.albums.findIndex(a=>a.id==this.editAlbum?.id)]=this.editAlbum
        this.filteredAlbums=this.albums
        this.albumService.update(this.editAlbum).subscribe(response => {
            console.log('Updated:', response);
          })}
    }
}