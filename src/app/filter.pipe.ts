import { Pipe, PipeTransform } from '@angular/core';
import {Exercise} from './exercise';

@Pipe({
  name: 'filter',
  pure:false,
})
export class FilterPipe implements PipeTransform {

  transform(items: Exercise[], filter: Exercise):Exercise[]{
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: Exercise) => this.applyFilter(item, filter));
  }
  applyFilter(exercise: Exercise, filter: Exercise): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (exercise.muscles.indexOf(filter[field]) === -1) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
