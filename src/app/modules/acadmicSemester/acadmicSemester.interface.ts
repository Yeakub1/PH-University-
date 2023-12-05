export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcadmicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcadmicSemesterCode = '01' | '02' | '03';

export type TAcadmicSemester = {
  name: TAcadmicSemesterName;
  code: TAcadmicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
