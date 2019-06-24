import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '@services/album.service';
import { DataShareService } from '@services/data-share.service';
import { AlbumHandlerModalComponent } from '@components/album-handler-modal/album-handler-modal.component';
import { Album } from '@models/album-model';
import { Pagination } from '@models/pagination-model';
import { AppUser } from '@models/app-user-model';

@Component({
  selector: 'app-album-list-container',
  templateUrl: './album-list-container.component.html',
  styleUrls: ['./album-list-container.component.css']
})
export class AlbumListContainerComponent implements OnInit {

  allAlbums: Album[] = [];
  albums: Album[] = [];
  pagination: Pagination = {
    page: 1,
    pageSize: 5,
    maxSize: 5
  };
  modalOption: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  isLoading: boolean = false;

  constructor(
    private albumService: AlbumService,
    private modalService: NgbModal,
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
    const user: AppUser = JSON.parse(localStorage.getItem('user'));
    this.fetchAlbums(user);
    this.onCerateAlbumCallback();
  }

  fetchAlbums(user: AppUser): void {
    this.albumService.getAlbums(user.id)
      .subscribe((data: any) => {
        this.allAlbums = data;
        this.loadPage();
      });
  }

  onCerateAlbumCallback(): void {
    this.dataShareService.album
      .subscribe((data: any) => {
        this.allAlbums.unshift(data);
        this.loadPage();
      });
  }

  loadPage(): void {
    this.albums = this.allAlbums.slice(
      (this.pagination.page - 1) * this.pagination.pageSize, this.pagination.page * this.pagination.pageSize
    );
  }

  createNewAlbum(): void {
    const modalRef: NgbModalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    const album: Album = {} as Album;
    modalRef.componentInstance.album = album;
    modalRef.componentInstance.updateMode = false;
  }

  deleteAlbum(albumId: number): void {
    this.isLoading = true;
    this.albumService.deleteAlbum(albumId)
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((data: any) => {
        const tmpAlbums: Album[] = this.allAlbums.filter((album: Album) => {
          return album.id !== albumId;
        });
        this.allAlbums = tmpAlbums;
        this.loadPage();
      });
  }

  viewAndUpdate(album: Album): void {
    const modalRef: NgbModalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    modalRef.componentInstance.album = album;
    modalRef.componentInstance.updateMode = true;
  }
}
