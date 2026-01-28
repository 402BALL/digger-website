// ===== TERMINAL TABS =====
const tabContents = {
    'source': `
        <div class="file-explorer">
            <div class="explorer-header">
                <span class="arrow">&#9660;</span>
                <span class="explorer-title">EXPLORER</span>
            </div>
            <div class="explorer-tree">
                <div class="tree-item tree-folder open">
                    <span class="arrow">&#9660;</span>
                    <span class="folder-name">digger-protocol</span>
                </div>
                <div class="tree-children">
                    <div class="tree-item tree-folder">
                        <span class="arrow">&#9654;</span>
                        <span>bots/</span>
                    </div>
                    <div class="tree-item tree-folder">
                        <span class="arrow">&#9654;</span>
                        <span>contracts/</span>
                    </div>
                    <div class="tree-item tree-folder">
                        <span class="arrow">&#9654;</span>
                        <span>bridge/</span>
                    </div>
                    <div class="tree-item tree-folder">
                        <span class="arrow">&#9654;</span>
                        <span>burn-executor/</span>
                    </div>
                    <div class="tree-item tree-file">
                        <span class="file-icon">&#9633;</span>
                        <span>package.json</span>
                    </div>
                    <div class="tree-item tree-file">
                        <span class="file-icon">&#9633;</span>
                        <span>README.md</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="code-block animate-fade-in">
            <div class="code-header">bots/arbitrage.ts</div>
            <div class="code-content">
                <div class="code-line"><span class="ln"> 1</span>  <span class="c-comment">// PAXG arbitrage - profits burn $DIGGER</span></div>
                <div class="code-line"><span class="ln"> 2</span>  <span class="c-keyword">const</span> <span class="c-var">opportunity</span> <span class="c-op">=</span> <span class="c-keyword">await</span> <span class="c-fn">findArbitrage</span>({</div>
                <div class="code-line"><span class="ln"> 3</span>    <span class="c-prop">token:</span> <span class="c-string">'PAXG'</span>,</div>
                <div class="code-line"><span class="ln"> 4</span>    <span class="c-prop">dexA:</span> <span class="c-string">'uniswap_v3'</span>,</div>
                <div class="code-line"><span class="ln"> 5</span>    <span class="c-prop">dexB:</span> <span class="c-string">'curve'</span>,</div>
                <div class="code-line"><span class="ln"> 6</span>    <span class="c-prop">minProfitUsd:</span> <span class="c-num">50</span></div>
                <div class="code-line"><span class="ln"> 7</span>  });</div>
                <div class="code-line"><span class="ln"> 8</span></div>
                <div class="code-line"><span class="ln"> 9</span>  <span class="c-keyword">if</span> (opportunity) {</div>
                <div class="code-line"><span class="ln">10</span>    <span class="c-keyword">const</span> <span class="c-var">bundle</span> <span class="c-op">=</span> <span class="c-fn">createFlashbotsBundle</span>([</div>
                <div class="code-line"><span class="ln">11</span>      <span class="c-var">opportunity</span>.<span class="c-prop">buyTx</span>,</div>
                <div class="code-line"><span class="ln">12</span>      <span class="c-var">opportunity</span>.<span class="c-prop">sellTx</span></div>
                <div class="code-line"><span class="ln">13</span>    ]);</div>
                <div class="code-line"><span class="ln">14</span></div>
                <div class="code-line"><span class="ln">15</span>    <span class="c-keyword">await</span> <span class="c-var">flashbotsProvider</span>.<span class="c-fn">sendBundle</span>(<span class="c-var">bundle</span>);</div>
                <div class="code-line"><span class="ln">16</span>  }</div>
            </div>
        </div>

        <div class="code-block animate-fade-in" style="animation-delay: 0.1s">
            <div class="code-header">burn-executor/burn.ts</div>
            <div class="code-content">
                <div class="code-line"><span class="ln"> 1</span>  <span class="c-comment">// Convert ETH profit to SOL and burn DIGGER</span></div>
                <div class="code-line"><span class="ln"> 2</span>  <span class="c-keyword">const</span> <span class="c-var">profitSol</span> <span class="c-op">=</span> <span class="c-keyword">await</span> <span class="c-fn">bridgeToSolana</span>(<span class="c-var">profitEth</span>);</div>
                <div class="code-line"><span class="ln"> 3</span></div>
                <div class="code-line"><span class="ln"> 4</span>  <span class="c-comment">// Buy DIGGER via Jupiter aggregator</span></div>
                <div class="code-line"><span class="ln"> 5</span>  <span class="c-keyword">const</span> <span class="c-var">diggerAmount</span> <span class="c-op">=</span> <span class="c-keyword">await</span> <span class="c-var">jupiter</span>.<span class="c-fn">swap</span>({</div>
                <div class="code-line"><span class="ln"> 6</span>    <span class="c-prop">inputMint:</span> <span class="c-var">SOL_MINT</span>,</div>
                <div class="code-line"><span class="ln"> 7</span>    <span class="c-prop">outputMint:</span> <span class="c-var">DIGGER_MINT</span>,</div>
                <div class="code-line"><span class="ln"> 8</span>    <span class="c-prop">amount:</span> <span class="c-var">profitSol</span></div>
                <div class="code-line"><span class="ln"> 9</span>  });</div>
                <div class="code-line"><span class="ln">10</span></div>
                <div class="code-line"><span class="ln">11</span>  <span class="c-comment">// Burn tokens forever</span></div>
                <div class="code-line"><span class="ln">12</span>  <span class="c-keyword">await</span> <span class="c-fn">transfer</span>(<span class="c-var">diggerAmount</span>, <span class="c-var">BURN_ADDRESS</span>);</div>
                <div class="code-line"><span class="ln">13</span>  <span class="c-fn">emitBurnEvent</span>(<span class="c-var">diggerAmount</span>, <span class="c-var">txHash</span>);</div>
            </div>
        </div>
    `,
    
    'config': `
        <div class="code-block animate-fade-in">
            <div class="code-header">config/default.json</div>
            <div class="code-content">
                <div class="code-line"><span class="ln"> 1</span>  {</div>
                <div class="code-line"><span class="ln"> 2</span>    <span class="c-prop">"network"</span>: {</div>
                <div class="code-line"><span class="ln"> 3</span>      <span class="c-prop">"ethereum"</span>: {</div>
                <div class="code-line"><span class="ln"> 4</span>        <span class="c-prop">"rpc"</span>: <span class="c-string">"https://eth.llamarpc.com"</span>,</div>
                <div class="code-line"><span class="ln"> 5</span>        <span class="c-prop">"flashbots"</span>: <span class="c-string">"https://relay.flashbots.net"</span></div>
                <div class="code-line"><span class="ln"> 6</span>      },</div>
                <div class="code-line"><span class="ln"> 7</span>      <span class="c-prop">"solana"</span>: {</div>
                <div class="code-line"><span class="ln"> 8</span>        <span class="c-prop">"rpc"</span>: <span class="c-string">"https://api.mainnet-beta.solana.com"</span></div>
                <div class="code-line"><span class="ln"> 9</span>      }</div>
                <div class="code-line"><span class="ln">10</span>    },</div>
                <div class="code-line"><span class="ln">11</span>    <span class="c-prop">"tokens"</span>: {</div>
                <div class="code-line"><span class="ln">12</span>      <span class="c-prop">"PAXG"</span>: <span class="c-string">"0x45804880De22913dAFE09f4980848ECE6EcbAf78"</span>,</div>
                <div class="code-line"><span class="ln">13</span>      <span class="c-prop">"XAUT"</span>: <span class="c-string">"0x68749665FF8D2d112Fa859AA293F07A622782F38"</span></div>
                <div class="code-line"><span class="ln">14</span>    },</div>
                <div class="code-line"><span class="ln">15</span>    <span class="c-prop">"strategies"</span>: {</div>
                <div class="code-line"><span class="ln">16</span>      <span class="c-prop">"arbitrage"</span>: { <span class="c-prop">"enabled"</span>: <span class="c-keyword">true</span>, <span class="c-prop">"minProfit"</span>: <span class="c-num">50</span> },</div>
                <div class="code-line"><span class="ln">17</span>      <span class="c-prop">"sandwich"</span>: { <span class="c-prop">"enabled"</span>: <span class="c-keyword">true</span>, <span class="c-prop">"minProfit"</span>: <span class="c-num">100</span> },</div>
                <div class="code-line"><span class="ln">18</span>      <span class="c-prop">"liquidation"</span>: { <span class="c-prop">"enabled"</span>: <span class="c-keyword">true</span> }</div>
                <div class="code-line"><span class="ln">19</span>    },</div>
                <div class="code-line"><span class="ln">20</span>    <span class="c-prop">"burn"</span>: {</div>
                <div class="code-line"><span class="ln">21</span>      <span class="c-prop">"address"</span>: <span class="c-string">"1nc1nerator11111111111111111111111111111111"</span>,</div>
                <div class="code-line"><span class="ln">22</span>      <span class="c-prop">"minAmount"</span>: <span class="c-num">100</span></div>
                <div class="code-line"><span class="ln">23</span>    }</div>
                <div class="code-line"><span class="ln">24</span>  }</div>
            </div>
        </div>

        <div class="code-block animate-fade-in" style="animation-delay: 0.1s">
            <div class="code-header">config/dex.json</div>
            <div class="code-content">
                <div class="code-line"><span class="ln"> 1</span>  {</div>
                <div class="code-line"><span class="ln"> 2</span>    <span class="c-prop">"uniswap_v3"</span>: {</div>
                <div class="code-line"><span class="ln"> 3</span>      <span class="c-prop">"router"</span>: <span class="c-string">"0xE592427A0AEce92De3Edee1F18E0157C05861564"</span>,</div>
                <div class="code-line"><span class="ln"> 4</span>      <span class="c-prop">"quoter"</span>: <span class="c-string">"0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"</span></div>
                <div class="code-line"><span class="ln"> 5</span>    },</div>
                <div class="code-line"><span class="ln"> 6</span>    <span class="c-prop">"curve"</span>: {</div>
                <div class="code-line"><span class="ln"> 7</span>      <span class="c-prop">"registry"</span>: <span class="c-string">"0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5"</span></div>
                <div class="code-line"><span class="ln"> 8</span>    },</div>
                <div class="code-line"><span class="ln"> 9</span>    <span class="c-prop">"sushiswap"</span>: {</div>
                <div class="code-line"><span class="ln">10</span>      <span class="c-prop">"router"</span>: <span class="c-string">"0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"</span></div>
                <div class="code-line"><span class="ln">11</span>    }</div>
                <div class="code-line"><span class="ln">12</span>  }</div>
            </div>
        </div>
    `,
    
    'terminal': `
        <div class="code-block terminal-output animate-fade-in">
            <div class="code-header">LIVE OUTPUT</div>
            <div class="code-content" id="terminal-live">
                <div class="code-line"><span class="c-accent">$</span> npm run start:all</div>
                <div class="code-line"><span class="c-muted"># Starting Digger MEV infrastructure...</span></div>
                <div class="code-line"></div>
            </div>
        </div>
    `
};

