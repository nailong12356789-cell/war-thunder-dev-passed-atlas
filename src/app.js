(function () {
  'use strict';
  try {
    const records = JSON.parse(document.getElementById('atlas').textContent);
    const $ = id => document.getElementById(id);
    const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
    const validUrl = v => typeof v === 'string' && /^https?:\/\//i.test(v) ? v : '';
    const link = (value, label) => validUrl(value) ? `<a href="${esc(value)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>` : '';
    const countryEN = {'美国':'United States','德国':'Germany','苏联／俄罗斯':'USSR / Russia','英国':'United Kingdom','日本':'Japan','中国':'China','意大利':'Italy','法国':'France','瑞典':'Sweden','以色列':'Israel','其他国家':'Other countries','南非':'South Africa','芬兰':'Finland','加拿大':'Canada','印度':'India','比利时':'Belgium','荷兰':'Netherlands','马来西亚':'Malaysia','印度尼西亚':'Indonesia','挪威':'Norway','澳大利亚':'Australia','巴西':'Brazil','丹麦':'Denmark','智利':'Chile','朝鲜':'North Korea','瑞士':'Switzerland','匈牙利':'Hungary','泰国':'Thailand','巴基斯坦':'Pakistan','塞浦路斯':'Cyprus','希腊':'Greece'};
    const statusEN = {'未见同配置实装':'No matching variant identified in game','未见同国家配置实装':'No matching national variant identified','配置差异仍待核实':'Configuration differences unverified','实装状态待核实':'Implementation status unverified','旧建议配置待确认':'Historic suggestion needs verification','同系列已实装，提案构型有差异':'Family implemented; proposed variant differs','具体防护效能待核实':'Protection effectiveness unverified','已实装，申请中队研发线':'Implemented; suggestion concerns squadron research','已实装，申请加入研发线':'Implemented; suggestion concerns tech-tree placement'};
    const T = {
      zh: {title:'已转交开发者载具图鉴',subtitle:'2018–2026 年候选载具资料 · 源文件核查日期 2026-10-10 · RB 为非官方预测', meta:'独立玩家项目 · 与 Gaijin 无关联', count:['候选载具','陆战','空战','直升机','状态待核实'], notice:'公开版不包含原版内嵌的第三方图片（部分照片许可未核实）。保留全部载具记录、预测、说明及原始资料链接；联网仅发生在你主动打开来源链接时。部分旧建议和实装状态仍需复核；“转交开发者”并非保证实装。',fields:{q:'搜索名称 / 别名',country:'科技树 / 国家',kind:'兵种',year:'转交年份',status:'核实状态',rb:'预计 RB'},placeholder:'例如：Merkava / 99A / P-40',all:'全部', kinds:{G:'陆战',A:'空战',H:'直升机'},statuses:{main:'未见同配置实装',pending:'待核实'},over:'高于当前最高权重',unknown:'待定',reset:'清空筛选',sort:'排序',sorts:{country:'国家 / 兵种',recent:'最近转交',name:'名称',low:'RB 低到高',high:'RB 高到低'},prev:'上一页',next:'下一页',hits:(n,total)=>`符合条件 ${n} / ${total} 条`,links:['原始建议','转交月报','图片来源（联网）','2021 旧论坛建议','2021 旧月报'],defaultReason:'具体配置有待复核',origin:'中文原始分析',englishNote:'英文概述基于已记录资料提取，非逐字翻译',footer:'独立社区项目，不代表 War Thunder、Gaijin Entertainment 或 OpenAI 官方立场。照片及第三方资料版权归原权利人。页面离线可用。',fail:'互动目录启动失败，已保留静态目录：'},
      en: {title:'Dev-Passed Vehicle Atlas',subtitle:'Vehicle suggestions, 2018–2026 · Source data reviewed Oct 10, 2026 · RB estimates are unofficial',meta:'INDEPENDENT FAN PROJECT · NOT AFFILIATED WITH GAIJIN',count:['Candidate vehicles','Ground','Aircraft','Helicopters','Pending verification'],notice:'This public release excludes embedded third-party photos whose redistribution rights have not been established. All 1,184 candidate entries, estimates, notes and source links are retained. External links require a connection; the atlas itself works offline. “Passed to the developers” does not mean confirmed for release, and some historical records still require verification.',fields:{q:'Search names / aliases',country:'Tech tree / nation',kind:'Vehicle type',year:'Passed year',status:'Verification status',rb:'Estimated RB'},placeholder:'e.g., Merkava / Type 99A / P-40',all:'All',kinds:{G:'Ground',A:'Aircraft',H:'Helicopters'},statuses:{main:'No matching variant identified',pending:'Pending verification'},over:'Above current maximum BR',unknown:'Not determined',reset:'Clear filters',sort:'Sort by',sorts:{country:'Nation / type',recent:'Recently passed',name:'Name',low:'RB: low to high',high:'RB: high to low'},prev:'Previous',next:'Next',hits:(n,total)=>`${n} of ${total} entries`,links:['Original suggestion','Monthly report','Photo source (online)','Historic suggestion','Historic monthly report'],defaultReason:'Configuration requires further verification.',origin:'Original analysis (Chinese)',englishNote:'English summary is a structured overview, not a full translation',footer:'Independent community reference, not affiliated with or endorsed by War Thunder, Gaijin Entertainment or OpenAI. Third-party rights remain with their owners. Offline browsing supported.',fail:'Interactive view failed; static catalog remains available: '}
    };
    const controls=['q','country','kind','year','status','rb','order'];
    let lang = /^zh\b/i.test(navigator.language || '') ? 'zh' : 'en';
    try {const saved=localStorage.getItem('wt-atlas-lang');if(saved==='zh'||saved==='en')lang=saved;}catch(_e){}
    let hits = [], page=0;
    const pageSize=24;
    const countries=[...new Set(records.map(r=>r.group).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
    const years=[...new Set(records.flatMap(r=>[r.month,...(r.related_suggestions||[]).map(src=>src.month)].map(m=>(m||'').slice(0,4))).filter(Boolean))].sort().reverse();
    const rbValues=[...new Set(records.map(r=>r.rb).filter(v=>typeof v==='number'))].sort((a,b)=>a-b);
    const featurePatterns=[
      [/热像|热成像|红外瞄|夜视/, 'thermal sights'],
      [/雷达|AESA|相控阵/, 'radar and sensors'],
      [/火控|弹道计算|测距仪/, 'fire-control system'],
      [/自动装填|装弹机/, 'autoloader'],
      [/防护|装甲|ERA|反应装甲|复合装甲/, 'armor and protection'],
      [/主动防御|APS|Iron Fist|Trophy/, 'active protection'],
      [/机动|动力|发动机|推重比|速度/, 'mobility and propulsion'],
      [/空空|空对空|AMRAAM|PL12|PL-12/, 'air-to-air weapons'],
      [/对地|空地|空对地|制导炸弹/, 'air-to-ground weapons'],
      [/导弹|反坦克|ATGM/, 'guided missiles'],
      [/机枪|航炮|机关炮|火炮|坦克炮|主炮/, 'gun armament'],
      [/炸弹|载弹|火箭弹/, 'bombs and rockets'],
      [/隐身|低可探测/, 'low-observable design'],
      [/弹药|穿深|尾翼稳定/, 'ammunition'],
      [/干扰|电子战|ECM/, 'countermeasures'],
      [/鱼雷|反潜|声呐/, 'naval or anti-submarine equipment']
    ];
    function englishReason(r){
      const chinese=String(r.rb_reason||r.reason||'');
      const match=chinese.match(/参考比较：(.+?)，当前官方(陆战|空战)\s*RB\s*([\d.]+)/);
      let text='';
      if(match){
        const kind=match[2]==='陆战'?'Ground':'Air';
        text=`Compared with ${match[1]} (official ${kind} RB ${match[3]}). `;
      }
      if(r.over){text+='The proposed configuration may exceed the current in-game battle-rating ceiling. No hypothetical numeric RB is assigned. ';}
      else if(typeof r.rb==='number'){text+=`Community-projected RB: ${r.rb.toFixed(1)}. `;}
      else{text+='A numerical RB cannot yet be justified. ';}
      const features=match?[]:featurePatterns.filter(([re])=>re.test(chinese)).map(([,label])=>label).slice(0,4);
      if(features.length)text+=`Factors mentioned in the original analysis: ${features.join(', ')}. `;
      text+='Configuration, capabilities and implementation status require independent verification; this is not an official game rating.';
      return text;
    }
    const nation=country=>lang==='en'?(countryEN[country]||country):country;
    const statusText=r=>lang==='en'?(statusEN[r.status_label]||T.en.statuses[r.status]||T.en.statuses.pending):(r.status_label||T.zh.statuses.pending);
    function choices(id, options){
      const element=$(id),value=element.value;
      element.replaceChildren();
      for(const [v, label] of options){const opt=document.createElement('option');opt.value=v;opt.textContent=label;element.appendChild(opt);}
      element.value=value;
      if(element.value!==value)element.value='';
    }
    function applyTranslations(){
      const tr=T[lang];document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=(lang==='zh'?'战争雷霆 · 已转交开发者载具图鉴':'War Thunder · Dev-Passed Vehicle Atlas')+' V10.1';
      const header=document.querySelector('header h1');
      if(header?.firstChild)header.firstChild.textContent=tr.title;
      const subtitle=document.querySelector('header h1 small');if(subtitle)subtitle.textContent='WAR THUNDER · DEV-PASSED VEHICLE ATLAS · V10.1';
      const topMeta=document.querySelector('header .meta');if(topMeta)topMeta.textContent=tr.meta;
      const subtitleMeta=document.querySelector('header h1 + .meta');if(subtitleMeta)subtitleMeta.textContent=tr.subtitle;
      document.querySelectorAll('header .stat small').forEach((el,i)=>el.textContent=tr.count[i]);
      const notice=document.querySelector('main > .notice');if(notice)notice.textContent=tr.notice;
      controls.slice(0,6).forEach(id=>{const label=$(id).closest('label');if(label?.firstChild?.nodeType===Node.TEXT_NODE)label.firstChild.textContent=tr.fields[id];});
      $('q').placeholder=tr.placeholder;
      choices('country',[['',tr.all],...countries.map(c=>[c,nation(c)])]);
      choices('kind',[['',tr.all],...['G','A','H'].map(k=>[k,tr.kinds[k]])]);
      choices('year',[['',tr.all],...years.map(y=>[y,y])]);
      choices('status',[['',tr.all],['main',tr.statuses.main],['pending',tr.statuses.pending]]);
      choices('rb',[['',tr.all],['over',tr.over],...rbValues.map(v=>[String(v),v.toFixed(1)])]);
      choices('order',Object.entries(tr.sorts));
      $('reset').textContent=tr.reset;
      $('prev').textContent=tr.prev;$('next').textContent=tr.next;
      const sortLabel=$('order').closest('label');if(sortLabel?.firstChild?.nodeType===Node.TEXT_NODE)sortLabel.firstChild.textContent=tr.sort+' ';
      const foot=document.querySelector('footer .wrap');if(foot)foot.textContent=tr.footer;
      for(const [key,el] of [['zh',$('langZh')],['en',$('langEn')]]){el.setAttribute('aria-pressed',String(lang===key));}
    }
    function render(){
      const tr=T[lang],frag=document.createDocumentFragment(),shown=hits.slice(page*pageSize,(page+1)*pageSize);
      for(const r of shown){
        const el=document.createElement('article');el.className='card';
        const photo=r.photos?.[0]||{};
        const rb=r.over?tr.over:(r.rb_label||tr.unknown);
        const chinese=String(r.rb_reason||r.reason||tr.defaultReason);
        const reason=lang==='en'?englishReason(r):chinese;
        const details=lang==='en'?`<details class="reason-source"><summary>${esc(tr.origin)}</summary><p lang="zh-CN">${esc(chinese)}</p></details>`:'';
        el.innerHTML=`<div class="eyebrow"><span>${esc(nation(r.group))} · ${esc(tr.kinds[r.kind]||r.kind)}</span><span>${esc(r.month)}</span></div><h3>${esc(r.name)}</h3><div class="rb">${esc(rb)}</div><div class="status ${r.status==='pending'?'pending':''}">${esc(statusText(r))}</div><p class="why">${esc(reason)}</p>${details}<div class="links">${link(r.suggestion_url,tr.links[0])}${link(r.monthly_url,tr.links[1])}${link(photo.url,tr.links[2])}${(r.related_suggestions||[]).map(src=>link(src.suggestion_url,tr.links[3])+' '+link(src.monthly_url,tr.links[4])).join(' ')}</div>`;
        frag.appendChild(el);
      }
      $('grid').replaceChildren(frag);
      $('resultCount').textContent=tr.hits(hits.length,records.length);
      const pages=Math.max(1,Math.ceil(hits.length/pageSize));
      $('pageStatus').textContent=`${page+1} / ${pages}`;
      $('prev').disabled=page===0;$('next').disabled=page>=pages-1;
    }
    function filter(){
      const q=$('q').value.trim().toLocaleLowerCase(),country=$('country').value,kind=$('kind').value,year=$('year').value,status=$('status').value,rb=$('rb').value,order=$('order').value;
      hits=records.filter(r=>{
        const searchable=[r.name,r.country,r.group,countryEN[r.country],countryEN[r.group],T.en.kinds[r.kind],T.zh.kinds[r.kind],statusText(r),statusEN[r.status_label],r.rb_reason,r.reason,...(r.aliases||[]),...(r.related_suggestions||[]).map(src=>[src.month,src.name].join(' '))].join(' ').toLocaleLowerCase();
        return (!q||searchable.includes(q))&&(!country||r.group===country)&&(!kind||r.kind===kind)&&(!year||[r.month,...(r.related_suggestions||[]).map(src=>src.month)].some(m=>(m||'').startsWith(year)))&&(!status||r.status===status)&&(!rb||(rb==='over'?r.over:!r.over&&r.rb===Number(rb)));
      });
      hits.sort((a,b)=>order==='recent'?(b.month||'').localeCompare(a.month||''):order==='name'?(a.name||'').localeCompare(b.name||''):order==='low'?(a.rb??999)-(b.rb??999):order==='high'?(b.rb??-1)-(a.rb??-1):String(a.group).localeCompare(String(b.group),'zh-CN')||String(a.kind).localeCompare(String(b.kind))||String(a.name).localeCompare(String(b.name)));
      page=0;render();
    }
    const langBar=document.createElement('nav');langBar.className='lang-switch';langBar.setAttribute('aria-label','Language / 语言');
    langBar.innerHTML='<button id="langZh" type="button" aria-pressed="false" lang="zh-CN">中文</button><button id="langEn" type="button" aria-pressed="false" lang="en">English</button>';
    document.querySelector('header .wrap').appendChild(langBar);
    for(const code of ['zh','en'])$(code==='zh'?'langZh':'langEn').addEventListener('click',()=>{lang=code;try{localStorage.setItem('wt-atlas-lang',lang)}catch(_e){}applyTranslations();filter();});
    controls.forEach(id=>$(id).addEventListener(id==='q'?'input':'change',filter));
    $('reset').addEventListener('click',()=>{controls.forEach(id=>{if(id!=='order')$(id).value='';});filter();});
    $('prev').addEventListener('click',()=>{if(page>0){page--;render();}});
    $('next').addEventListener('click',()=>{if((page+1)*pageSize<hits.length){page++;render();}});
    applyTranslations();filter();document.body.classList.add('js-ready');
  }catch(e){const n=document.createElement('p');n.textContent='Interactive atlas could not start / 互动目录启动失败: '+e.message;document.getElementById('fallback').prepend(n);}
})();
