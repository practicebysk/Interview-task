import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  @Output() imgClicked = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  @ViewChild('popup') popup!: ElementRef;

  images = [
    'https://media.istockphoto.com/id/1133924836/photo/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?s=612x612&w=0&k=20&c=qgSlKBhrhnDy48pBa54Y1muEQP18E2pfCsW88qSNGro=',
    'https://media.gettyimages.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=gi&k=20&c=xs_DvcvEflA-EIRXXGK71Et6OtVHldTx2E7flyjybk0=',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEow7qrpNbzzhwsDlfz8pPGGYSQ_--GwAA4A&s',
    'https://t3.ftcdn.net/jpg/12/56/95/96/360_F_1256959653_oC27zlqvZIcbcDbmZFlGgkxwj1hJaszA.jpg',
    'https://thumbs.dreamstime.com/b/creative-focus-effect-abstract-computer-script-big-data-blockchain-database-gibberish-dummy-lorem-ipsum-text-programmer-276219526.jpg'
  ];

  offsetX = 0;
  offsetY = 0;
  isDragging = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.popup) {
      const popup = this.popup.nativeElement;
      popup.style.top = `${event.clientY - this.offsetY}px`;
      popup.style.left = `${event.clientX - this.offsetX}px`;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    const rect = this.popup.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;
  }

  openPreview(imgPath: string) {
    this.imgClicked.emit(imgPath);
  }

  closePopup() {
    this.close.emit();
  }
}
