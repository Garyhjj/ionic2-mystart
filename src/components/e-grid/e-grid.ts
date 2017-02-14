import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationItem } from '../../interfaces/applicationitem';

/*
  Generated class for the EGrid component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'e-grid',
  templateUrl: 'e-grid.html'
})
export class EGridComponent {

  @Input()
  items: ApplicationItem[];
  @Input()
  type: string; // value: remove or add
  @Input()
  showBtn: boolean;// value: true or false
  @Output()  // 当点击删除图标是，把对应的id emit给父组件
  // onDelete = new EventEmitter();
  onSelect = new EventEmitter();
  @Output()
  onClick = new EventEmitter();

  constructor() {
  }

  selectItem(id: number) {
    this.onSelect.emit(id);
  }

  goToDetailPage(id: number): void {
    this.onClick.emit(id);
  }



}

