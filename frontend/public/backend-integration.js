const PLATANDPAY_API_BASE = window.PLATANDPAY_API_BASE || "http://127.0.0.1:3000";
const PLATANDPAY_SESSION_KEY = "platandpay_backend_session_id";

function getBackendSessionId() {
  let sessionId = localStorage.getItem(PLATANDPAY_SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(PLATANDPAY_SESSION_KEY, sessionId);
  }
  return sessionId;
}

function formatArs(value) {
  return Number(value || 0).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}

function escapeHtml(value) {
  return String(value).replace(/[<>&"]/g, (char) => {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" }[char];
  });
}

function iconForProduct(product) {
  const tags = Array.isArray(product.tags) ? product.tags.join(" ") : "";
  const name = `${product.name || ""} ${tags}`.toLowerCase();
  if (name.includes("arroz")) return "🍚";
  if (name.includes("yerba") || name.includes("mate")) return "🧉";
  if (name.includes("detergente") || name.includes("lavandina") || name.includes("papel")) return "🧼";
  if (name.includes("auricular") || name.includes("cargador") || name.includes("mouse") || name.includes("hdmi")) return "🎧";
  if (name.includes("leche") || name.includes("yogur")) return "🥛";
  if (name.includes("vino") || name.includes("coca") || name.includes("agua") || name.includes("cerveza")) return "🥤";
  return "🛒";
}

function mapProposalToOffer(product, index) {
  const listPrice = Number(product.listPrice || product.price || 0);
  const price = Number(product.price || 0);
  return {
    id: index,
    backendProductId: product.id,
    backendStoreId: product.storeId,
    store: product.storeName,
    product: product.name,
    originalPrice: listPrice,
    price,
    discount: Number(product.discountPct || 0),
    score: Number(product.score || 0),
    image: iconForProduct(product),
    category: product.category || "otros",
    savings: Math.max(0, listPrice - price),
    description:
      `${(product.reasons || []).join(" · ")}${product.promo ? " · " + product.promo : ""}` ||
      "Propuesta generada por el agente.",
    reasons: product.reasons || [],
  };
}

function appendChatBubble(role, html) {
  const chatBox = document.getElementById("chat-messages");
  if (!chatBox) return;
  const div = document.createElement("div");
  if (role === "user") {
    div.className = "flex justify-end gap-3";
    div.innerHTML = `<div class="bg-yellow-400 px-4 py-3 rounded-3xl rounded-br-none shadow-sm max-w-[78%] font-medium">${html}</div>`;
  } else {
    div.className = "flex gap-3";
    div.innerHTML = `
      <div class="w-8 h-8 mt-1 flex-shrink-0 rounded-2xl banana-gradient flex items-center justify-center text-xl shadow-sm">🍌</div>
      <div class="bg-white px-4 py-3 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 max-w-[82%]">${html}</div>
    `;
  }
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function callBackend(message) {
  const response = await fetch(`${PLATANDPAY_API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: getBackendSessionId(), message }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || "No se pudo conectar con PlatandPay API.");
  }
  return payload;
}

sendChatMessage = async function sendChatMessageIntegrated() {
  const input = document.getElementById("chat-input");
  const val = input.value.trim();
  if (!val) return;

  appendChatBubble("user", escapeHtml(val));
  input.value = "";
  appendChatBubble(
    "agent",
    '<span class="inline-flex items-center gap-x-2 text-slate-500"><i class="fas fa-spinner fa-spin"></i> Buscando y puntuando opciones...</span>',
  );

  try {
    const result = await callBackend(val);
    const chatBox = document.getElementById("chat-messages");
    chatBox.lastElementChild?.remove();

    if (Array.isArray(result.proposals) && result.proposals.length > 0) {
      state.offers = result.proposals.map(mapProposalToOffer);
      state.selectedOffers = [];
      saveState();
      renderPreviewOffers();
      renderOffers();
    }

    const proposalHint = result.proposals?.length
      ? `<div class="mt-3"><button onclick="showView('ofertas')" class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl font-extrabold text-xs">Ver ${result.proposals.length} propuestas</button></div>`
      : "";
    appendChatBubble("agent", `${escapeHtml(result.reply).replace(/\n/g, "<br>")}${proposalHint}`);
  } catch (error) {
    const chatBox = document.getElementById("chat-messages");
    chatBox.lastElementChild?.remove();
    appendChatBubble("agent", `<span class="text-red-600 font-semibold">${escapeHtml(error.message)}</span>`);
  }
};

confirmPurchase = async function confirmPurchaseIntegrated() {
  const selected = state.selectedOffers.map((idx) => state.offers[idx]).filter(Boolean);
  if (selected.length === 0) return;
  hideApprovalModal();

  const first = selected[0];
  const approvalMessage = `Sí, apruebo explícitamente la compra de ${first.product} en ${first.store} por $${formatArs(
    first.price,
  )}. Producto ${first.backendProductId || first.product}, tienda ${first.backendStoreId || first.store}.`;

  try {
    const result = await callBackend(approvalMessage);
    const totalSavings = selected.reduce((sum, offer) => sum + offer.savings, 0);
    const totalPaid = selected.reduce((sum, offer) => sum + offer.price, 0);

    state.saldo = Math.max(0, Math.round((state.saldo - totalPaid) * 100) / 100);
    state.presupuestoRestante = Math.max(0, state.presupuestoRestante - totalPaid);
    state.ahorroMes += totalSavings;
    state.historial.unshift({
      id: Date.now(),
      date: "Hoy",
      store: selected.length > 1 ? "Múltiples tiendas" : first.store,
      product: selected.length > 1 ? `${selected.length} productos` : first.product,
      saved: totalSavings,
      total: totalPaid,
      receiptId: result.purchaseReceipts?.[0]?.receiptId,
    });
    state.selectedOffers = [];
    saveState();
    updateAllUI();

    document.getElementById("success-savings").innerHTML = `$${formatArs(totalSavings)}`;
    document.getElementById("success-modal").style.display = "flex";
    appendChatBubble("user", escapeHtml(approvalMessage));
    appendChatBubble("agent", escapeHtml(result.purchaseReceipts?.[0]?.message || result.reply || "Compra simulada registrada."));
    launchConfetti();
  } catch (error) {
    appendChatBubble("agent", `<span class="text-red-600 font-semibold">${escapeHtml(error.message)}</span>`);
  }
};
