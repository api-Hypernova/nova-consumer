import {LocaleConfig} from 'react-native-calendars';
import type {LangCode} from './languages';

// Month and weekday names for the calendar (the calendar library draws these itself, not through our text layer).
const L: Record<LangCode, {m: string[]; ms: string[]; d: string[]; ds: string[]}> = {
  en: {m: ['January','February','March','April','May','June','July','August','September','October','November','December'], ms: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], d: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], ds: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']},
  es: {m: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'], ms: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'], d: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'], ds: ['dom','lun','mar','mié','jue','vie','sáb']},
  fr: {m: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'], ms: ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'], d: ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'], ds: ['dim','lun','mar','mer','jeu','ven','sam']},
  de: {m: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'], ms: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'], d: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'], ds: ['So','Mo','Di','Mi','Do','Fr','Sa']},
  it: {m: ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'], ms: ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'], d: ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'], ds: ['dom','lun','mar','mer','gio','ven','sab']},
  pt: {m: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'], ms: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'], d: ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'], ds: ['dom','seg','ter','qua','qui','sex','sáb']},
  uk: {m: ['січень','лютий','березень','квітень','травень','червень','липень','серпень','вересень','жовтень','листопад','грудень'], ms: ['січ','лют','бер','кві','тра','чер','лип','сер','вер','жов','лис','гру'], d: ['неділя','понеділок','вівторок','середа','четвер','пʼятниця','субота'], ds: ['нд','пн','вт','ср','чт','пт','сб']},
  zh: {m: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'], ms: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], d: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'], ds: ['日','一','二','三','四','五','六']},
  ja: {m: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ms: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], d: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'], ds: ['日','月','火','水','木','金','土']},
  vi: {m: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'], ms: ['Th1','Th2','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12'], d: ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'], ds: ['CN','T2','T3','T4','T5','T6','T7']},
  th: {m: ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'], ms: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'], d: ['วันอาทิตย์','วันจันทร์','วันอังคาร','วันพุธ','วันพฤหัสบดี','วันศุกร์','วันเสาร์'], ds: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.']},
  sr: {m: ['јануар','фебруар','март','април','мај','јун','јул','август','септембар','октобар','новембар','децембар'], ms: ['јан','феб','мар','апр','мај','јун','јул','авг','сеп','окт','нов','дец'], d: ['недеља','понедељак','уторак','среда','четвртак','петак','субота'], ds: ['нед','пон','уто','сре','чет','пет','суб']},
  'sr-Latn': {m: ['januar','februar','mart','april','maj','jun','jul','avgust','septembar','oktobar','novembar','decembar'], ms: ['jan','feb','mar','apr','maj','jun','jul','avg','sep','okt','nov','dec'], d: ['nedelja','ponedeljak','utorak','sreda','četvrtak','petak','subota'], ds: ['ned','pon','uto','sre','čet','pet','sub']},
  he: {m: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'], ms: ['ינו׳','פבר׳','מרץ','אפר׳','מאי','יוני','יולי','אוג׳','ספט׳','אוק׳','נוב׳','דצמ׳'], d: ['יום ראשון','יום שני','יום שלישי','יום רביעי','יום חמישי','יום שישי','שבת'], ds: ['א׳','ב׳','ג׳','ד׳','ה׳','ו׳','ש׳']},
  ko: {m: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], ms: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], d: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'], ds: ['일','월','화','수','목','금','토']},
};

export function applyCalendarLocale(code: LangCode) {
  const l = L[code] || L.en;
  (LocaleConfig.locales as any)[code] = {monthNames: l.m, monthNamesShort: l.ms, dayNames: l.d, dayNamesShort: l.ds, today: ''};
  LocaleConfig.defaultLocale = code;
}
// register every language once so the calendar can switch instantly
(Object.keys(L) as LangCode[]).forEach(c => {
  const l = L[c];
  (LocaleConfig.locales as any)[c] = {monthNames: l.m, monthNamesShort: l.ms, dayNames: l.d, dayNamesShort: l.ds, today: ''};
});