// Terminal log messages for simulation
const terminalLogs = [
    { text: '[arbitrage] Monitoring PAXG on Uniswap V3...', type: 'muted' },
    { text: '[arbitrage] Monitoring PAXG on Curve...', type: 'muted' },
    { text: '[arbitrage] Monitoring XAUT on Balancer...', type: 'muted' },
    { text: '[sandwich] Mempool listener active', type: 'muted' },
    { text: '[liquidation] AAVE health factor monitor started', type: 'muted' },
    { text: '[bridge] Wormhole relayer connected', type: 'muted' },
    { text: '[burn] Jupiter swap ready', type: 'muted' },
    { text: '', type: 'empty' },
    { text: 'OK All services operational', type: 'success' },
    { text: '-- Waiting for opportunities...', type: 'accent' },
    { text: '', type: 'empty' },
    { text: '[arbitrage] Price diff detected: PAXG $2,651.20 (Uni) vs $2,654.80 (Curve)', type: 'muted' },
    { text: '[arbitrage] Spread: 0.14% - Below threshold, skipping', type: 'muted' },
    { text: '[sandwich] Large swap detected: 15 PAXG on Uniswap', type: 'muted' },
    { text: '[sandwich] Calculating optimal bundle...', type: 'muted' },
    { text: '[sandwich] Expected profit: $47.20 - Executing...', type: 'accent' },
    { text: '[flashbots] Bundle submitted to block 19284756', type: 'muted' },
    { text: '[flashbots] Bundle included! TX: 0x8f2a...3d1c', type: 'success' },
    { text: '[profit] +$47.20 captured, routing to burn...', type: 'success' },
    { text: '[bridge] Bridging 0.015 ETH to Solana...', type: 'muted' },
    { text: '[burn] Swapping SOL for DIGGER via Jupiter...', type: 'muted' },
    { text: '[burn] Burning 19,847 DIGGER...', type: 'accent' },
    { text: '[burn] BURN COMPLETE TX: 5Kj2x...8mNp', type: 'success' },
    { text: '', type: 'empty' },
    { text: '-- Continuing to monitor...', type: 'accent' },
];

