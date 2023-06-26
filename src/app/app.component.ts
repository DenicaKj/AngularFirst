import { Component } from '@angular/core';
import { AlbumService } from './album/album.service';
import { IAlbum } from './album/album';

@Component({
  selector: 'app-root',
  template: `
  <div class='container'>
    <albums></albums>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
 
}
