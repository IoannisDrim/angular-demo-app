import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlbumHandlerModalComponent } from '../album-handler-modal/album-handler-modal.component';
import { Album } from '../../models/album-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  modalOption: NgbModalOptions = {};

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

  createNewAlbum() {
    const modalRef = this.modalService.open(AlbumHandlerModalComponent, this.modalOption);
    modalRef.componentInstance.album = new Album;
    modalRef.componentInstance.updateMode = false;
  }

}
