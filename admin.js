function renderAdminDashboard(container) {
    container.innerHTML = `
        <div class="admin-ui">
            <h2 style="color:#D4AF37; font-family:'Playfair Display'">LGCY COMMAND</h2>
            <div class="admin-card">
                <h3>VETTING REVENUE</h3>
                <p>Taxa Entrada (Caução): 1.000€</p>
                <p>Mensalidade: 250€</p>
                <p><strong>Total Verificação: 1.250€</strong></p>
            </div>
            <div class="admin-card">
                <h3>COMISSÕES</h3>
                <p>Venda: 1% | Aluguer: 5%</p>
                <p>Caridade: 0.5%</p>
            </div>
            <button style="width:100%; background:#D4AF37; border:none; padding:15px; font-weight:bold; border-radius:5px;" onclick="alert('Sistema de Pagamentos Stripe Ativo para 1.250€')">VERIFICAR NOVOS MEMBROS</button>
        </div>
    `;
}
