const LGCY_ADMIN = {
    fees: { entry: 1000, monthly: 250, total: 1250 }, // Caução + Mensalidade
    commissions: { sale: 0.01, rent: 0.05, charity: 0.005 }, // 1%, 5%, 0.5%

    calcDeal: (price, type) => {
        const rate = type === 'sale' ? LGCY_ADMIN.commissions.sale : LGCY_ADMIN.commissions.rent;
        const totalTax = price * rate;
        const charityPart = price * LGCY_ADMIN.commissions.charity;
        return { totalTax, charityPart, platformNet: totalTax - charityPart };
    }
};

function renderAdminDashboard(container) {
    container.style.padding = "100px 20px";
    container.innerHTML = `
        <div class="admin-ui">
            <h1 class="gold-text">LGCY COMMAND</h1>
            <div class="admin-card">
                <h3>VETTING & REVENUE</h3>
                <p>Taxa de Entrada (Caução): <span id="v">€1.000</span></p>
                <p>Mensalidade: <span id="m">€250</span></p>
                <p>Total Verificação: <strong>€1.250</strong></p>
            </div>
            <div class="admin-card">
                <h3>COMISSÕES LGCY</h3>
                <p>Venda (1%): <span id="s">Ativo</span></p>
                <p>Aluguer (5%): <span id="r">Ativo</span></p>
                <p>Caridade (0.5%): <span id="c">Gestão Ativa</span></p>
            </div>
            <button class="gold-btn" onclick="alert('Checking Stripe API for €1250 payments...')">VERIFY NEW MEMBERS</button>
        </div>
    `;
}
