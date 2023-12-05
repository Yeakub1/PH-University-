import {
  AcadmicSemesterNameCodeMapper,
  TAcadmicSemesterCode,
  TAcadmicSemesterName,
  TMonths,
} from './acadmicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const acadmicSemesterName: TAcadmicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const acadmicSemesterCode: TAcadmicSemesterCode[] = ['01', '02', '03'];

export const acadmicSemesterNameCodeMapper: AcadmicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
