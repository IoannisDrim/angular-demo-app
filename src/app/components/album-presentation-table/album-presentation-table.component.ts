import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Album } from '@models/album-model';

@Component({
  selector: 'app-album-presentation-table',
  templateUrl: './album-presentation-table.component.html',
  styleUrls: ['./album-presentation-table.component.css']
})
export class AlbumPresentationTableComponent implements OnInit {

  @Input() albums: Album[];

  @Input() isLoading: boolean;

  // tslint:disable-next-line: no-output-rename
  @Output('deleteAlbum')
  private deleteAlbumEmitter = new EventEmitter<number>();

  // tslint:disable-next-line: no-output-rename
  @Output('viewAndUpdateAlbum')
  viewAndUpdateAlbumEmitter = new EventEmitter<Album>();

  private selectedAlbumId: number;

  constructor() { }

  ngOnInit(): void { }

  deleteAlbum(albumId: number): void {
    this.selectedAlbumId = albumId;
    this.deleteAlbumEmitter.emit(albumId);
  }

  viewAndUpdate(album: Album): void {
    this.viewAndUpdateAlbumEmitter.emit(album);
  }

}
