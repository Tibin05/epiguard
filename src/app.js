const today = new Date();
const isoToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const fmt = d => new Intl.DateTimeFormat('pt-BR').format(new Date(`${d}T12:00:00`));
const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2,7)}`;
const addDays = (date, days) => { const d = new Date(`${date}T12:00:00`); d.setDate(d.getDate()+Number(days)); return d.toISOString().slice(0,10); };
const daysUntil = date => Math.ceil((new Date(`${date}T12:00:00`) - new Date(`${isoToday}T12:00:00`)) / 86400000);

const seed = {
  collaborators:[
    {id:'c1',name:'Ana Beatriz Souza',registration:'COL-0184',role:'Operadora de campo',base:'Base Leste',active:true},
    {id:'c2',name:'Rafael Lima Santos',registration:'COL-0217',role:'Técnico de manutenção',base:'Base Oeste',active:true},
    {id:'c3',name:'Carla Mendes Rocha',registration:'COL-0261',role:'Agente de tráfego',base:'Base Norte',active:true},
    {id:'c4',name:'Bruno Almeida Reis',registration:'COL-0302',role:'Operador de conservação',base:'Base Sul',active:true}
  ],
  epis:[
    {id:'e1',name:'Capacete de segurança',category:'Proteção da cabeça',ca:'CA 498',lifetime:365,stock:24},
    {id:'e2',name:'Luva de proteção',category:'Proteção das mãos',ca:'CA 31244',lifetime:180,stock:42},
    {id:'e3',name:'Protetor auricular',category:'Proteção auditiva',ca:'CA 5745',lifetime:180,stock:31},
    {id:'e4',name:'Colete refletivo',category:'Alta visibilidade',ca:'CA 43916',lifetime:365,stock:18},
    {id:'e5',name:'Óculos de proteção',category:'Proteção ocular',ca:'CA 19625',lifetime:240,stock:27}
  ],
  deliveries:[
    {id:'d1',collaboratorId:'c1',epiId:'e1',deliveryDate:addDays(isoToday,-340),validityDate:addDays(isoToday,25),status:'Ativo'},
    {id:'d2',collaboratorId:'c2',epiId:'e2',deliveryDate:addDays(isoToday,-190),validityDate:addDays(isoToday,-10),status:'Ativo'},
    {id:'d3',collaboratorId:'c3',epiId:'e4',deliveryDate:addDays(isoToday,-50),validityDate:addDays(isoToday,315),status:'Ativo'},
    {id:'d4',collaboratorId:'c4',epiId:'e3',deliveryDate:addDays(isoToday,-20),validityDate:addDays(isoToday,160),status:'Ativo'},
    {id:'d5',collaboratorId:'c1',epiId:'e5',deliveryDate:addDays(isoToday,-260),validityDate:addDays(isoToday,-20),status:'Devolvido',returnDate:addDays(isoToday,-19)}
  ]
};

const storageKey = 'epiguard-cp5-data-v1';
let state = JSON.parse(localStorage.getItem(storageKey) || 'null') || structuredClone(seed);
let currentUser = null;
const $ = id => document.getElementById(id);
const persist = () => localStorage.setItem(storageKey, JSON.stringify(state));
const collabById = id => state.collaborators.find(x=>x.id===id);
const epiById = id => state.epis.find(x=>x.id===id);

function toast(message){ const t=$('toast'); t.textContent=message; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function statusClass(status){ return status==='Ativo'?'ok':status==='Devolvido'?'neutral':status==='Descartado'?'warning':'neutral'; }
function expiryInfo(delivery){ const diff=daysUntil(delivery.validityDate); if(diff<0) return {label:`Vencido há ${Math.abs(diff)} dia(s)`,type:'danger'}; if(diff<=15) return {label:`Vence em ${diff} dia(s)`,type:'urgent'}; if(diff<=30) return {label:`Vence em ${diff} dia(s)`,type:'warning'}; return {label:'Dentro da validade',type:'ok'}; }

$('todayLabel').textContent = new Intl.DateTimeFormat('pt-BR',{dateStyle:'long'}).format(today);
$('deliveryDate').value=isoToday; $('returnDate').value=isoToday;

$('loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  const email=$('email').value.trim().toLowerCase(), pass=$('password').value;
  const users={
    'tecnico@epiguard.com':{name:'Marcos Aurélio',role:'Técnico de Segurança',pass:'123456'},
    'admin@epiguard.com':{name:'Administrador EPIGuard',role:'Administrador',pass:'123456'}
  };
  if(!users[email] || users[email].pass!==pass){ toast('Usuário ou senha inválidos.'); return; }
  currentUser=users[email]; $('profileName').textContent=currentUser.name; $('profileRole').textContent=currentUser.role;
  $('loginView').classList.add('hidden'); $('appView').classList.remove('hidden'); renderAll();
});
$('logoutBtn').addEventListener('click',()=>{$('appView').classList.add('hidden');$('loginView').classList.remove('hidden');currentUser=null;});

const pageMeta={dashboard:['VISÃO GERAL','Dashboard'],colaboradores:['CADASTROS','Colaboradores'],epis:['CADASTROS','EPIs'],entregas:['MOVIMENTAÇÃO','Entregas e devoluções'],historico:['RASTREABILIDADE','Histórico'],alertas:['CONFORMIDADE','Alertas de vencimento']};
function go(page){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active-page'));
  $(`${page}Page`).classList.add('active-page');
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===page));
  $('pageEyebrow').textContent=pageMeta[page][0]; $('pageTitle').textContent=pageMeta[page][1];
  renderAll();
}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

function renderDashboard(){
  const active=state.deliveries.filter(x=>x.status==='Ativo');
  $('statAtivos').textContent=active.length;
  $('statVencidos').textContent=active.filter(x=>daysUntil(x.validityDate)<0).length;
  $('statAVencer').textContent=active.filter(x=>daysUntil(x.validityDate)>=0&&daysUntil(x.validityDate)<=30).length;
  $('statMes').textContent=state.deliveries.filter(x=>x.deliveryDate.slice(0,7)===isoToday.slice(0,7)).length;
  const alerts=active.filter(x=>daysUntil(x.validityDate)<=30).sort((a,b)=>a.validityDate.localeCompare(b.validityDate)).slice(0,4);
  $('dashboardAlerts').innerHTML=alerts.length?alerts.map(d=>{const info=expiryInfo(d);return `<div class="list-item"><div class="list-main"><strong>${epiById(d.epiId).name}</strong><small>${collabById(d.collaboratorId).name} · ${fmt(d.validityDate)}</small></div><span class="status ${info.type}">${info.label}</span></div>`}).join(''):'<p class="muted">Nenhum alerta no momento.</p>';
  $('dashboardHistory').innerHTML=[...state.deliveries].sort((a,b)=>b.deliveryDate.localeCompare(a.deliveryDate)).slice(0,4).map(d=>`<div class="list-item"><div class="list-main"><strong>${collabById(d.collaboratorId).name}</strong><small>${epiById(d.epiId).name} · ${fmt(d.deliveryDate)}</small></div><span class="status ${statusClass(d.status)}">${d.status}</span></div>`).join('');
}

function renderCollaborators(){
 const q=$('collabSearch').value.toLowerCase();
 const rows=state.collaborators.filter(c=>`${c.name} ${c.registration} ${c.role}`.toLowerCase().includes(q));
 $('collaboratorsTable').innerHTML=rows.map(c=>`<tr><td><strong>${c.name}</strong></td><td class="data-code">${c.registration}</td><td>${c.role}</td><td>${c.base}</td><td><span class="status ok">Ativo</span></td><td><button class="table-action" onclick="editCollaborator('${c.id}')">Editar</button></td></tr>`).join('');
}
$('collabSearch').addEventListener('input',renderCollaborators);

function renderEpis(){
 const q=$('epiSearch').value.toLowerCase();
 const rows=state.epis.filter(e=>`${e.name} ${e.category} ${e.ca}`.toLowerCase().includes(q));
 $('episTable').innerHTML=rows.map(e=>`<tr><td><strong>${e.name}</strong></td><td>${e.category}</td><td class="data-code">${e.ca}</td><td>${e.lifetime} dias</td><td>${e.stock}</td><td><span class="status ${e.stock>5?'ok':'warning'}">${e.stock>5?'Disponível':'Baixo'}</span></td></tr>`).join('');
}
$('epiSearch').addEventListener('input',renderEpis);

function renderDeliveryForms(){
 $('deliveryCollaborator').innerHTML='<option value="">Selecione...</option>'+state.collaborators.map(c=>`<option value="${c.id}">${c.name} — ${c.registration}</option>`).join('');
 $('deliveryEpi').innerHTML='<option value="">Selecione...</option>'+state.epis.filter(e=>e.stock>0).map(e=>`<option value="${e.id}">${e.name} — estoque ${e.stock}</option>`).join('');
 const active=state.deliveries.filter(d=>d.status==='Ativo');
 $('returnDelivery').innerHTML='<option value="">Selecione...</option>'+active.map(d=>`<option value="${d.id}">${collabById(d.collaboratorId).name} — ${epiById(d.epiId).name}</option>`).join('');
 updateComputedValidity();
}
function updateComputedValidity(){const epi=epiById($('deliveryEpi').value),date=$('deliveryDate').value;if(epi&&date){$('computedValidity').textContent=fmt(addDays(date,epi.lifetime));}else $('computedValidity').textContent='—';}
$('deliveryEpi').addEventListener('change',updateComputedValidity);$('deliveryDate').addEventListener('change',updateComputedValidity);

$('deliveryForm').addEventListener('submit',e=>{
 e.preventDefault(); const cid=$('deliveryCollaborator').value,eid=$('deliveryEpi').value,date=$('deliveryDate').value,epi=epiById(eid);
 if(!cid||!eid||!date||!epi)return; if(epi.stock<1){toast('Sem estoque disponível.');return;}
 state.deliveries.push({id:uid('d'),collaboratorId:cid,epiId:eid,deliveryDate:date,validityDate:addDays(date,epi.lifetime),status:'Ativo'}); epi.stock--; persist(); e.target.reset(); $('deliveryDate').value=isoToday; renderAll(); toast('Entrega registrada com sucesso.');
});
$('returnForm').addEventListener('submit',e=>{
 e.preventDefault(); const d=state.deliveries.find(x=>x.id===$('returnDelivery').value); if(!d)return; if($('returnDate').value<d.deliveryDate){toast('A data da baixa não pode ser anterior à entrega.');return;} const reason=$('returnReason').value; d.status=reason==='Descarte'?'Descartado':'Devolvido'; d.returnDate=$('returnDate').value; if(reason==='Devolução') epiById(d.epiId).stock++; persist(); renderAll(); toast(`${reason} registrada com sucesso.`);
});

function renderHistory(){
 const q=$('historySearch').value.toLowerCase(), s=$('historyStatus').value;
 const rows=[...state.deliveries].sort((a,b)=>b.deliveryDate.localeCompare(a.deliveryDate)).filter(d=>{const hay=`${collabById(d.collaboratorId).name} ${epiById(d.epiId).name} ${d.status}`.toLowerCase();return hay.includes(q)&&(s==='Todos'||d.status===s)});
 $('historyTable').innerHTML=rows.map(d=>`<tr><td><strong>${collabById(d.collaboratorId).name}</strong></td><td>${epiById(d.epiId).name}</td><td class="data-code">${fmt(d.deliveryDate)}</td><td class="data-code">${fmt(d.validityDate)}</td><td class="data-code">${d.returnDate?fmt(d.returnDate):'—'}</td><td><span class="status ${statusClass(d.status)}">${d.status}</span></td></tr>`).join('');
}
$('historySearch').addEventListener('input',renderHistory);$('historyStatus').addEventListener('change',renderHistory);

function renderAlerts(){
 const alerts=state.deliveries.filter(d=>d.status==='Ativo'&&daysUntil(d.validityDate)<=30).sort((a,b)=>a.validityDate.localeCompare(b.validityDate));
 $('alertsGrid').innerHTML=alerts.length?alerts.map(d=>{const i=expiryInfo(d),c=collabById(d.collaboratorId),e=epiById(d.epiId);return `<article class="alert-card ${i.type}"><span class="status ${i.type}">${i.label}</span><h3>${e.name}</h3><p>${c.name}</p><div class="alert-meta"><span>Matrícula: <strong>${c.registration}</strong></span><span>CA: <strong>${e.ca}</strong></span><span>Validade: <strong>${fmt(d.validityDate)}</strong></span></div></article>`}).join(''):'<article class="panel"><p class="muted">Nenhum EPI vencido ou a vencer nos próximos 30 dias.</p></article>';
}

$('newCollaboratorBtn').addEventListener('click',()=>{ $('collaboratorForm').reset(); $('collaboratorId').value=''; $('collaboratorModalTitle').textContent='Novo colaborador'; $('collaboratorModal').showModal(); });
window.editCollaborator=id=>{const c=collabById(id);$('collaboratorId').value=c.id;$('collaboratorName').value=c.name;$('collaboratorRegistration').value=c.registration;$('collaboratorRole').value=c.role;$('collaboratorBase').value=c.base;$('collaboratorModalTitle').textContent='Editar colaborador';$('collaboratorModal').showModal();};
$('collaboratorForm').addEventListener('submit',e=>{e.preventDefault();const id=$('collaboratorId').value;const data={name:$('collaboratorName').value,registration:$('collaboratorRegistration').value,role:$('collaboratorRole').value,base:$('collaboratorBase').value,active:true};if(id)Object.assign(collabById(id),data);else state.collaborators.push({id:uid('c'),...data});persist();$('collaboratorModal').close();renderAll();toast(id?'Colaborador atualizado.':'Colaborador cadastrado.');});

$('newEpiBtn').addEventListener('click',()=>{$('epiForm').reset();$('epiModal').showModal();});
$('epiForm').addEventListener('submit',e=>{e.preventDefault();state.epis.push({id:uid('e'),name:$('epiName').value,category:$('epiCategory').value,ca:$('epiCa').value,lifetime:Number($('epiLifetime').value),stock:Number($('epiStock').value)});persist();$('epiModal').close();renderAll();toast('Tipo de EPI cadastrado.');});

document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));

function renderAll(){renderDashboard();renderCollaborators();renderEpis();renderDeliveryForms();renderHistory();renderAlerts();}
