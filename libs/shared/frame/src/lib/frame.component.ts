import {Component, Input } from '@angular/core';
import {ReadingListItem} from "@tmo/shared/models";

@Component({
  selector: 'tmo-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  @Input() totalUnread: number;
  @Input() readingList: ReadingListItem[];

}
