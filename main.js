// O código é executado somente após o DOM estar completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos DOM principais
    const appContent = document.getElementById('app-content');
    const mainMenus = document.getElementById('main-menu');
    const toggleButton = document.querySelector('.menu-toggle');
    
    // Mapeamento das rotas e seus metadados
    const routes = {
        'home': { templateId: 'home-template', title: 'Início', initializer: null },
        'projetos': { templateId: 'projetos-template', title: 'Projetos', initializer: null },
        // A função de validação/máscaras é chamada ao carregar o template de cadastro
        'cadastro': { templateId: 'cadastro-template', title: 'Cadastro', initializer: setupFormValidation },
        'sucesso': { templateId: 'sucesso-template', title: 'Sucesso', initializer: null },
        'default': { templateId: 'home-template', title: 'Início', initializer: null }
    };

    // ----------------------------------------------------
    // 1. FUNÇÕES DE NAVEGAÇÃO E CARREGAMENTO DE CONTEÚDO
    // ----------------------------------------------------

    /**
     * Carrega o conteúdo na div principal (#app-content).
     * @param {string} routeName - Nome da rota a ser carregada.
     * @param {Object} data - Dados opcionais para templates (ex: email do sucesso).
     */
    function loadContent(routeName, data = {}) {
        if (!appContent) {
            console.error('Elemento #app-content não encontrado!');
            return;
        }

        const route = routes[routeName] || routes['default'];
        const template = document.getElementById(route.templateId);

        if (!template) {
            appContent.innerHTML = '<h2>Erro: Template não encontrado!</h2>';
            return;
        }

        // 1. Limpa e clona o conteúdo da template
        appContent.innerHTML = '';
        const content = template.content.cloneNode(true);
        appContent.appendChild(content);

        // 2. Atualiza o título da página
        document.title = `Futuro Profissional | ${route.title}`;
        
        // 3. Lógica específica para o template de sucesso (exibir o email)
        if (routeName === 'sucesso' && data.email) {
            const emailDisplay = appContent.querySelector('#success-email-display');
            if (emailDisplay) {
                emailDisplay.textContent = data.email;
            }
        }

        // 4. Executa a função de inicialização, se houver (muito importante para o formulário)
        if (route.initializer) {
            route.initializer();
        }

        // Garante que a página volte ao topo
        window.scrollTo(0, 0);
    }

    // ----------------------------------------------------
    // 2. LÓGICA DE ROTAS E EVENTOS
    // ----------------------------------------------------

    function setupRouter() {
        // Manipula cliques nos links de navegação (todos com data-route)
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault(); 
                
                const routeName = link.getAttribute('data-route');
                
                // Evita recarregar a página se já estiver na rota, mas garante o loadContent
                if (window.location.hash.substring(1) !== routeName) {
                    window.location.hash = `#${routeName}`; // Dispara hashchange
                } else {
                     loadContent(routeName);
                }

                // Fecha menu mobile se estiver aberto
                if (mainMenus && mainMenus.classList.contains('is-open')) {
                    mainMenus.classList.remove('is-open');
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Escuta mudanças no hash da URL (navegação por botão Voltar/Avançar)
        window.addEventListener('hashchange', () => {
            const routeName = window.location.hash.substring(1) || 'home';
            loadContent(routeName);
        });

        // Carrega a rota inicial (ao carregar a página pela primeira vez)
        const initialRoute = window.location.hash.substring(1) || 'home';
        loadContent(initialRoute);
    }
    
    // ----------------------------------------------------
    // 3. LÓGICA DE VALIDAÇÃO (PARA A ROTA 'CADASTRO')
    // ----------------------------------------------------

    /**
     * Adiciona listeners de validação e máscaras ao formulário.
     */
    function setupFormValidation() {
        const form = document.getElementById('registration-form');
        if (!form) return;
        
        // Adiciona máscaras de entrada (UX)
        setupInputMasks(form);


        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            if (validateForm(form)) {
                // Coleta dados para exibir na tela de sucesso
                const formData = new FormData(form);
                const email = formData.get('email');
                
                // Redireciona para a rota 'sucesso' e passa o email
                window.location.hash = '#sucesso';
                loadContent('sucesso', { email });

                // Define um tempo limite para redirecionar para a home
                console.log('Cadastro enviado com sucesso! Redirecionando para a Home em 8 segundos...');
                
                setTimeout(() => {
                    // Só redireciona se a rota atual ainda for 'sucesso'
                    if (window.location.hash.substring(1) === 'sucesso') {
                        window.location.hash = '#home';
                        loadContent('home');
                    }
                }, 8000); 
            } else {
                 console.log('Falha na validação do formulário. Corrija os campos em destaque.');
            }
        });

        // Adiciona validação em tempo real ao perder o foco (blur)
        form.querySelectorAll('input[required], select[required]').forEach(element => {
            element.addEventListener('blur', () => {
                validateField(element);
            });
            // Adiciona validação ao mudar o valor de campos de seleção
            if (element.tagName === 'SELECT') {
                 element.addEventListener('change', () => {
                    validateField(element);
                 });
            }
        });
    }

    /**
     * Adiciona máscaras de formatação em tempo real para CPF, Telefone e CEP.
     * @param {HTMLElement} form - O elemento do formulário.
     */
    function setupInputMasks(form) {
        const cpfInput = form.querySelector('#cpf');
        const telefoneInput = form.querySelector('#telefone');
        const cepInput = form.querySelector('#cep');

        // Máscara de CPF (999.999.999-99)
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
                if (value.length > 3) value = value.replace(/(\d{3})(\d)/, '$1.$2');
                if (value.length > 6) value = value.replace(/(\d{3})(\d)/, '$1.$2');
                if (value.length > 9) value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value.substring(0, 14); 
            });
        }

        // Máscara de Telefone ((99) 99999-9999 ou (99) 9999-9999)
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); 
                if (value.length > 0) value = '(' + value;
                if (value.length > 3) value = value.replace(/^(\(\d{2})/, '$1) '); // (99) 
                
                if (value.length > 10) { // Com nono dígito (11 caracteres após código de área)
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                } else if (value.length > 9) { // Sem nono dígito (10 caracteres após código de área)
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                }

                e.target.value = value.substring(0, 15);
            });
        }

        // Máscara de CEP (99999-999)
        if (cepInput) {
            cepInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); 
                if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                e.target.value = value.substring(0, 9);
            });
        }
    }


    /**
     * Valida o formulário completo, campo por campo, e exibe os erros.
     */
    function validateForm(form) {
        let isValid = true;
        const elements = form.querySelectorAll('input[required], select[required]');

        elements.forEach(element => {
            // Se a validação do campo falhar, marca o formulário como inválido
            if (!validateField(element)) {
                isValid = false;
            }
        });

        // Se houver algum erro, foca no primeiro campo com erro
        if (!isValid) {
             const firstError = form.querySelector('.input-error');
             if (firstError) firstError.focus();
        }

        return isValid;
    }

    /**
     * Valida um campo individualmente e mostra a mensagem de erro customizada.
     * @param {HTMLElement} field - O campo a ser validado.
     * @returns {boolean} - Retorna true se o campo for válido.
     */
    function validateField(field) {
        const errorElement = document.getElementById(`error-${field.id}`);
        
        // Limpa estado anterior (remove erros e classes de validação)
        if (errorElement) errorElement.textContent = '';
        field.classList.remove('input-error', 'input-valid');

        let errorMessage = '';

        // 1. Validação Padrão do Navegador (required, type="email", minlength, etc.)
        if (!field.checkValidity()) {
            if (field.hasAttribute('required') && !field.value.trim()) {
                errorMessage = 'Campo obrigatório não preenchido.';
            } else if (field.name === 'email') {
                errorMessage = 'Por favor, insira um e-mail válido.';
            } else if (field.name === 'nome' && field.value.length < 5) {
                errorMessage = `O nome deve ter no mínimo ${field.minLength || 5} caracteres.`;
            } else {
                // Usa a mensagem de validação nativa do navegador como fallback
                errorMessage = field.validationMessage || 'Campo inválido.';
            }
        } 
        
        // 2. Validações Específicas de Pattern e Lógica
        if (!errorMessage) {
            if (field.name === 'cpf') {
                const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                if (!cpfPattern.test(field.value)) {
                    errorMessage = 'CPF deve estar no formato 999.999.999-99.';
                }
            } else if (field.name === 'telefone') {
                const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
                if (!telefonePattern.test(field.value)) {
                     errorMessage = 'Telefone deve estar no formato (99) 99999-9999 ou (99) 9999-9999.';
                }
            } else if (field.name === 'cep') {
                const cepPattern = /^\d{5}-\d{3}$/;
                if (!cepPattern.test(field.value)) {
                    errorMessage = 'CEP deve estar no formato 99999-999.';
                }
            } else if (field.name === 'dataNasc' && field.value) {
                const dataSelecionada = new Date(field.value);
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0); 
                
                if (dataSelecionada > hoje) {
                     errorMessage = 'A data de nascimento não pode ser futura.';
                }
            } else if (field.name === 'estado' && field.value === '') {
                errorMessage = 'Selecione um estado válido.';
            }
        }


        // 3. Exibir feedback
        if (errorMessage) {
            if (errorElement) {
                // Adiciona ícone de erro e mensagem
                errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
            }
            field.classList.add('input-error');
            return false;
        } else {
            // Se válido, adiciona classe de sucesso
            field.classList.add('input-valid'); 
        }

        return true;
    }
    
    // ----------------------------------------------------
    // 4. LÓGICA DO MENU MOBILE
    // ----------------------------------------------------
    
    if (toggleButton && mainMenus) {
        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            mainMenus.classList.toggle('is-open'); 
        });
    }

    // Inicia o roteador
    setupRouter();
});
