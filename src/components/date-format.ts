import * as moment from 'moment';

/**
 * Helper using moment to format displayed dates
 * http://aurelia.io/docs/binding/value-converters#simple-converters
 */
export class DateFormatValueConverter {
  toView(value) {
    return moment(new Date(value)).format('lll');
  }
}
