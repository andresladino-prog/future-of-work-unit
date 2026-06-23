const TEACHER_EMAIL = 'andres.ladino@correounivalle.edu.co';
const vocab = [
 ['Turnover','If this company had better conditions for its employees, we would not have such a high turnover. It is even hard to make friends here when people come and go so often.','the rate at which workers are replaced in a workforce.',['a formal job contract.','the rate at which workers are replaced in a workforce.','a company merger.']],
 ['Fad','Silly dances and practical jokes you see in TikTok or Instagram are just passing fads. They are only popular for days or even less; then there is something new coming up in your feed.','a short-lived fashion, manner of conduct, etc., especially one followed enthusiastically by a group.',['a permanent tradition.','a short-lived fashion, manner of conduct, etc., especially one followed enthusiastically by a group.','a legal requirement.']],
 ['Well-being','Nowadays, companies are considering their employees’ well-being more and more. Mental health workshops, active pauses, and relaxing spaces are more common in the workplace.','a state of health, happiness, comfort, and prosperity.',['a state of health, happiness, comfort, and prosperity.','a period of unemployment.','a work schedule.']],
 ['Absenteeism','The level of absenteeism in the university during the no car / no motorcycle day is really high. People prefer to stay at home and participate in remote activities rather than go to campus.','persistent absence from work, school, etc.',['persistent absence from work, school, etc.','employee productivity.','a digital skill.']],
 ['Figure out','Foreign trade professionals need to figure out new ways to adapt and be more competitive in changing times.','to solve a problem or discover the answer to a question; to reach an understanding.',['to hire someone.','to solve a problem or discover the answer to a question; to reach an understanding.','to work remotely.']],
 ['Remote','Many workers prefer remote activities because they can complete tasks from home or from another city.','being, relating to, or involving a means of doing or using something indirectly or from a distance.',['belonging to an individual person.','being, relating to, or involving a means of doing or using something indirectly or from a distance.','popular for a short time.']],
 ['Private','A private company belongs to an individual person, a group, or a specific interest, not directly to the government.','belonging to or concerning an individual person, company, or interest.',['belonging to or concerning an individual person, company, or interest.','done from a distance.','related to STEM.']]
];
const speakers = [
 ['Adam Grant','Organizational psychologist and author.','The reduction of the workweek from six to five days produced higher morale and more loyalty in workers as well as a lower turnover.'],
 ['Hilary Cottam','Social Entrepreneur – Centre for the Fifth Social Revolution','According to the ILO and WHO, overwork has been directly responsible for mental health and chronic disease crises in society.'],
 ['Ohood Bint Khalfan Al Roumi','Minister of State for Government Development and the Future UAE','The implementation of a 4.5-day workweek in the public sector has created a considerable reduction in absenteeism.'],
 ['Anne-Marie Slaughter','CEO New America','A person that prioritizes well-being, care, and connection with the community is a whole human being or Sapiens Integra.'],
 ['Jonas Prising','Chairman and Executive Officer, ManpowerGroup','Employees want flexibility, choices, and the opportunity to work their way.']
];
const dev = [
 ['Select the correct characteristic of an informative text:', 'It provides facts, descriptions, and examples that explain the subject matter and normally contains subheadings.', ['It tells a story with characters and a problem.','It provides facts, descriptions, and examples that explain the subject matter and normally contains subheadings.','It is organized chronologically around a person’s life.','It tries to persuade through a thesis statement.']],
 ['Degrees and higher education are becoming ___ than actionable skills and experience.', 'less important', ['more important','less important','the most important']],
 ['Digital technologies have been one of the ___ contributors to the transformation of work.', 'biggest', ['bigger','biggest','more big']],
 ['Employees are having a much ___ role in today’s companies than in the past.', 'more participative', ['most participative','participativer','more participative']],
 ['Human Resources departments around the globe consider listening to workers an ___ task.', 'essential', ['essential','more essential than','the essentialest']],
 ['Young people who want to enter the current workforce ___ concentrate only on graduate degrees.', 'shouldn’t', ['shouldn’t','might','must']],
 ['Efficient and competitive companies ___ invest in new technologies and talent retention.', 'may', ['couldn’t','may','must not']],
 ['People with competitive profiles ___ evaluate their work opportunities carefully.', 'can', ['can','couldn’t','must not']]
];
const structure = [
 ['Five key trends shaping the new world of work','Title'],['A transformation in the world of work is happening. Here are five changes:','Heading'],['Efficiency / Skills-based Hiring / Talent Mobility / Work vs Employment / Digital Skills','Subtitles'],['The key is to be competitive / What can you do? / Technology mastery is king','Supportive Ideas']
];
function el(tag, attrs={}, text=''){const n=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v)); if(text)n.textContent=text; return n;}
function makeSelect(correct, options){const s=el('select',{'data-answer':correct}); s.innerHTML='<option value="">Select...</option>'+options.map(o=>`<option>${o}</option>`).join(''); return s;}
function build(){
 const v=document.getElementById('vocabQuiz'); vocab.forEach((x,i)=>{let q=el('div',{class:'q vocab-item'});q.innerHTML=`<strong>${i+1}. ${x[0]}</strong><p class="example">${x[1]}</p>`;q.append(makeSelect(x[2],x[3]));v.append(q)});
 const sp=document.getElementById('speakerQuiz'); speakers.forEach((x,i)=>{let q=el('div',{class:'q'});q.innerHTML=`<strong>${x[0]}</strong><br><small>Select the correct job title and statement.</small>`;q.append(makeSelect(x[1],speakers.map(s=>s[1])));q.append(makeSelect(x[2],speakers.map(s=>s[2])));sp.append(q)});
 const dq=document.getElementById('developmentQuiz'); dev.forEach((x,i)=>{let q=el('div',{class:'q'});q.innerHTML=`<strong>${i+4}. ${x[0]}</strong>`;q.append(makeSelect(x[1],x[2]));dq.append(q)});
 const st=document.getElementById('structureQuiz'); structure.forEach(x=>{let q=el('div',{class:'q'});q.innerHTML=`<strong>${x[0]}</strong>`;q.append(makeSelect(x[1],['Title','Heading','Subtitles','Supportive Ideas']));st.append(q)});
 const essayBox=document.getElementById('essay');
 essayBox.addEventListener('paste',e=>{e.preventDefault(); alert('Pasting is disabled. Please write your own response.');});
 essayBox.addEventListener('drop',e=>{e.preventDefault(); alert('Dropping text is disabled. Please write your own response.');});
 essayBox.addEventListener('contextmenu',e=>e.preventDefault());
 essayBox.addEventListener('input',()=>{document.getElementById('wordCount').textContent=countWords(essayBox.value)+' words'});
}
function countWords(t){return (t.trim().match(/\b[\w'-]+\b/g)||[]).length}
function getSectionScore(selector){
 const inputs=[...document.querySelectorAll(selector)];
 let ok=0;
 inputs.forEach(input=>{
   const a=(input.dataset.answer||'').trim().toLowerCase();
   const v=(input.value||'').trim().toLowerCase();
   input.classList.toggle('bad',v!==a&&v);
   if(v===a) ok++;
 });
 return {ok,total:inputs.length,percent: inputs.length? Math.round(ok/inputs.length*100):0};
}
function score(){
 const preparation=getSectionScore('#preparation select,#preparation .gap');
 const development=getSectionScore('#development select,#development .gap');
 const closure=evaluateEssay(document.getElementById('essay').value);
 const weighted=Math.round((preparation.percent*0.20)+(development.percent*0.40)+(closure.score*0.40));
 return {preparation,development,closure,weighted};
}
function evaluateEssay(text){
 const words=countWords(text);
 const lower=text.toLowerCase();
 const sentences=(text.match(/[.!?]+/g)||[]).length || 1;
 const unique=new Set((lower.match(/\b[a-z']+\b/g)||[]));
 const comparatives=(lower.match(/\b(more|less)\s+\w+\s+than\b|\b\w+er\s+than\b/g)||[]).length;
 const superlatives=(lower.match(/\bthe\s+(most|least)\s+\w+|\bthe\s+\w+est\b/g)||[]).length;
 const modals=(lower.match(/\b(should|must|could|can|may|might|have to|need to)\b/g)||[]).length;
 const futures=(lower.match(/\b(will|going to|might|may|is likely to|are likely to)\b/g)||[]).length;
 const topicTerms=(lower.match(/\b(talent|shortage|companies|governments|workers|skills|digital|future|work|job|market|employment)\b/g)||[]).length;
 const connectors=(lower.match(/\b(first|second|third|because|therefore|however|also|finally|in conclusion|for example)\b/g)||[]).length;
 let task=0;
 if(words>=150 && words<=200) task+=18; else if(words>=120 && words<=230) task+=12; else if(words>0) task+=6;
 task += Math.min(12, topicTerms*2);
 let grammar=10 + Math.min(10, modals*2) + Math.min(10, futures*2);
 let language=Math.min(15, comparatives*5 + superlatives*5) + Math.min(10, Math.round(unique.size/12));
 let organization=Math.min(15, sentences*2 + connectors*2);
 const score=Math.max(0, Math.min(100, task+grammar+language+organization));
 const ai=aiSuspicion(text, words, unique.size, sentences);
 return {score,words,comparatives,superlatives,modals,futures,ai};
}
function aiSuspicion(text, words, uniqueWords, sentences){
 const lower=text.toLowerCase();
 let points=0; let flags=[];
 const advanced=['profound','undergoing','paradigm','multifaceted','unprecedented','substantial','leverage','foster','holistic','increasingly','crucial','mitigate','implement','navigate','transformative'];
 const advHits=advanced.filter(w=>lower.includes(w));
 if(advHits.length>=3){points+=25; flags.push('Vocabulary may be above B1 level: '+advHits.slice(0,5).join(', '));}
 if(words>=150 && sentences && words/sentences>22){points+=20; flags.push('Average sentence length is unusually high for B1.');}
 if(words>=150 && uniqueWords/words>0.62){points+=15; flags.push('Lexical variety is unusually high.');}
 if(/it is important to note that|in today'?s rapidly changing world|plays a crucial role|in conclusion, it can be said/i.test(text)){points+=20; flags.push('Some expressions sound generic or AI-like.');}
 if(words>=150 && !/[a-z]\s+(is|are|have|has)\s+\w+ed\b/i.test(text) && !/\b(i think|in my opinion)\b/i.test(text)){points+=10; flags.push('The text has very few natural learner markers.');}
 points=Math.min(100,points);
 const level=points>=60?'High':points>=35?'Medium':'Low';
 return {points,level,flags: flags.length? flags:['No strong AI-use indicators detected. This is only a heuristic.']};
}
function recommendations(scores){
 const r=[];
 if(scores.preparation.percent<70) r.push('Review the preparation activities, especially vocabulary and video information.');
 if(scores.development.percent<70) r.push('Review the reading carefully, especially text structure, comparatives, and modal verbs.');
 if(scores.closure.words<150) r.push('Your essay is below 150 words; expand your ideas with predictions and recommendations.');
 if(scores.closure.words>200) r.push('Your essay is above 200 words; edit for concision.');
 if(scores.closure.comparatives+scores.closure.superlatives<2) r.push('Use more comparatives and superlatives.');
 if(scores.closure.modals<2) r.push('Use more modal verbs such as should, must, could, or may.');
 if(scores.closure.futures<2) r.push('Use more future forms such as will, going to, might, or may.');
 if(scores.weighted>=85) r.push('Excellent overall performance.'); else if(scores.weighted>=70) r.push('Good overall performance, but some items need review.'); else r.push('You should review the unit and ask your teacher for feedback.');
 return r.join(' ')
}
function generateReport(){
 const name=document.getElementById('studentName').value.trim();
 const email=document.getElementById('studentEmail').value.trim();
 const essay=document.getElementById('essay').value.trim();
 const s=score();
 const rec=recommendations(s);
 const report=`THE FUTURE OF WORK - ONLINE UNIT REPORT\n\nStudent: ${name}\nEmail: ${email}\n\nWeighted final score: ${s.weighted}/100\n\nScore breakdown:\nPreparation: ${s.preparation.ok}/${s.preparation.total} (${s.preparation.percent}%) × 20%\nDevelopment: ${s.development.ok}/${s.development.total} (${s.development.percent}%) × 40%\nClosure essay: ${s.closure.score}/100 × 40%\n\nEssay analysis:\nWord count: ${s.closure.words}\nComparatives/Superlatives detected: ${s.closure.comparatives + s.closure.superlatives}\nModal verbs detected: ${s.closure.modals}\nFuture forms detected: ${s.closure.futures}\nAI-use suspicion: ${s.closure.ai.level} (${s.closure.ai.points}/100)\nAI indicators: ${s.closure.ai.flags.join(' | ')}\n\nRecommendations:\n${rec}\n\nEssay for teacher review:\n${essay}`;
 document.getElementById('resultBox').textContent=report;
 return report;
}
function sendReport(){const report=generateReport(); const email=document.getElementById('studentEmail').value.trim(); const to=encodeURIComponent(`${email},${TEACHER_EMAIL}`); const subject=encodeURIComponent('The Future of Work - Online Unit Report'); const body=encodeURIComponent(report); window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;}
window.addEventListener('load',build);
