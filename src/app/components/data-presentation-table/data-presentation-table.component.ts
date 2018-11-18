import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album-model';
import { AlbumHandlerModalComponent } from '../album-handler-modal/album-handler-modal.component';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-data-presentation-table',
  templateUrl: './data-presentation-table.component.html',
  styleUrls: ['./data-presentation-table.component.css']
})
export class DataPresentationTableComponent implements OnInit {

  allAlbums: Album[] = [];
  albums: Album[] = [];
  pagination: any = {
    page: 1,
    pageSize: 5,
    maxSize: 5
  };
  modalOption: NgbModalOptions = {};
  isLoading: Boolean = false;
  selectedAlbumId: number = null;

  constructor(
    private albumService: AlbumService,
    private modalService: NgbModal,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
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
      })
  }

  loadPage() {
    this.albums = this.allAlbums.slice((this.pagination.page-1)*this.pagination.pageSize, this.pagination.page*this.pagination.pageSize );
  }

  deleteAlbum(albumID) {
    this.selectedAlbumId = albumID;
    this.isLoading = true;
    this.albumService.deleteAlbum(albumID)
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe(data => {
        let tmpAlbums = this.allAlbums.filter(album=>{
          return album.id !== albumID
        })
        this.allAlbums = tmpAlbums;
        this.loadPage();
      })
  }

  viewAndUpdate(album) {
    const modalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    modalRef.componentInstance.album = album;
    modalRef.componentInstance.updateMode = true;
  }

  onCerateAlbumCallback() {
    this.dataShareService.album
      .subscribe(data => {
        this.allAlbums.unshift(data);
        this.loadPage();
      })
  }

}
