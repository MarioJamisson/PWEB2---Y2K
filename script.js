// --- 1. SISTEMA DE TEMAS (DARK, LIGHT, COLORBLIND) ---
const temaRadios = document.querySelectorAll('input[name="theme"]');
const temaSalvo = localStorage.getItem('tema-sistema') || 'light';

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    const radioCorrespondente = document.querySelector(`input[value="${tema}"]`);
    if (radioCorrespondente) {
        radioCorrespondente.checked = true;
    }
}

aplicarTema(temaSalvo);

temaRadios.forEach(radio => {
    radio.addEventListener('change', (evento) => {
        const novoTema = evento.target.value;
        aplicarTema(novoTema);
        localStorage.setItem('tema-sistema', novoTema); 
    });
});

// --- 2. INICIALIZAÇÃO DA PÁGINA E RELÓGIO ---
window.addEventListener('load', () => {
    setTimeout(() => {
        alert("⚠️ ALERTA DO SISTEMA ⚠️\n\nBem-vindo(a) ao ambiente seguro de registo V1.0.");
    }, 100);
    
    atualizarDataHora();
    setInterval(atualizarDataHora, 1000); 
    renderizarLista(); 
});

function atualizarDataHora() {
    const container = document.getElementById('dataHoraContainer');
    const agora = new Date();
    container.innerText = `SERVER TIME: ${agora.toLocaleTimeString('pt-PT')} | DATE: ${agora.toLocaleDateString('pt-PT')}`;
}

// --- 3. ESTADO DA APLICAÇÃO (INTEGRADO AO LOCALSTORAGE) ---
let participantes = JSON.parse(localStorage.getItem('participantes-salvos')) || [];

// --- 4. EXIBIÇÃO DINÂMICA (CAMPO EXTRA) ---
const checkboxNovidades = document.getElementById('novidades');
const containerAssuntos = document.getElementById('containerAssuntos');

checkboxNovidades.addEventListener('change', (e) => {
    if (e.target.checked) {
        const divGroup = document.createElement('div');
        divGroup.className = 'form-group';
        divGroup.id = 'campoInteresseExtra';
        
        divGroup.innerHTML = `
            <label for="assuntoInteresse" style="font-weight:bold;">[+] SELECIONE TÓPICO DE INTERESSE:</label>
            <select id="assuntoInteresse" name="assuntoInteresse" class="retro-input retro-select">
                <option value="web">Desenvolvimento Web 1.0</option>
                <option value="design">Web Design & GIFs Animados</option>
                <option value="hardware">Hardware & Overclocking</option>
            </select>
        `;
        containerAssuntos.appendChild(divGroup);
    } else {
        containerAssuntos.innerHTML = '';
    }
});

// --- 5. LÓGICA DO FORMULÁRIO (CRUD: CREATE & UPDATE) ---
const formulario = document.getElementById('cadastroForm');
let editandoId = null;

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const presenca = document.getElementById('presenca').checked;
    const tipoIngresso = document.getElementById('tipoIngresso').value;

    if (!nome || !email) {
        alert("ERRO FATAL: Campos obrigatórios não preenchidos.");
        return;
    }

    if (editandoId === null) {
        // MODO CREATE
        const novoParticipante = {
            id: Date.now(),
            nome: nome,
            email: email,
            presenca: presenca,
            tipoIngresso: tipoIngresso
        };
        participantes.unshift(novoParticipante);
    } else {
        // MODO UPDATE
        const index = participantes.findIndex(p => p.id === editandoId);
        if (index !== -1) {
            participantes[index].nome = nome;
            participantes[index].email = email;
            participantes[index].presenca = presenca;
            participantes[index].tipoIngresso = tipoIngresso;
        }
        
        editandoId = null;
        document.getElementById('btnSubmitForm').innerHTML = "💾 REGISTAR PARTICIPANTE";
    }

    localStorage.setItem('participantes-salvos', JSON.stringify(participantes));
    formulario.reset();
    containerAssuntos.innerHTML = ''; 
    renderizarLista();
});

// --- 6. RENDERIZAÇÃO DA LISTA (CRUD: READ) ---
function renderizarLista() {
    const listaDiv = document.getElementById('listaParticipantes');
    listaDiv.innerHTML = '';

    if (participantes.length === 0) {
        listaDiv.innerHTML = '<p class="empty-state">Nenhum dado encontrado no sistema...</p>';
        return;
    }

    participantes.forEach((participante) => {
        const card = document.createElement('div');
        card.className = `participante-card ${participante.tipoIngresso}`;
        
        const statusIcon = participante.presenca ? '✅ CONFIRMADO' : '❌ PENDENTE';
        const ingressoLabel = participante.tipoIngresso === 'padrao' ? 'STANDARD' : participante.tipoIngresso.toUpperCase();

        card.innerHTML = `
            <div class="card-header-tech">
               USER ID: ${participante.id.toString().slice(-4)}
            </div>
            <div class="card-body-tech">
                <h3>${participante.nome}</h3>
                <p><strong>E-MAIL:</strong> ${participante.email}</p>
                <p><strong>STATUS:</strong> ${statusIcon}</p>
                <p><strong>ACCESS LEVEL:</strong> ${ingressoLabel}</p>
                <button class="btn-edit-retro" onclick="prepararEdicao(${participante.id})">[✎] EDITAR DADO</button>
                <button class="btn-delete-retro" onclick="removerParticipante(${participante.id})">[X] APAGAR DADO</button>
            </div>
        `;

        listaDiv.appendChild(card);
    });
}

// --- 7. PREPARAR EDIÇÃO (CRUD: UPDATE) ---
window.prepararEdicao = function(id) {
    const participante = participantes.find(p => p.id === id);
    if(!participante) return;

    document.getElementById('nome').value = participante.nome;
    document.getElementById('email').value = participante.email;
    document.getElementById('presenca').checked = participante.presenca;
    document.getElementById('tipoIngresso').value = participante.tipoIngresso;

    editandoId = id;
    
    document.getElementById('btnSubmitForm').innerHTML = "💾 GUARDAR ALTERAÇÕES";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- 8. REMOVER PARTICIPANTE (CRUD: DELETE) ---
window.removerParticipante = function(id) {
    if(confirm("ATENÇÃO: Deseja realmente apagar este registo da base de dados?")) {
        participantes = participantes.filter(p => p.id !== id);
        localStorage.setItem('participantes-salvos', JSON.stringify(participantes));
        
        if(editandoId === id) {
            editandoId = null;
            document.getElementById('btnSubmitForm').innerHTML = "💾 REGISTAR PARTICIPANTE";
            document.getElementById('cadastroForm').reset();
        }
        
        renderizarLista();
    }
};