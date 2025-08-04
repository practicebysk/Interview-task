import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Calculator } from './page/calculator/calculator';
import { ImagePreview } from './page/image-preview/image-preview';
import { Gallery } from './page/gallery/gallery';

@Component({
  selector: 'app-root',
  imports: [Calculator, Gallery, ImagePreview, NgbModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  calculators: number[] = [];
  isOpenGallery = false;
  imgPreviews: any[] = [];

  addCalculator() {
    this.calculators.push(this.calculators.length + 1);
  }

  closeCalculator(id) {
    this.calculators = this.calculators.filter(ele => ele !== id);
  }

  openGallery() {
    this.isOpenGallery = true;
  }

  openImgPreview(image: string) {
    this.imgPreviews.push({ id: this.imgPreviews.length + 1, img: image });
  }

  closePreview(data:any) {
    this.imgPreviews = this.imgPreviews.filter(ele => ele.id !== data.id);
  }
}