let terminalLineIndex = 0;
let terminalInterval = null;

function initTerminalTabs() {
    const tabs = document.querySelectorAll('.tab');
    const terminalContent = document.querySelector('.terminal-content');
    
    if (!tabs.length || !terminalContent) return;
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('tab-active'));
            tab.classList.add('tab-active');
            
            // Clear interval if switching away from terminal
            if (terminalInterval) {
                clearInterval(terminalInterval);
                terminalInterval = null;
            }
            
            // Set content
            if (index === 0) {
                terminalContent.innerHTML = tabContents['source'];
            } else if (index === 1) {
                terminalContent.innerHTML = tabContents['config'];
            } else if (index === 2) {
                terminalContent.innerHTML = tabContents['terminal'];
                startTerminalSimulation();
            }
        });
    });
}

function startTerminalSimulation() {
    const liveTerminal = document.getElementById('terminal-live');
    if (!liveTerminal) return;
    
    terminalLineIndex = 0;
    
    terminalInterval = setInterval(() => {
        if (terminalLineIndex >= terminalLogs.length) {
            terminalLineIndex = 11; // Loop back to activity logs
        }
        
        const log = terminalLogs[terminalLineIndex];
        const line = document.createElement('div');
        line.className = 'code-line animate-type';
        
        if (log.type === 'empty') {
            line.innerHTML = '';
        } else if (log.type === 'success') {
            line.innerHTML = `<span class="c-success">${log.text}</span>`;
        } else if (log.type === 'accent') {
            line.innerHTML = `<span class="c-accent">${log.text}</span>`;
        } else {
            line.innerHTML = `<span class="c-muted">${log.text}</span>`;
        }
        
        liveTerminal.appendChild(line);
        liveTerminal.scrollTop = liveTerminal.scrollHeight;
        
        terminalLineIndex++;
    }, 800);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.content-block, .matrix-card, .stat-card, .layer-item, .flow-item, .feature-list p, .token-row'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== LABEL DOT PULSE =====
function initPulsingDots() {
    const dots = document.querySelectorAll('.label-dot');
    dots.forEach(dot => {
        dot.classList.add('pulse-animation');
    });
}

// ===== TYPING EFFECT FOR HERO =====
function initHeroTyping() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    heroTitle.classList.add('animate-hero-text');
}

// ===== MATRIX CARD HOVER EFFECT =====
function initMatrixHover() {
    const cards = document.querySelectorAll('.matrix-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    });
}

// ===== FILE EXPLORER TOGGLE =====
function initFileExplorer() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.tree-folder')) {
            const folder = e.target.closest('.tree-folder');
            const arrow = folder.querySelector('.arrow');
            const nextElement = folder.nextElementSibling;
            
            if (nextElement && nextElement.classList.contains('tree-children')) {
                nextElement.classList.toggle('collapsed');
                if (arrow) {
                    arrow.innerHTML = nextElement.classList.contains('collapsed') ? '&#9654;' : '&#9660;';
                }
            }
        }
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        if (stat.textContent !== '—') {
            const target = parseInt(stat.textContent.replace(/,/g, ''));
            animateValue(stat, 0, target, 2000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * easeOut);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initTerminalTabs();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initPulsingDots();
    initHeroTyping();
    initMatrixHover();
    initFileExplorer();
    
    console.log('Digger Protocol initialized');
});

