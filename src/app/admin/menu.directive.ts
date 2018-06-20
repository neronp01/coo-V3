import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InterfaceService } from './interface.service';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {
  innerWidth: number;
  constructor(private el: ElementRef, private renderer: Renderer, private router: Router,
  private inter: InterfaceService) {
    setTimeout(() => {
     // this.screen(window.innerWidth, this.router.routerState.snapshot.url);
      console.log('windos', window.innerWidth);
    }, 1000);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const url = this.router.routerState.snapshot.url;
    this.innerWidth = window.innerWidth;
    this.screen(this.innerWidth, url);
    console.log('hosteee',  this.innerWidth);
  }
  @HostListener('mouseover') onMouseOver() {
//    this.ChangeBgColor('red');
}

  ChangeBgColor(color: string) {
    console.log('menuOpen', this.inter.menuOpen);
    this.renderer.setElementStyle(this.el.nativeElement, 'background-color', color);
}
screen(size: number, url: string) {
  switch (url) {
    case '/accueil':
    const menueCard = this.el.nativeElement.querySelector('.toolbar_menu');
    const picImage = this.el.nativeElement.querySelector('.pic_image');
    const accueillayoute = this.el.nativeElement.querySelector('.flex-item');
    if (size < 875) {
      this.inter.menuOpen = false;
      this.inter.icon = 'menu';
      const width = size - 100 + 'px';
      this.renderer.setElementStyle(menueCard, 'position', 'absolute');
      this.renderer.setElementStyle(menueCard, 'top', '-10px');
      this.renderer.setElementStyle(menueCard, 'background-color', 'rgba(33, 33, 33, .7)');
      this.renderer.setElementStyle(picImage, 'width', width);
      this.renderer.setElementStyle(accueillayoute, 'flex', '1');
      this.renderer.setElementStyle(picImage, 'height', ((size - 100) * .8) + 'px');
    }else if (size < 1051) {
      this.inter.menuOpen = false;
      this.inter.icon = 'menu';
      const width = size - 100 + 'px';
      this.renderer.setElementStyle(menueCard, 'position', 'absolute');
      this.renderer.setElementStyle(menueCard, 'top', '-10px');
      this.renderer.setElementStyle(menueCard, 'background-color', 'rgba(33, 33, 33, .7)');
      this.renderer.setElementStyle(picImage, 'width', width);
      this.renderer.setElementStyle(accueillayoute, 'flex', '1');
      this.renderer.setElementStyle(picImage, 'height', ((size - 100) * .8) + 'px');

    }else if (size < 1432) {
      // this.changeStyleElement('background-color', 'rgba(33, 33, 33, .7)');
      // this.changeStyleElement('position', 'absolute');
      // this.changeStyleElement('top', '0px');
      this.inter.menuOpen = false;
      this.inter.icon = 'menu';
    } else if ( this.innerWidth > 1432) {

      // this.changeStyleElement('background-color', 'rgba(33, 33, 33, .3)');
      // this.changeStyleElement('position', 'relative');
      // this.changeStyleElement('top', '-148px');
      this.inter.menuOpen = true;
      this.inter.icon = 'arrow_back';
    }
    console.log('image', picImage, size);
    break;
  }
  }

  changeStyleElement(obj: string, value: string) {
    this.renderer.setElementStyle(this.el.nativeElement, obj, value);
  }
}
