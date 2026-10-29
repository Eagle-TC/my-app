export const equipment = ['安全帽','護目鏡 / 面罩','呼吸防護具 / 口罩','防護手套','安全鞋','安全帶 / 防墜裝備','反光背心','聽力防護具'];
export function summary(checks) {
 const values=Object.values(checks);
 return { pass:values.filter(v=>v==='合格').length, fail:values.filter(v=>v==='不合格').length, na:values.filter(v=>v==='不適用').length };
}
export function validate(record) {
 if(!record.location?.trim() || !record.worker?.trim() || !record.inspector?.trim() || !record.date || Number.isNaN(new Date(record.date).getTime())) throw new Error('請完整填寫基本資料。');
 if(equipment.some(item=>!['合格','不合格','不適用'].includes(record.checks[item]))) throw new Error('請完成每一項防護具檢查。');
}
