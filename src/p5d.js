/* ===== round 11: stars cost more (signing fee is 8 weeks of salary, so this raises both) ===== */
const STAR_PREM=2.2;   /* set by eye: extra multiplier at pop 100 is 1+STAR_PREM; starts above pop 45 */
(function(){const _so=salaryOf;salaryOf=function(w,tier){return Math.max(20,Math.round(_so(w,tier)*(1+STAR_PREM*Math.pow(clamp((w.pop-45)/55,0,1),2))/10)*10)}})();
