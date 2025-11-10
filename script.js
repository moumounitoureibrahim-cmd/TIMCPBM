// --- TIMCPBM FRONTEND LOGIC ---
// Connexion API backend
const API_URL = "http://localhost:4000";

// === LOGIN / SIGNUP ===
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Veuillez remplir tous les champs.");

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("userEmail", email);
      alert("Connexion réussie !");
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Erreur de connexion.");
    }
  } catch (err) {
    alert("Erreur de serveur !");
    console.error(err);
  }
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Veuillez remplir tous les champs.");

  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Compte créé avec succès !");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Erreur lors de l'inscription.");
    }
  } catch (err) {
    alert("Erreur de serveur !");
    console.error(err);
  }
}

// === DASHBOARD ===
async function loadDashboard() {
  const email = localStorage.getItem("userEmail");
  if (!email) return (window.location.href = "login.html");

  try {
    const res = await fetch(`${API_URL}/user/${email}`);
    const user = await res.json();

    document.getElementById("balance").innerText = user.balance.toLocaleString();
    document.getElementById("commission").innerText = user.commission.toLocaleString();
    document.getElementById("history").innerHTML = user.history
      .map(
        (t) => `
        <div class="transaction">
          <span>${t.type}</span>
          <span>${new Date(t.date).toLocaleString()}</span>
          <span class="${t.type === "Dépôt" ? "plus" : "minus"}">
            ${t.type === "Dépôt" ? "+" : "-"} ${t.amount.toLocaleString()}
          </span>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Erreur chargement tableau de bord:", err);
  }
}

async function simulateTransaction(type) {
  const email = localStorage.getItem("userEmail");
  const amount = parseFloat(document.getElementById("amount").value);
  if (!amount || amount <= 0) return alert("Montant invalide.");

  try {
    const res = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, type, amount }),
    });

    const data = await res.json();
    if (data.success) {
      alert(`${type} réussi !`);
      loadDashboard();
    } else {
      alert(data.message || "Erreur transaction.");
    }
  } catch (err) {
    alert("Erreur de serveur !");
    console.error(err);
  }
}

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}