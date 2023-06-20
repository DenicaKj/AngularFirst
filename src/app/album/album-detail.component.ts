import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IAlbum } from './album';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit{
  errorMessage = '';
  album: IAlbum | undefined;
  constructor(private route:ActivatedRoute, private router: Router ,private albumService:AlbumService){

  }
  id:number=NaN
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAlbum(id)
    }
  }
  getAlbum(id:number):void{
    this.albumService.getAlbum(id).subscribe({
      next:album=>this.album=album,
      error:err=>this.errorMessage=err
    });
  }
  onBack(): void {
    this.router.navigate(['/albums']);
  }
}
