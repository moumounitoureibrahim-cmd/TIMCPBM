// dashboard.js — gestion du solde et des transactions (simulation)

const COMMISSION_RATE = 0.02; // 2%
const balanceText = document.getElementById('balanceText');
const commissionText = document.getElementById('commissionText');
const txList = document.getElementById('txList');
const amountInput = document.getElementById('amountInput');

let state = {
  balance: 1250000, // solde initial (tu peux changer)
  transactions: [
    // exemple initial
    { id: genId(), date: now(), label: 'Dépôt initial', amount: 1250000, type: 'positive' }
  ],
  totalCommissionEarned: 0 // commission que la plateforme (toi) collecte
};

function genId() { return Math.random().toString(36).slice(2,9); }
function now() { return new Date().toLocaleString(); }

function render() {
  balanceText.textContent = `Solde : ${formatFCFA(state.balance)}`;
  commissionText.textContent = `Ta commission (2%) : ${formatFCFA(state.totalCommissionEarned)}`;
  txList.innerHTML = '';
  // afficher transactions du plus récent au plus ancien
  [...state.transactions].reverse().forEach(tx => {
    const div = document.createElement('div');
    div.className = `tx ${tx.type}`;
    div.innerHTML = `
      <div><strong>${tx.label}</strong></div>
      <div class="small">${tx.date}</div>
      <div style="margin-top:8px;font-weight:bold">${tx.type==='positive'?'+':'-'} ${formatFCFA(Math.abs(tx.amount))}</div>
    `;
    txList.appendChild(div);
  });
}

function formatFCFA(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function addDeposit(amount){
  if(amount <= 0) return alert('Montant invalide');
  // commission de 2% prélevée sur dépôt (ex : plateforme retient 2%)
  const commission = Math.round(amount * COMMISSION_RATE);
  const net = amount - commission;
  state.balance += net;
  state.totalCommissionEarned += commission;
  state.transactions.push({ id: genId(), date: now(), label: 'Dépôt (simulé)', amount: net, type: 'positive' });
  // garder trace de la commission comme transaction séparée
  state.transactions.push({ id: genId(), date: now(), label: 'Commission plateforme (2%)', amount: commission, type: 'negative' });
  render();
}

function addWithdrawal(amount){
  if(amount <= 0) return alert('Montant invalide');
  if(amount > state.balance) return alert('Solde insuffisant pour ce retrait');
  state.balance -= amount;
  state.transactions.push({ id: genId(), date: now(), label: 'Retrait (simulé)', amount: amount, type: 'negative' });
  render();
}

function clearHistory(){
  if(!confirm('Supprimer tout l\'historique ?')) return;
  state.transactions = [];
  state.totalCommissionEarned = 0;
  render();
}

// liaisons boutons
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('depBtn').addEventListener('click', () => {
    const amt = Number(amountInput.value);
    addDeposit(amt);
    amountInput.value = '';
  });
  document.getElementById('withBtn').addEventListener('click', () => {
    const amt = Number(amountInput.value);
    addWithdrawal(amt);
    amountInput.value = '';
  });
  document.getElementById('clearBtn').addEventListener('click', clearHistory);
  render();
});