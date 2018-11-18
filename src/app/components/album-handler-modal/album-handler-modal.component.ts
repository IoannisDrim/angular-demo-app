import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Album } from '../../models/album-model';
import { AppUser } from '../../models/app-user-model';
import { AlbumService } from '../../services/album.service';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-album-handler-modal',
  templateUrl: './album-handler-modal.component.html',
  styleUrls: ['./album-handler-modal.component.css']
})
export class AlbumHandlerModalComponent implements OnInit{

  @Input() album: Album;
  @Input() updateMode: Boolean;

  update: Boolean = true;
  albumForm: FormGroup;
  user: AppUser;
  isLoading: Boolean = false;
  submitted: Boolean = false;
  actionCompleted: Boolean = false;
  actionSuccessfullyCompleted: Boolean = false;
  askConfirmation: Boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getLoggedInUser();
  }

  get form() { return this.albumForm.controls; }

  initializeForm() {
    this.albumForm = this.formBuilder.group({
        id: [{value: this.album.id, disabled: this.updateMode}],
        userId: [{value: this.album.userId, disabled: this.updateMode}, Validators.required],
        title: [this.album.title, Validators.required]
    });
  }

  getLoggedInUser() {
    this.dataShareService.loggedInUser
      .subscribe(data => {
        this.user = data;
      })
  }

  saveChanges() {
    this.submitted = true;
    if ( this.albumForm.valid ) {
      this.isLoading = true;
      this.album.title = this.albumForm.value.title;
      this.albumService.updateAlbum(this.album)
        .finally(() => {
          this.isLoading = false;
          this.actionCompleted = true;
          setTimeout(()=>{
            this.close();
          },2000)
        })
        .subscribe(data => {
          this.actionSuccessfullyCompleted = true;
        },error => {
          this.actionSuccessfullyCompleted = false;
        })
    }
  }

  createAlbum() {
    this.submitted = true;
    this.albumForm.controls['userId'].setValue(this.user.id);
    this.albumForm.controls['id'].setValue(null);
    if ( this.albumForm.valid ) {
      this.isLoading = true;
      this.albumService.createAlbum(this.albumForm.value)
        .finally(() => {
          this.isLoading = false;
          this.actionCompleted = true;
          setTimeout(()=>{
            this.close();
          },2000)
        })
        .subscribe(data => {
          this.actionSuccessfullyCompleted = true;
          this.dataShareService.setAlbum(data);
        },error => {
          this.actionSuccessfullyCompleted = false;
        })
    }
  }

  checkForChanges() {
    if ( !this.actionSuccessfullyCompleted && this.albumForm.dirty && this.albumForm.value.title ) {
      this.askConfirmation = true;
    }
    else{
      this.close();
    }
  }

  close() {
    this.activeModal.close('Close click');
  }

  closeConfirmationDialog() {
    this.askConfirmation = false;
  }

}
