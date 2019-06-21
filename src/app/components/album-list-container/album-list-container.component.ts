import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '@services/album.service';
import { DataShareService } from '@services/data-share.service';
import { AlbumHandlerModalComponent } from '@components/album-handler-modal/album-handler-modal.component';
import { Album } from '@models/album-model';

@Component({
  selector: 'app-album-list-container',
  templateUrl: './album-list-container.component.html',
  styleUrls: ['./album-list-container.component.css']
})
export class AlbumListContainerComponent implements OnInit {

  allAlbums: Album[] = [];
  albums: Album[] = [];
  pagination: any = {
    page: 1,
    pageSize: 5,
    maxSize: 5
  };
  modalOption: NgbModalOptions = {};
  isLoading: Boolean = false;

  constructor(
    private albumService: AlbumService,
    private modalService: NgbModal,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.fetchAlbums(user);
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.onCerateAlbumCallback();
  }

  fetchAlbums(user) {
    this.albumService.getAlbums(user.id)
      .subscribe(data => {
        this.allAlbums = data;
        this.loadPage();
      });
  }

  onCerateAlbumCallback() {
    this.dataShareService.album
      .subscribe(data => {
        this.allAlbums.unshift(data);
        this.loadPage();
      });
  }

  loadPage() {
    this.albums = this.allAlbums.slice(
      (this.pagination.page - 1) * this.pagination.pageSize, this.pagination.page * this.pagination.pageSize
    );
  }

  createNewAlbum() {
    const modalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    const album: Album = {} as Album;
    modalRef.componentInstance.album = album;
    modalRef.componentInstance.updateMode = false;
  }

  deleteAlbum(albumId) {
    this.isLoading = true;
    this.albumService.deleteAlbum(albumId)
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe(data => {
        const tmpAlbums = this.allAlbums.filter(album => {
          return album.id !== albumId;
        });
        this.allAlbums = tmpAlbums;
        this.loadPage();
      });
  }

  viewAndUpdate(album) {
    const modalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    modalRef.componentInstance.album = album;
    modalRef.componentInstance.updateMode = true;
  }
}
