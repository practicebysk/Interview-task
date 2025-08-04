import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-preview',
  imports: [FormsModule],
  templateUrl: './image-preview.html',
  styleUrl: './image-preview.scss'
})
export class ImagePreview {
  @Input() imageUrl: { id: number, img: string } = {
    id: 0,
    img: ''
  };
  @Output() closePre = new EventEmitter<{ id: number, img: string }>();
  @ViewChild('popup') popup!: ElementRef;

  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  showCaption = false;
  captionText = '';
  editCaption = false;
  captionTop = 50;
  captionLeft = 50;
  captionDrag = false;
  captionOffsetX = 0;
  captionOffsetY = 0;

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

  addCaption() {
    this.showCaption = true;
    this.editCaption = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMoveCaption(event: MouseEvent) {
    if (this.captionDrag) {
      this.captionTop = event.clientY - this.captionOffsetY;
      this.captionLeft = event.clientX - this.captionOffsetX;
    } else if (this.isDragging && this.popup) {
      const popup = this.popup.nativeElement;
      popup.style.top = `${event.clientY - this.offsetY}px`;
      popup.style.left = `${event.clientX - this.offsetX}px`;
    }
  }

  startCaptionDrag(event: MouseEvent) {
    event.stopPropagation();
    this.captionDrag = true;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.captionOffsetX = event.clientX - rect.left;
    this.captionOffsetY = event.clientY - rect.top;
  }

  @HostListener('document:mouseup')
  onRelease() {
    this.captionDrag = false;
    this.isDragging = false;
  }

  closePopup() {
    this.closePre.emit(this.imageUrl);
  }
}
