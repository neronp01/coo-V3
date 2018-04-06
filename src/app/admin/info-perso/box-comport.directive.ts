import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBoxComport]'
})
export class BoxComportDirective {
  @Input() appBoxComport: string;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    console.log('test' , this.appBoxComport);
      const adhesion = this.el.nativeElement.querySelector('.adhesionInfo');
      const part = this.el.nativeElement.querySelector('.d_cordonnées');
      const part2 = this.el.nativeElement.querySelector('.d_tel');
      const achats = this.el.nativeElement.querySelector('.facturesInfo');
    switch (this.appBoxComport) {
      case 'none':
      this.renderer.setElementStyle(adhesion, 'display', 'none');
      this.renderer.setElementStyle(part, 'display', 'flex');
      this.renderer.setElementStyle(part2, 'display', 'flex');
      this.renderer.setElementStyle(achats, 'display', 'none');
      break;
      case 'adhesion':
      this.renderer.setElementStyle(adhesion, 'display', 'flex');
        this.renderer.setElementStyle(part, 'display', 'none');
        this.renderer.setElementStyle(part2, 'display', 'none');
        this.renderer.setElementStyle(achats, 'display', 'none');
      break;
      case 'achats':
      this.renderer.setElementStyle(adhesion, 'display', 'none');
        this.renderer.setElementStyle(part, 'display', 'none');
        this.renderer.setElementStyle(part2, 'display', 'none');
        this.renderer.setElementStyle(achats, 'display', 'flex');
      break;
    }

    // if (this.el.nativeElement.contains(event.target)) {
    //   console.log('test');
    //   this.highlight('yellow');
    // } else {
    //   this.highlight(null);
    // }
  }

//   highlight(color) {
//     console.log(this.renderer);
//  //   this.renderer.setElementStyle('.h2_name', 'background-color', color);
//   }

}
